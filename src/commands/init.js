/**
 * Init command - Initialize .claude/ structure in project
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { getClaudeDir, getProjectRoot, copyRules, getPackageRoot } from '../utils/file-utils.js';
import { registerProject } from '../utils/global-registry.js';

/**
 * Initialize .claude/ structure
 */
export async function initCommand(options) {
  const projectRoot = getProjectRoot();
  const claudeDir = getClaudeDir(projectRoot);

  console.log(chalk.blue('📁 Initializing project...'));
  console.log(chalk.gray(`   Project: ${projectRoot}`));
  console.log('');

  // Check if already initialized
  if (await fs.exists(claudeDir)) {
    if (options.force) {
      console.log(chalk.yellow('   Removing existing .claude/ directory...'));
      await fs.remove(claudeDir);
    } else if (options.merge) {
      console.log(chalk.blue('   Merging with existing .claude/ directory...'));
      await mergeInit(claudeDir, projectRoot, options);
      return;
    } else if (options.update) {
      console.log(chalk.blue('   Updating package files...'));
      await updateInit(claudeDir, projectRoot, options);
      return;
    } else {
      // Interactive prompt
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: '.claude/ directory already exists. What would you like to do?',
          choices: [
            { name: 'Merge (add missing files only)', value: 'merge' },
            { name: 'Update (refresh package files, keep custom)', value: 'update' },
            { name: 'Force (remove all and recreate)', value: 'force' },
            { name: 'Cancel', value: 'cancel' }
          ]
        }
      ]);

      if (answer.action === 'cancel') {
        console.log(chalk.gray('   Init cancelled'));
        return;
      } else if (answer.action === 'force') {
        console.log(chalk.yellow('   Removing existing .claude/ directory...'));
        await fs.remove(claudeDir);
      } else if (answer.action === 'merge') {
        await mergeInit(claudeDir, projectRoot, options);
        return;
      } else if (answer.action === 'update') {
        await updateInit(claudeDir, projectRoot, options);
        return;
      }
    }
  }

  // Create directory structure
  console.log(chalk.blue('   Creating directory structure...'));

  await fs.ensureDir(path.join(claudeDir, 'agents'));
  await fs.ensureDir(path.join(claudeDir, 'shared-skills'));
  await fs.ensureDir(path.join(claudeDir, 'rules', 'common'));
  await fs.ensureDir(path.join(claudeDir, 'rules', 'role-rules'));
  await fs.ensureDir(path.join(claudeDir, 'rules', 'lessons'));
  await fs.ensureDir(path.join(claudeDir, 'commands', 'roles'));
  await fs.ensureDir(path.join(claudeDir, 'commands', 'utils'));
  await fs.ensureDir(path.join(claudeDir, 'commands', 'workflows'));

  // Create CLAUDE.md
  const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
  if (!(await fs.exists(claudeMdPath)) || options.force) {
    const projectName = path.basename(projectRoot);
    const claudeMdContent = `# Project Context: ${projectName}

## Description
[Brief description of the project]

## Tech Stack
- Frontend:
- Backend:
- Database:
- Infrastructure:

## Team Members (Agents)
[List of configured agents - run 'npx @wipal/agent-team list' to see]

## Getting Started
1. Add agents: \`npx @wipal/agent-team add <name> <role> [options]\`
2. List agents: \`npx @wipal/agent-team list\`
3. Switch agent: Use the agent's CLAUDE.md file

## Notes
- Use Context7 MCP for documentation lookup
- Run \`/retrospect-work\` at end of session
- Update this file with project-specific context
`;
    await fs.writeFile(claudeMdPath, claudeMdContent);
    console.log(chalk.green('   ✓ Created CLAUDE.md'));
  }

  // Create settings.json
  const settingsPath = path.join(claudeDir, 'settings.json');
  if (!(await fs.exists(settingsPath)) || options.force) {
    const settingsContent = {
      mcpServers: {
        context7: {
          command: 'npx',
          args: ['-y', '@context7/mcp-server']
        },
        github: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-github'],
          env: {
            GITHUB_TOKEN: '${GITHUB_TOKEN}'
          }
        }
      }
    };
    await fs.writeJson(settingsPath, settingsContent, { spaces: 2 });
    console.log(chalk.green('   ✓ Created settings.json'));
  }

  // Copy rules (only common rules, no role-specific rules)
  console.log(chalk.blue('   Copying rules...'));
  try {
    await copyRules(projectRoot, { includeRoleRules: [] });
    console.log(chalk.green('   ✓ Copied common rules (role rules will be added when creating agents)'));
  } catch (error) {
    console.log(chalk.yellow('   ⚠ Could not copy rules (package may not have rules)'));
  }

  // Create lessons.md template
  const lessonsPath = path.join(claudeDir, 'rules', 'lessons', 'lessons.md');
  if (!(await fs.exists(lessonsPath))) {
    const lessonsContent = `# Lessons Learned

## Format
### YYYY-MM-DD: Lesson Title
**What happened:** Description
**Lesson:** What we learned
**Rule added:** Rule to prevent same mistake

## Recent Lessons
(No lessons yet - run /retrospect-work after sessions)
`;
    await fs.writeFile(lessonsPath, lessonsContent);
    console.log(chalk.green('   ✓ Created lessons.md'));
  }

  // Ask about hooks setup
  await promptForHooks(claudeDir, options);

  // Setup SimpleMem if --memory flag
  if (options.memory) {
    await setupMemory(claudeDir, projectRoot);
  }

  // Register project in global registry
  await registerProject(projectRoot, { agents_count: 0 });
  console.log(chalk.green('   ✓ Project registered in global registry'));

  console.log('');
  console.log(chalk.green('✅ Project initialized successfully!'));
  console.log('');
  console.log(chalk.blue('Next steps:'));
  console.log(chalk.gray('   1. Add an agent:'));
  console.log(chalk.cyan('      npx @wipal/agent-team add <name> <role> [options]'));
  console.log('');
  console.log(chalk.gray('   2. Or use interactive mode:'));
  console.log(chalk.cyan('      npx @wipal/agent-team add'));
  console.log('');
  console.log(chalk.gray('   3. Available roles: dev-fe, dev-be, sa, tech-lead, devops, pm, qa'));
}

