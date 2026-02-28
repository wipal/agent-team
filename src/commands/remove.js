/**
 * Remove command - Remove an agent from the project
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import { isInitialized, agentExists, getAgentDir, getAgents } from '../utils/file-utils.js';

/**
 * Remove an agent
 */
export async function removeCommand(name, options) {
  const projectRoot = process.cwd();

  // Check if initialized
  if (!(await isInitialized(projectRoot))) {
    console.log(chalk.red('❌ Project not initialized'));
    console.log(chalk.gray('   Run `npx @wipal/agent-team init` first'));
    return;
  }

  // Check if agent exists
  if (!(await agentExists(name, projectRoot))) {
    console.log(chalk.red(`❌ Agent '${name}' not found`));
    console.log('');
    console.log(chalk.gray('List available agents:'));
    console.log(chalk.cyan('   npx @wipal/agent-team list'));
    return;
  }

  const agentDir = getAgentDir(name, projectRoot);

  // Confirm deletion unless --force
  if (!options.force) {
    console.log(chalk.yellow(`⚠️  This will remove agent '${name}' and all its data`));
    console.log(chalk.gray(`   Location: ${agentDir}`));
    console.log('');

    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: `Remove agent '${name}'?`,
        default: false
      }
    ]);

    if (!answer.proceed) {
      console.log(chalk.gray('Cancelled.'));
      return;
    }
  }

  // Remove the agent
  console.log(chalk.blue(`Removing agent '${name}'...`));
  await fs.remove(agentDir);

  console.log(chalk.green(`✅ Agent '${name}' removed`));
  console.log('');

  // Show remaining agents
  const remainingAgents = await getAgents(projectRoot);
  if (remainingAgents.length > 0) {
    console.log(chalk.gray(`Remaining agents: ${remainingAgents.length}`));
    console.log(chalk.cyan('   npx @wipal/agent-team list'));
  } else {
    console.log(chalk.gray('No agents remaining'));
    console.log(chalk.cyan('   npx @wipal/agent-team add <name> <role>'));
  }
}
