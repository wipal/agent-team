/**
 * Setup-hooks command - Configure Claude Code hooks
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { getClaudeDir, isInitialized } from '../utils/file-utils.js';

/**
 * Setup hooks command handler
 */
export async function setupHooksCommand(options) {
  const projectRoot = process.cwd();

  if (!(await isInitialized(projectRoot))) {
    console.log(chalk.red('❌ Project not initialized'));
    console.log(chalk.gray('   Run `npx @wipal/agent-team init` first'));
    return;
  }

  if (options.list) {
    await listHooks();
    return;
  }

  if (options.enable) {
    await enableHook(options.enable, projectRoot);
    return;
  }

  if (options.disable) {
    await disableHook(options.disable, projectRoot);
    return;
  }

  // Interactive setup
  await interactiveSetup(projectRoot, options);
}

/**
 * List available hooks
 */
async function listHooks() {
  console.log(chalk.blue('📋 Available Claude Code Hooks'));
  console.log('');

  const hooks = [
    {
      name: 'pre_tool_use',
      description: 'Runs before any tool is called. Can block tool execution.'
    },
    {
      name: 'post_tool_use',
      description: 'Runs after a tool call completes. Receives tool result.'
    },
    {
      name: 'notification',
      description: 'Runs when a notification is triggered.'
    },
    {
      name: 'stop',
      description: 'Runs when a Claude Code session stops.'
    }
  ];

  for (const hook of hooks) {
    console.log(chalk.cyan(`  ${hook.name}`));
    console.log(chalk.gray(`    ${hook.description}`));
    console.log('');
  }

  console.log(chalk.gray('Usage:'));
  console.log(chalk.cyan('  npx @wipal/agent-team setup-hooks --enable pre_tool_use'));
  console.log(chalk.cyan('  npx @wipal/agent-team setup-hooks --disable post_tool_use'));
}

/**
 * Enable a specific hook
 */
async function enableHook(hookName, projectRoot) {
  const claudeDir = getClaudeDir(projectRoot);
  const hooksDir = path.join(claudeDir, 'hooks');
  const settingsPath = path.join(claudeDir, 'settings.json');

  const validHooks = ['pre_tool_use', 'post_tool_use', 'notification', 'stop'];
  if (!validHooks.includes(hookName)) {
    console.log(chalk.red(`❌ Invalid hook: ${hookName}`));
    console.log(chalk.gray(`   Valid hooks: ${validHooks.join(', ')}`));
    return;
  }

  await fs.ensureDir(hooksDir);

  // Create hook script
  const hookScript = getHookScript(hookName);
  const hookPath = path.join(hooksDir, `${hookName}.sh`);
  await fs.writeFile(hookPath, hookScript);
  await fs.chmod(hookPath, '755');

  // Update settings.json
  let settings = {};
  if (await fs.exists(settingsPath)) {
    settings = await fs.readJson(settingsPath);
  }

  if (!settings.hooks) {
    settings.hooks = {};
  }

  settings.hooks[hookName] = {
    command: `.claude/hooks/${hookName}.sh`,
    enabled: true
  };

  await fs.writeJson(settingsPath, settings, { spaces: 2 });

  console.log(chalk.green(`✓ Enabled hook: ${hookName}`));
}

/**
 * Disable a specific hook
 */
async function disableHook(hookName, projectRoot) {
  const claudeDir = getClaudeDir(projectRoot);
  const settingsPath = path.join(claudeDir, 'settings.json');

  if (!(await fs.exists(settingsPath))) {
    console.log(chalk.yellow('⚠ No settings.json found'));
    return;
  }

  const settings = await fs.readJson(settingsPath);

  if (settings.hooks && settings.hooks[hookName]) {
    settings.hooks[hookName].enabled = false;
    await fs.writeJson(settingsPath, settings, { spaces: 2 });
    console.log(chalk.green(`✓ Disabled hook: ${hookName}`));
  } else {
    console.log(chalk.yellow(`⚠ Hook ${hookName} is not configured`));
  }
}

/**
 * Interactive hooks setup
 */
async function interactiveSetup(projectRoot, options) {
  const claudeDir = getClaudeDir(projectRoot);

  console.log(chalk.blue('🔧 Claude Code Hooks Setup'));
  console.log('');

  const answer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'hooks',
      message: 'Select hooks to enable:',
      choices: [
        { name: 'pre_tool_use - Before any tool call', value: 'pre_tool_use', checked: true },
        { name: 'post_tool_use - After tool call completes', value: 'post_tool_use', checked: true },
        { name: 'notification - When notification triggered', value: 'notification', checked: false },
        { name: 'stop - When session stops', value: 'stop', checked: true }
      ]
    }
  ]);

  if (answer.hooks.length === 0) {
    console.log(chalk.yellow('No hooks selected'));
    return;
  }

  const hooksDir = path.join(claudeDir, 'hooks');
  await fs.ensureDir(hooksDir);

  for (const hookName of answer.hooks) {
    const hookScript = getHookScript(hookName);
    const hookPath = path.join(hooksDir, `${hookName}.sh`);
    await fs.writeFile(hookPath, hookScript);
    await fs.chmod(hookPath, '755');
    console.log(chalk.green(`   ✓ Created hook: ${hookName}.sh`));
  }

  // Update settings.json
  const settingsPath = path.join(claudeDir, 'settings.json');
  let settings = {};

  if (await fs.exists(settingsPath)) {
    settings = await fs.readJson(settingsPath);
  }

  settings.hooks = {};
  for (const hookName of answer.hooks) {
    settings.hooks[hookName] = {
      command: `.claude/hooks/${hookName}.sh`,
      enabled: true
    };
  }

  await fs.writeJson(settingsPath, settings, { spaces: 2 });
  console.log(chalk.green('   ✓ Updated settings.json with hooks configuration'));

  console.log('');
  console.log(chalk.green('✅ Hooks setup complete!'));
}

/**
 * Get hook script content
 */
function getHookScript(hookName) {
  const scripts = {
    pre_tool_use: `#!/bin/bash
# Pre-tool-use hook for agent-team
# This runs before any tool is called

# Read stdin for tool info
read -r TOOL_INFO

# Log tool usage (optional)
# echo "Tool call: $TOOL_INFO" >> ~/.agent-team/logs/tool-usage.log

# Return 0 to allow tool, non-zero to block
exit 0
`,
    post_tool_use: `#!/bin/bash
# Post-tool-use hook for agent-team
# This runs after a tool call completes

# Read stdin for result info
read -r TOOL_RESULT

# Log tool result (optional)
# echo "Tool result: $TOOL_RESULT" >> ~/.agent-team/logs/tool-usage.log

exit 0
`,
    notification: `#!/bin/bash
# Notification hook for agent-team
# This runs when a notification is triggered

# Read notification content
read -r NOTIFICATION

# You can add custom notification handling here
# e.g., send to Slack, Discord, etc.

exit 0
`,
    stop: `#!/bin/bash
# Stop hook for agent-team
# This runs when a session stops

# You can add cleanup or summary logic here
# e.g., save session state, generate summary

exit 0
`
  };

  return scripts[hookName] || '';
}