/**
 * Merge init - add missing files without destroying existing content
 */
async function mergeInit(claudeDir, projectRoot, options) {
  // Create missing directories
  const requiredDirs = [
    'agents',
    'shared-skills',
    'rules/common',
    'rules/role-rules',
    'rules/lessons',
    'commands/roles',
    'commands/utils',
    'commands/workflows'
  ];

  for (const dir of requiredDirs) {
    await fs.ensureDir(path.join(claudeDir, dir));
  }
  console.log(chalk.green('   ✓ Ensured all directories exist'));

  // Create CLAUDE.md if missing
  const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
  if (!(await fs.exists(claudeMdPath))) {
    const projectName = path.basename(projectRoot);
    const claudeMdContent = `# Project Context: ${projectName}

## Description
[Brief description of the project]

## Tech Stack
- Frontend:
- Backend:
- Database:
- Infrastructure:

## Team Members (Agents)
[List of configured agents - run 'npx @wipal/agent-team list' to see]
`;
    await fs.writeFile(claudeMdPath, claudeMdContent);
    console.log(chalk.green('   ✓ Created CLAUDE.md'));
  } else {
    console.log(chalk.gray('   ℹ CLAUDE.md already exists, skipping'));
  }

  // Create settings.json if missing
  const settingsPath = path.join(claudeDir, 'settings.json');
  if (!(await fs.exists(settingsPath))) {
    const settingsContent = {
      mcpServers: {
        context7: {
          command: 'npx',
          args: ['-y', '@context7/mcp-server']
        }
      }
    };
    await fs.writeJson(settingsPath, settingsContent, { spaces: 2 });
    console.log(chalk.green('   ✓ Created settings.json'));
  } else {
    console.log(chalk.gray('   ℹ settings.json already exists, skipping'));
  }

  // Copy rules (only if update flag is set)
  if (options.updateRules) {
    try {
      await copyRules(projectRoot, { includeRoleRules: [], overwrite: true });
      console.log(chalk.green('   ✓ Updated rules'));
    } catch (error) {
      console.log(chalk.yellow('   ⚠ Could not update rules'));
    }
  }

  // Ask about hooks
  await promptForHooks(claudeDir, options);

  // Register project
  await registerProject(projectRoot, { agents_count: 0 });

  console.log('');
  console.log(chalk.green('✅ Project merged successfully!'));
}

