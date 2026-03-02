/**
 * Projects API Routes
 */

import { Router } from 'express';
import { listValidProjects, getProject, updateProjectAccess } from '../../utils/global-registry.js';

const router = Router();

/**
 * List all registered projects
 */
router.get('/', async (req, res) => {
  try {
    const projects = await listValidProjects();
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get current project
 */
router.get('/current', async (req, res) => {
  try {
    const projectRoot = req.app.get('projectRoot');
    const project = await getProject(projectRoot);

    res.json({
      path: projectRoot,
      ...project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Switch to a different project
 */
router.post('/switch', async (req, res) => {
  try {
    const { path: projectPath } = req.body;

    if (!projectPath) {
      return res.status(400).json({ error: 'Project path is required' });
    }

    const project = await getProject(projectPath);
    if (!project) {
      return res.status(404).json({ error: 'Project not found in registry' });
    }

    // Update app's project root
    req.app.set('projectRoot', projectPath);
    await updateProjectAccess(projectPath);

    res.json({
      success: true,
      project: {
        path: projectPath,
        ...project
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
