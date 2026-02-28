/**
 * Skill Scanner - Scan SKILL.md files and parse metadata
 */

import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import yaml from 'js-yaml';
import { getPackageRoot } from './file-utils.js';

/**
 * Parse YAML frontmatter from markdown content
 * @param {string} content - Markdown content with potential frontmatter
 * @returns {Object} - Parsed frontmatter and body
 */
export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { metadata: {}, body: content };
  }

  try {
    const metadata = yaml.load(match[1]);
    const body = match[2];
    return { metadata, body };
  } catch (error) {
    console.warn('Failed to parse frontmatter:', error.message);
    return { metadata: {}, body: content };
  }
}

/**
 * Scan all SKILL.md files and extract metadata
 * @param {string} skillsDir - Directory containing skills
 * @returns {Promise<Array>} - Array of skill objects with metadata
 */
export async function scanSkills(skillsDir = null) {
  if (!skillsDir) {
    skillsDir = path.join(getPackageRoot(), '.claude', 'skills');
  }

  const skillFiles = await glob('**/SKILL.md', {
    cwd: skillsDir,
    absolute: true
  });

  const skills = [];

  for (const file of skillFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const { metadata, body } = parseFrontmatter(content);

      // Get relative path from skills directory
      const relativePath = path.relative(skillsDir, path.dirname(file));
      const pathParts = relativePath.split(path.sep);

      // Determine category from path
      let category = metadata.category || 'unknown';
      if (pathParts.length >= 2) {
        // Path like: core/code-review/SKILL.md -> category = core
        // Path like: domain/frontend/frontend-design/SKILL.md -> category = frontend
        if (pathParts[0] === 'domain' && pathParts.length >= 2) {
          category = metadata.category || pathParts[1];
        } else {
          category = metadata.category || pathParts[0];
        }
      }

      skills.push({
        name: metadata.name || path.basename(path.dirname(file)),
        path: path.dirname(file),
        relativePath,
        category,
        tags: metadata.tags || [],
        description: metadata.description || '',
        version: metadata.version || '1.0.0',
        depends_on: metadata.depends_on || [],
        recommends: metadata.recommends || [],
        used_by: metadata.used_by || [],
        body
      });
    } catch (error) {
      console.warn(`Failed to scan skill: ${file}`, error.message);
    }
  }

  return skills;
}

/**
 * Get skills by category
 * @param {Array} skills - Array of skills
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered skills
 */
export function getSkillsByCategory(skills, category) {
  return skills.filter(skill =>
    skill.category === category ||
    skill.tags.includes(category)
  );
}

/**
 * Get skills by names
 * @param {Array} skills - Array of skills
 * @param {Array} names - Skill names to filter by
 * @returns {Array} - Filtered skills
 */
export function getSkillsByNames(skills, names) {
  return skills.filter(skill => names.includes(skill.name));
}

/**
 * Get all unique categories from skills
 * @param {Array} skills - Array of skills
 * @returns {Array} - Unique categories
 */
export function getCategories(skills) {
  const categories = new Set();
  for (const skill of skills) {
    categories.add(skill.category);
    for (const tag of skill.tags) {
      categories.add(tag);
    }
  }
  return Array.from(categories).sort();
}

/**
 * Cache for scanned skills
 */
let skillsCache = null;

/**
 * Get skills with caching
 * @param {boolean} refresh - Force refresh cache
 * @returns {Promise<Array>} - Array of skills
 */
export async function getSkills(refresh = false) {
  if (skillsCache && !refresh) {
    return skillsCache;
  }
  skillsCache = await scanSkills();
  return skillsCache;
}

/**
 * Clear skills cache
 */
export function clearSkillsCache() {
  skillsCache = null;
}