/**
 * Update init - refresh package files, keep custom content
 */
async function updateInit(claudeDir, projectRoot, options) {
  // Copy rules with overwrite
  try {
    await copyRules(projectRoot, { includeRoleRules: [], overwrite: true });
    console.log(chalk.green('   ✓ Updated rules'));
  } catch (error) {
    console.log(chalk.yellow('   ⚠ Could not update rules'));
  }

  // Register/update project
  await registerProject(projectRoot, { agents_count: 0 });

  console.log('');
  console.log(chalk.green('✅ Project updated successfully!'));
}

/**
 * Prompt for hooks setup
 */
async function promptForHooks(claudeDir, options) {
  // Skip if --no-hooks flag or if hooks already set up
  if (options.noHooks) {
    console.log(chalk.gray('   ℹ Skipping hooks setup (--no-hooks)'));
    return;
  }

  const hooksDir = path.join(claudeDir, 'hooks');
  if (await fs.exists(hooksDir)) {
    console.log(chalk.gray('   ℹ Hooks directory already exists, skipping'));
    return;
  }

  // Only prompt in interactive mode or if --hooks flag
  if (!options.hooks && !process.stdin.isTTY) {
    console.log(chalk.gray('   ℹ Run "npx @wipal/agent-team setup-hooks" to enable hooks later'));
    return;
  }

  if (options.hooks) {
    await setupHooks(claudeDir, 'all');
    return;
  }

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'hooks',
      message: 'Would you like to enable Claude Code hooks?',
      choices: [
        { name: 'Yes, enable all hooks', value: 'all' },
        { name: 'Yes, let me choose which hooks', value: 'select' },
        { name: "No, I'll set up later with 'setup-hooks'", value: 'none' }
      ],
      default: 'none'
    }
  ]);

  if (answer.hooks === 'all') {
    await setupHooks(claudeDir, 'all');
  } else if (answer.hooks === 'select') {
    const selectAnswer = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedHooks',
        message: 'Select hooks to enable:',
        choices: [
          { name: 'pre_tool_use - Before any tool call', value: 'pre_tool_use', checked: true },
          { name: 'post_tool_use - After tool call completes', value: 'post_tool_use', checked: true },
          { name: 'notification - When notification triggered', value: 'notification', checked: false },
          { name: 'stop - When session stops', value: 'stop', checked: true }
        ]
      }
    ]);
    await setupHooks(claudeDir, selectAnswer.selectedHooks);
  } else {
    console.log(chalk.gray('   ℹ Run "npx @wipal/agent-team setup-hooks" to enable hooks later'));
  }
}

/**
 * Setup hooks
 */
