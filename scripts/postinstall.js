#!/usr/bin/env node

/**
 * Postinstall script for @wipal/agent-team
 * Displays setup information after npm install
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if current directory has .claude
const cwd = process.cwd();
const claudeDir = path.join(cwd, '.claude');
const hasClaudeDir = fs.existsSync(claudeDir);

console.log('');
console.log('\x1b[36m%s\x1b[0m', '🤖 @wipal/agent-team installed!');
console.log('');

if (hasClaudeDir) {
  console.log('\x1b[32m%s\x1b[0m', '✓ This project is already initialized with agent-team.');
  console.log('');
  console.log('Available commands:');
  console.log('  \x1b[36mnpx @wipal/agent-team list\x1b[0m          - List all agents');
  console.log('  \x1b[36mnpx @wipal/agent-team add <name> <role>\x1b[0m - Add a new agent');
  console.log('  \x1b[36mnpx @wipal/agent-team projects\x1b[0m       - Manage registered projects');
  console.log('  \x1b[36mnpx @wipal/agent-team setup-hooks\x1b[0m    - Configure Claude hooks');
  console.log('  \x1b[36mnpx @wipal/agent-team ui\x1b[0m             - Start web dashboard');
} else {
  console.log('To get started:');
  console.log('');
  console.log('  \x1b[36mcd your-project\x1b[0m');
  console.log('  \x1b[36mnpx @wipal/agent-team init\x1b[0m');
  console.log('');
  console.log('Available commands:');
  console.log('  \x1b[36minit\x1b[0m        - Initialize .claude/ structure');
  console.log('  \x1b[36madd\x1b[0m         - Add an AI agent');
  console.log('  \x1b[36mlist\x1b[0m        - List all agents');
  console.log('  \x1b[36mprojects\x1b[0m    - Manage registered projects');
  console.log('  \x1b[36msetup-hooks\x1b[0m - Configure Claude hooks');
  console.log('  \x1b[36mui\x1b[0m           - Start web dashboard');
}

console.log('');
console.log('\x1b[90m%s\x1b[0m', 'Documentation: https://github.com/wipal/agent-team');
console.log('');
