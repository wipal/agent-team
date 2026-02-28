/**
 * Interactive prompts for agent-team CLI
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import {
  AVAILABLE_ROLES,
  VARIANT_CATEGORIES,
  getVariantsForRole,
  getAllSkills
} from '../utils/skill-resolver.js';
import { createAgent } from '../commands/add.js';

/**
 * Run interactive add mode
 */
export async function runInteractiveAdd(projectRoot, options = {}) {
  console.log(chalk.blue('🎮 Interactive Mode'));
  console.log('');

  // Step 1: Agent name
  const nameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Agent name:',
      default: options.name || 'my-agent',
      validate: (input) => {
        if (!input.trim()) return 'Agent name is required';
        if (!/^[a-z0-9-]+$/.test(input)) {
          return 'Use only lowercase letters, numbers, and hyphens';
        }
        return true;
      }
    }
  ]);

  // Step 2: Select role
  const roleAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Select role:',
      choices: AVAILABLE_ROLES.map(r => ({
        name: `${r.name.padEnd(12)} - ${r.description}`,
        value: r.name
      })),
      default: options.role
    }
  ]);

  const selectedRole = roleAnswer.role;

  // Step 3: Select variants based on role
  const availableVariants = getVariantsForRole(selectedRole);
  const selectedVariants = {};

  console.log('');
  console.log(chalk.blue('📦 Select variants (press Enter to skip a category):'));
  console.log('');

  for (const [category, config] of Object.entries(availableVariants)) {
    const choices = config.options.map(opt => ({
      name: opt.label,
      value: opt.value
    }));

    // Add "None" option
    choices.unshift({ name: 'None (skip)', value: null });

    if (config.type === 'select') {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: category,
          message: `${config.label}:`,
          choices,
          default: null
        }
      ]);

      if (answer[category]) {
        selectedVariants[category] = answer[category];
      }
    } else if (config.type === 'checkbox') {
      const answer = await inquirer.prompt([
        {
          type: 'checkbox',
          name: category,
          message: `${config.label}:`,
          choices: config.options.map(opt => ({
            name: opt.label,
            value: opt.value,
            checked: false
          }))
        }
      ]);

      if (answer[category] && answer[category].length > 0) {
        // For checkbox, store as array or join if single
        selectedVariants[category] = answer[category].join(',');
      }
    }
  }

  // Step 4: Show summary and confirm
  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log(chalk.cyan('  Summary'));
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log('');
  console.log(chalk.white(`  Agent Name: ${chalk.yellow(nameAnswer.name)}`));
  console.log(chalk.white(`  Role:       ${chalk.yellow(selectedRole)}`));
  console.log('');

  // Show selected variants
  const variantEntries = Object.entries(selectedVariants).filter(([_, v]) => v);
  if (variantEntries.length > 0) {
    console.log(chalk.white('  Variants:'));
    for (const [category, value] of variantEntries) {
      console.log(chalk.gray(`    - ${category}: ${value}`));
    }
  } else {
    console.log(chalk.gray('  Variants: None'));
  }

  // Show skills that will be installed
  const skills = getAllSkills(selectedRole, selectedVariants);
  console.log('');
  console.log(chalk.white(`  Skills to install (${skills.length}):`));
  console.log(chalk.gray(`    ${skills.join(', ')}`));

  console.log('');

  // Confirm
  const confirmAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Create this agent?',
      default: true
    }
  ]);

  if (!confirmAnswer.proceed) {
    console.log(chalk.yellow('Cancelled.'));
    return;
  }

  // Create the agent
  await createAgent(nameAnswer.name, selectedRole, selectedVariants, projectRoot);
}
