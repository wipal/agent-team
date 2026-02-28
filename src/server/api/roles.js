/**
 * Roles API Routes
 */

import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { getPackageRoot, getClaudeDir } from '../../utils/file-utils.js';

const router = Router();

/**
 * Get roles configuration
 */
router.get('/', async (req, res) => {
  try {
    const projectRoot = req.app.get('projectRoot');

    // Load default config
    const defaultPath = path.join(getPackageRoot(), 'config', 'roles.yaml');
    const defaultConfig = await fs.exists(defaultPath)
      ? yaml.load(await fs.readFile(defaultPath, 'utf-8'))
      : { roles: {} };

    // Load project override
    const projectPath = path.join(getClaudeDir(projectRoot), 'roles.yaml');
    const projectConfig = await fs.exists(projectPath)
      ? yaml.load(await fs.readFile(projectPath, 'utf-8'))
      : { roles: {} };

    // Merge
    const merged = {
      ...defaultConfig,
      roles: {
        ...defaultConfig.roles,
        ...projectConfig.roles
      }
    };

    res.json(merged);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update roles configuration (project-level only)
 */
router.put('/', async (req, res) => {
  try {
    const projectRoot = req.app.get('projectRoot');
    const configPath = path.join(getClaudeDir(projectRoot), 'roles.yaml');

    // Validate YAML
    const content = yaml.dump(req.body);

    await fs.ensureDir(path.dirname(configPath));
    await fs.writeFile(configPath, content, 'utf-8');

    res.json({ success: true, message: 'Configuration saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get role details
 */
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const projectRoot = req.app.get('projectRoot');

    // Load configs
    const defaultPath = path.join(getPackageRoot(), 'config', 'roles.yaml');
    const defaultConfig = yaml.load(await fs.readFile(defaultPath, 'utf-8'));

    const projectPath = path.join(getClaudeDir(projectRoot), 'roles.yaml');
    const projectConfig = await fs.exists(projectPath)
      ? yaml.load(await fs.readFile(projectPath, 'utf-8'))
      : { roles: {} };

    // Get role (project override takes precedence)
    const role = projectConfig.roles?.[name] || defaultConfig.roles?.[name];

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json({ name, ...role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
