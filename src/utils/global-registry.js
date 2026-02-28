/**
 * Global registry for managing all initialized projects
 */

import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const REGISTRY_DIR = path.join(os.homedir(), '.agent-team');
const REGISTRY_FILE = path.join(REGISTRY_DIR, 'registry.json');

/**
 * Get the global registry directory path
 */
export function getGlobalRegistryDir() {
  return REGISTRY_DIR;
}

/**
 * Get the global registry file path
 */
export function getGlobalRegistryPath() {
  return REGISTRY_FILE;
}

/**
 * Ensure registry directory and file exist
 */
async function ensureRegistry() {
  await fs.ensureDir(REGISTRY_DIR);

  if (!(await fs.exists(REGISTRY_FILE))) {
    await fs.writeJson(REGISTRY_FILE, {
      version: '1.0.0',
      projects: {}
    }, { spaces: 2 });
  }
}

/**
 * Read the registry
 */
export async function readRegistry() {
  await ensureRegistry();

  try {
    return await fs.readJson(REGISTRY_FILE);
  } catch (error) {
    // If registry is corrupted, recreate it
    await fs.writeJson(REGISTRY_FILE, {
      version: '1.0.0',
      projects: {}
    }, { spaces: 2 });
    return { version: '1.0.0', projects: {} };
  }
}

/**
 * Write to the registry
 */
export async function writeRegistry(registry) {
  await ensureRegistry();
  await fs.writeJson(REGISTRY_FILE, registry, { spaces: 2 });
}

/**
 * Register a project in the global registry
 * @param {string} projectPath - Absolute path to the project
 * @param {Object} metadata - Additional metadata
 */
export async function registerProject(projectPath, metadata = {}) {
  const registry = await readRegistry();
  const now = new Date().toISOString();

  const projectName = path.basename(projectPath);

  registry.projects[projectPath] = {
    name: metadata.name || projectName,
    registered_at: registry.projects[projectPath]?.registered_at || now,
    last_accessed: now,
    agents_count: metadata.agents_count || 0,
    ...metadata
  };

  await writeRegistry(registry);
  return registry.projects[projectPath];
}

/**
 * Unregister a project from the global registry
 * @param {string} projectPath - Absolute path to the project
 */
export async function unregisterProject(projectPath) {
  const registry = await readRegistry();

  if (registry.projects[projectPath]) {
    delete registry.projects[projectPath];
    await writeRegistry(registry);
    return true;
  }

  return false;
}

/**
 * Update project's last accessed time
 * @param {string} projectPath - Absolute path to the project
 */
export async function updateProjectAccess(projectPath) {
  const registry = await readRegistry();

  if (registry.projects[projectPath]) {
    registry.projects[projectPath].last_accessed = new Date().toISOString();
    await writeRegistry(registry);
    return true;
  }

  return false;
}

/**
 * Update project's agent count
 * @param {string} projectPath - Absolute path to the project
 * @param {number} count - Number of agents
 */
export async function updateProjectAgentCount(projectPath, count) {
  const registry = await readRegistry();

  if (registry.projects[projectPath]) {
    registry.projects[projectPath].agents_count = count;
    registry.projects[projectPath].last_accessed = new Date().toISOString();
    await writeRegistry(registry);
    return true;
  }

  return false;
}

/**
 * Get all registered projects
 * @returns {Array} Array of project objects with path and metadata
 */
export async function listProjects() {
  const registry = await readRegistry();

  return Object.entries(registry.projects).map(([projectPath, metadata]) => ({
    path: projectPath,
    ...metadata
  }));
}

/**
 * Get valid projects (ones that still exist on disk)
 * @returns {Array} Array of valid project objects
 */
export async function listValidProjects() {
  const projects = await listProjects();
  const validProjects = [];

  for (const project of projects) {
    if (await fs.exists(project.path)) {
      const claudeDir = path.join(project.path, '.claude');
      if (await fs.exists(claudeDir)) {
        validProjects.push({
          ...project,
          valid: true
        });
      } else {
        validProjects.push({
          ...project,
          valid: false,
          reason: '.claude directory not found'
        });
      }
    } else {
      validProjects.push({
        ...project,
        valid: false,
        reason: 'Project directory not found'
      });
    }
  }

  return validProjects;
}

/**
 * Remove invalid projects from registry
 * @returns {Object} Results with removed count and list
 */
export async function pruneProjects() {
  const registry = await readRegistry();
  const removed = [];

  for (const [projectPath, metadata] of Object.entries(registry.projects)) {
    const exists = await fs.exists(projectPath);
    const claudeExists = exists && await fs.exists(path.join(projectPath, '.claude'));

    if (!exists || !claudeExists) {
      removed.push({
        path: projectPath,
        name: metadata.name,
        reason: !exists ? 'Project directory not found' : '.claude directory not found'
      });
      delete registry.projects[projectPath];
    }
  }

  await writeRegistry(registry);

  return {
    removed_count: removed.length,
    removed
  };
}

/**
 * Get a specific project by path
 * @param {string} projectPath - Absolute path to the project
 */
export async function getProject(projectPath) {
  const registry = await readRegistry();
  return registry.projects[projectPath] || null;
}
