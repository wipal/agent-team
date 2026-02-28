/**
 * Skills API Routes
 */

import { Router } from 'express';
import { getSkills, getCategories } from '../../utils/skill-scanner.js';
import { getPackageRoot } from '../../utils/file-utils.js';
import path from 'path';
import fs from 'fs-extra';

const router = Router();

/**
 * List all available skills
 */
router.get('/', async (req, res) => {
  try {
    const skills = await getSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all categories
 */
router.get('/categories', async (req, res) => {
  try {
    const skills = await getSkills();
    const categories = getCategories(skills);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get skill by name
 */
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const skills = await getSkills();
    const skill = skills.find(s => s.name === name);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get skill content (SKILL.md)
 */
router.get('/:name/content', async (req, res) => {
  try {
    const { name } = req.params;
    const skills = await getSkills();
    const skill = skills.find(s => s.name === name);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    const skillPath = path.join(skill.path, 'SKILL.md');
    const content = await fs.readFile(skillPath, 'utf-8');

    res.type('text/markdown').send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