async function setupHooks(claudeDir, hooks) {
  const hooksDir = path.join(claudeDir, 'hooks');
  await fs.ensureDir(hooksDir);

  const availableHooks = {
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

  const hooksToCreate = hooks === 'all' ? Object.keys(availableHooks) : hooks;

  for (const hookName of hooksToCreate) {
    if (availableHooks[hookName]) {
      const hookPath = path.join(hooksDir, `${hookName}.sh`);
      await fs.writeFile(hookPath, availableHooks[hookName]);
      await fs.chmod(hookPath, '755');
      console.log(chalk.green(`   ✓ Created hook: ${hookName}.sh`));
    }
  }

  // Update settings.json to include hooks
  const settingsPath = path.join(claudeDir, 'settings.json');
  let settings = {};

  if (await fs.exists(settingsPath)) {
    settings = await fs.readJson(settingsPath);
  }

  settings.hooks = {};
  for (const hookName of hooksToCreate) {
    if (availableHooks[hookName]) {
      settings.hooks[hookName] = {
        command: `.claude/hooks/${hookName}.sh`,
        enabled: true
      };
    }
  }

  await fs.writeJson(settingsPath, settings, { spaces: 2 });
  console.log(chalk.green('   ✓ Updated settings.json with hooks configuration'));
}

/**
 * Setup SimpleMem long-term memory system
 */
async function setupMemory(claudeDir, projectRoot) {
  console.log(chalk.blue('   Setting up SimpleMem long-term memory...'));

  const projectName = path.basename(projectRoot);

  // 1. Check if Docker is available
  try {
    const { execSync } = await import('child_process');
    execSync('docker --version', { stdio: 'pipe' });
  } catch (error) {
    console.log(chalk.yellow('   ⚠ Docker not found. SimpleMem requires Docker.'));
    console.log(chalk.gray('   Install Docker: https://docs.docker.com/get-docker/'));
    console.log(chalk.gray('   Then run: docker compose -f <agent-team>/docker/docker-compose.yml up -d'));
    return;
  }

  // 2. Check if simplemem-mcp container is running
  try {
    const { execSync } = await import('child_process');
    const containers = execSync('docker ps --filter name=simplemem-mcp --format {{.Names}}', {
      encoding: 'utf-8'
    }).trim();

    if (!containers.includes('simplemem-mcp')) {
      console.log(chalk.yellow('   ⚠ SimpleMem container not running.'));
      console.log(chalk.gray('   Start it with:'));
      console.log(chalk.cyan('   cd <agent-team-package>/docker && docker compose up -d'));
      console.log(chalk.gray('   Or build and run manually.'));
      return;
    }
    console.log(chalk.green('   ✓ SimpleMem container is running'));
  } catch (error) {
    console.log(chalk.yellow('   ⚠ Could not check Docker container status'));
  }

  // 3. Update settings.json with MCP server
  const settingsPath = path.join(claudeDir, 'settings.json');
  let settings = {};

  if (await fs.exists(settingsPath)) {
    settings = await fs.readJson(settingsPath);
  }

  // Add SimpleMem MCP server
  settings.mcpServers = settings.mcpServers || {};
  settings.mcpServers.simplemem = {
    command: 'docker',
    args: [
      'exec', '-i', 'simplemem-mcp',
      'python', '-m', 'simplemem_mcp.server',
      '--project', projectName
    ]
  };

  await fs.writeJson(settingsPath, settings, { spaces: 2 });
  console.log(chalk.green('   ✓ Added SimpleMem MCP server to settings.json'));

  // 4. Copy memory skills
  const skillsDir = path.join(claudeDir, 'skills', 'memory');
  const packageRoot = getPackageRoot();
  const memorySkillsSource = path.join(packageRoot, 'templates', 'skills', 'memory');

  if (await fs.exists(memorySkillsSource)) {
    await fs.ensureDir(skillsDir);
    await fs.copy(memorySkillsSource, skillsDir, { overwrite: true });
    console.log(chalk.green('   ✓ Copied memory skills (remember, recall, reflect)'));
  } else {
    console.log(chalk.yellow('   ⚠ Memory skills templates not found in package'));
    console.log(chalk.gray('   Skills will need to be created manually'));
  }

  // 5. Create agent-memory directory
  const agentMemoryDir = path.join(claudeDir, 'agent-memory');
  await fs.ensureDir(agentMemoryDir);
  console.log(chalk.green('   ✓ Created agent-memory directory'));

  // 6. Create memory config file
  const memoryConfigPath = path.join(claudeDir, 'memory-config.yaml');
  const memoryConfig = `# SimpleMem Configuration
# This file configures the long-term memory system

enabled: true
project: ${projectName}

# MCP Server (configured in settings.json)
# Tools available:
# - memory_add: Store new memory
# - memory_search: Semantic search
# - memory_get_context: Get context by intent
# - memory_consolidate: Synthesize patterns

# Skills available:
# - /remember: Store important information
# - /recall: Search memories
# - /reflect: Consolidate patterns
`;
  await fs.writeFile(memoryConfigPath, memoryConfig);
  console.log(chalk.green('   ✓ Created memory-config.yaml'));

  console.log('');
  console.log(chalk.cyan('   SimpleMem is now enabled!'));
  console.log(chalk.gray('   Use /remember, /recall, /reflect skills'));
  console.log(chalk.gray('   Or call memory_add, memory_search MCP tools directly'));
}

