#!/usr/bin/env node

/**
 * @wipal/agent-team CLI
 * Add AI agent teams to existing projects with minimal setup
 */

import { program } from 'commander';
import chalk from 'chalk';
import { initCommand } from '../src/commands/init.js';
import { addCommand } from '../src/commands/add.js';
import { listCommand } from '../src/commands/list.js';
import { removeCommand } from '../src/commands/remove.js';
import { projectsCommand } from '../src/commands/projects.js';
import { setupHooksCommand } from '../src/commands/setup-hooks.js';
import { startServer } from '../src/server/index.js';

const VERSION = '1.0.0';

// Header
const showHeader = () => {
  console.log('');
  console.log(chalk.cyan('╔═══════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.white('        🤖 Agent Team CLI v' + VERSION + '                          ') + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.gray('        Add AI agents to your project with ease               ') + chalk.cyan('║'));
  console.log(chalk.cyan('╚═══════════════════════════════════════════════════════════════╝'));
  console.log('');
};

program
  .name('agent-team')
  .description('Add AI agent teams to existing projects')
  .version(VERSION)
  .hook('preAction', () => {
    // Show header for all commands except help
    if (process.argv.length > 2 && !process.argv.includes('--help') && !process.argv.includes('-h')) {
      showHeader();
    }
  });

// Init command
program
  .command('init')
  .description('Initialize .claude/ structure in current project')
  .option('-f, --force', 'Overwrite existing files')
  .option('-m, --merge', 'Merge with existing .claude/ without destroying content')
  .option('--update', 'Update only package-provided files (rules, skills)')
  .option('--update-rules', 'Update rules when merging')
  .option('--hooks', 'Enable hooks during init')
  .option('--no-hooks', 'Skip hooks prompt during init')
  .option('--memory', 'Enable SimpleMem long-term memory system (requires Docker)')
  .action(initCommand);

// Add command
program
  .command('add [name] [role]')
  .description('Add a new agent to the project')
  .option('--framework <name>', 'UI/Backend framework (react, vue, nestjs, etc.)')
  .option('--styling <name>', 'CSS solution (tailwind, css-modules, etc.)')
  .option('--state <name>', 'State management (zustand, redux, etc.)')
  .option('--data <name>', 'Data fetching (tanstack-query, swr, etc.)')
  .option('--testing <name>', 'Test framework (vitest, jest, etc.)')
  .option('--form <name>', 'Form handling (react-hook-form, formik, etc.)')
  .option('--ui-lib <name>', 'UI component library (shadcn, mui, etc.)')
  .option('--i18n <name>', 'Internationalization (react-i18next, etc.)')
  .option('--database <name>', 'Database type (postgresql, mysql, mongodb, etc.)')
  .option('--orm <name>', 'ORM tool (prisma, typeorm, etc.)')
  .option('-i, --interactive', 'Run in interactive mode')
  .action(addCommand);

// List command
program
  .command('list')
  .alias('ls')
  .description('List all agents in the project')
  .action(listCommand);

// Remove command
program
  .command('remove <name>')
  .alias('rm')
  .description('Remove an agent from the project')
  .option('-f, --force', 'Skip confirmation')
  .action(removeCommand);

// Projects command
program
  .command('projects')
  .description('Manage all registered projects')
  .option('-l, --list', 'List all projects')
  .option('--prune', 'Remove invalid project entries')
  .option('--register', 'Register current project')
  .action(projectsCommand);

// Setup hooks command
program
  .command('setup-hooks')
  .description('Setup Claude Code hooks (pre-tool-use, post-tool-use, etc.)')
  .option('--enable <hook>', 'Enable specific hook')
  .option('--disable <hook>', 'Disable specific hook')
  .option('--list', 'List available hooks')
  .action(setupHooksCommand);

// UI command - Start web dashboard
program
  .command('ui')
  .description('Start web dashboard for managing agents')
  .option('-p, --port <number>', 'Port to run server on', '3456')
  .option('--no-open', 'Don\'t open browser automatically')
  .action(async (options) => {
    const port = parseInt(options.port, 10);
    const openBrowser = options.open !== false;

    console.log(chalk.blue('🎨 Starting Agent Team UI Dashboard...'));
    console.log('');

    try {
      await startServer({ port, openBrowser, projectRoot: process.cwd() });
    } catch (error) {
      console.error(chalk.red('Failed to start server:'), error.message);
      process.exit(1);
    }
  });

// Parse arguments
program.parse();
