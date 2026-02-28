/**
 * Projects command - Manage all registered projects
 */

import chalk from 'chalk';
import {
  listProjects,
  listValidProjects,
  pruneProjects,
  getProject,
  unregisterProject
} from '../utils/global-registry.js';
import { getAgents, isInitialized } from '../utils/file-utils.js';

/**
 * Projects command handler
 */
export async function projectsCommand(options) {
  if (options.prune) {
    await pruneCommand();
  } else if (options.register) {
    await registerCurrentProject();
  } else {
    await listCommand(options);
  }
}

/**
 * List all registered projects
 */
async function listCommand(options) {
  console.log(chalk.blue('📁 Registered Projects'));
  console.log('');

  const projects = await listValidProjects();

  if (projects.length === 0) {
    console.log(chalk.yellow('No projects registered yet.'));
    console.log('');
    console.log(chalk.gray('Projects are automatically registered when you run:'));
    console.log(chalk.cyan('  npx @wipal/agent-team init'));
    return;
  }

  // Separate valid and invalid
  const validProjects = projects.filter(p => p.valid);
  const invalidProjects = projects.filter(p => !p.valid);

  // Show valid projects
  if (validProjects.length > 0) {
    console.log(chalk.green(`Valid Projects (${validProjects.length}):`));
    console.log('');

    for (const project of validProjects) {
      const lastAccessed = project.last_accessed
        ? new Date(project.last_accessed).toLocaleDateString()
        : 'Never';

      console.log(chalk.cyan(`  ${project.name}`));
      console.log(chalk.gray(`    Path: ${project.path}`));
      console.log(chalk.gray(`    Agents: ${project.agents_count || 0}`));
      console.log(chalk.gray(`    Last accessed: ${lastAccessed}`));
      console.log('');
    }
  }

  // Show invalid projects
  if (invalidProjects.length > 0) {
    console.log(chalk.yellow(`Invalid Projects (${invalidProjects.length}):`));
    console.log('');

    for (const project of invalidProjects) {
      console.log(chalk.red(`  ${project.name}`));
      console.log(chalk.gray(`    Path: ${project.path}`));
      console.log(chalk.gray(`    Reason: ${project.reason}`));
      console.log('');
    }

    console.log(chalk.gray('Run with --prune to remove invalid entries'));
  }

  console.log(chalk.gray(`Registry location: ~/.agent-team/registry.json`));
}

/**
 * Prune invalid project entries
 */
async function pruneCommand() {
  console.log(chalk.blue('🧹 Pruning invalid project entries...'));
  console.log('');

  const result = await pruneProjects();

  if (result.removed_count === 0) {
    console.log(chalk.green('✓ No invalid entries found'));
  } else {
    console.log(chalk.green(`✓ Removed ${result.removed_count} invalid entries:`));
    console.log('');

    for (const removed of result.removed) {
      console.log(chalk.gray(`  - ${removed.name} (${removed.reason})`));
    }
  }
}

/**
 * Register current project
 */
async function registerCurrentProject() {
  const projectRoot = process.cwd();

  if (!(await isInitialized(projectRoot))) {
    console.log(chalk.red('❌ Current directory is not initialized'));
    console.log(chalk.gray('   Run `npx @wipal/agent-team init` first'));
    return;
  }

  const agents = await getAgents(projectRoot);
  const { registerProject } = await import('../utils/global-registry.js');

  await registerProject(projectRoot, {
    agents_count: agents.length
  });

  console.log(chalk.green('✓ Project registered successfully'));
  console.log(chalk.gray(`  Path: ${projectRoot}`));
}
