/**
 * Agents API Routes
 */

import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import {
  getClaudeDir,
  getAgentsDir,
  getAgentDir,
  isInitialized,
  agentExists,
  getAgents
} from '../../utils/file-utils.js';
import {
  resolveSkills,
  getAllSkills,
  AVAILABLE_ROLES,
  VARIANT_CATEGORIES,
  getVariantsForRole
} from '../../utils/skill-resolver.js';
import { createAgent } from '../../commands/add.js';

const router = Router();

/**
 * List all agents
 */
router.get('/', async (req, res) => {
  try {
    const projectRoot = req.app.get('projectRoot');

    if (!(await isInitialized(projectRoot))) {
      return res.json({ initialized: false, agents: [] });
    }

    const agents = await getAgents(projectRoot);
    res.json({ initialized: true, agents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get single agent
 */
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const projectRoot = req.app.get('projectRoot');
    const agentDir = getAgentDir(name, projectRoot);

    if (!(await fs.exists(agentDir))) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const variants = await fs.readJson(path.join(agentDir, 'variants.json'));
    const claudeMd = await fs.readFile(path.join(agentDir, 'CLAUDE.md'), 'utf-8');

    // Get skills list
    const skillsDir = path.join(agentDir, 'skills');
    let skills = [];
    if (await fs.exists(skillsDir)) {
      const skillEntries = await fs.readdir(skillsDir, { withFileTypes: true });
      skills = skillEntries.filter(e => e.isDirectory()).map(e => e.name);
    }

    res.json({
      name,
      path: agentDir,
      variants,
      skills,
      claudeMd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create new agent
 */
router.post('/', async (req, res) => {
  try {
    const { name, role, variants } = req.body;
    const projectRoot = req.app.get('projectRoot');

    if (!(await isInitialized(projectRoot))) {
      return res.status(400).json({ error: 'Project not initialized' });
    }

    if (await agentExists(name, projectRoot)) {
      return res.status(400).json({ error: 'Agent already exists' });
    }

    await createAgent(name, role, variants || {}, projectRoot);

    res.json({ success: true, name, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete agent
 */
router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const projectRoot = req.app.get('projectRoot');
    const agentDir = getAgentDir(name, projectRoot);

    if (!(await fs.exists(agentDir))) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    await fs.remove(agentDir);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get available roles
 */
router.get('/meta/roles', (req, res) => {
  res.json(AVAILABLE_ROLES);
});

/**
 * Get available variants for a role
 */
router.get('/meta/variants/:role', (req, res) => {
  const { role } = req.params;
  const variants = getVariantsForRole(role);
  res.json(variants);
});

/**
 * Preview skills for role + variants
 */
router.post('/preview-skills', (req, res) => {
  const { role, variants } = req.body;
  const skills = resolveSkills(role, variants || {});
  res.json(skills);
});

export default router;
