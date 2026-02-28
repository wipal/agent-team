/**
 * List command - List all agents in the project
 */

import chalk from 'chalk';
import { isInitialized, getAgents } from '../utils/file-utils.js';

/**
 * List all agents
 */
export async function listCommand() {
  const projectRoot = process.cwd();

  // Check if initialized
  if (!(await isInitialized(projectRoot))) {
    console.log(chalk.yellow('⚠️  Project not initialized'));
    console.log(chalk.gray('   Run `npx @wipal/agent-team init` first'));
    return;
  }

  // Get agents
  const agents = await getAgents(projectRoot);

  if (agents.length === 0) {
    console.log(chalk.yellow('📋 No agents found'));
    console.log('');
    console.log(chalk.gray('   Create one with:'));
    console.log(chalk.cyan('   npx @wipal/agent-team add <name> <role>'));
    return;
  }

  console.log(chalk.blue(`📋 Agents in project (${agents.length})`));
  console.log('');

  // Table header
  console.log(chalk.gray('┌─────────────────┬─────────────┬──────────┬────────────────────────────┐'));
  console.log(chalk.gray('│') + chalk.white(' Agent           ') + chalk.gray('│') + chalk.white(' Format      ') + chalk.gray('│') + chalk.white(' Skills   ') + chalk.gray('│') + chalk.white(' Description                ') + chalk.gray('│'));
  console.log(chalk.gray('├─────────────────┼─────────────┼──────────┼────────────────────────────┤'));

  // Table rows
  for (const agent of agents) {
    const name = agent.name.padEnd(15).slice(0, 15);
    const format = (agent.format === 'new' ? 'new (.md)' : 'legacy (dir)').padEnd(11).slice(0, 11);
    const skillsCount = String(agent.skills?.length || 0).padEnd(8).slice(0, 8);

    // Format description
    let desc = '';
    if (agent.format === 'new' && agent.description) {
      desc = agent.description.substring(0, 26).padEnd(26);
    } else if (agent.variants?.base_role) {
      desc = `Role: ${agent.variants.base_role}`.substring(0, 26).padEnd(26);
    } else {
      desc = '(no description)'.padEnd(26);
    }

    const formatColor = agent.format === 'new' ? chalk.green : chalk.yellow;
    console.log(chalk.gray('│') + chalk.cyan(name) + chalk.gray('│') + formatColor(format) + chalk.gray('│') + chalk.white(skillsCount) + chalk.gray('│') + chalk.gray(desc) + chalk.gray('│'));
  }

  // Table footer
  console.log(chalk.gray('└─────────────────┴─────────────┴──────────┴────────────────────────────┘'));

  console.log('');
  console.log(chalk.gray('To use an agent:'));
  console.log(chalk.cyan('   /<agent-name> <task>'));
  console.log(chalk.gray('   or Claude will auto-delegate based on task description'));
  console.log('');
  console.log(chalk.gray('View agent details:'));
  console.log(chalk.cyan('   npx @wipal/agent-team switch <name>'));
}
