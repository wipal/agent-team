/**
 * File utilities for agent-team CLI
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_ROOT = path.resolve(__dirname, '..', '..');

/**
 * Get the package root directory
 */
export function getPackageRoot() {
  return PACKAGE_ROOT;
}

/**
 * Get the current working directory (project root)
 */
export function getProjectRoot() {
  return process.cwd();
}

/**
 * Get .claude directory path in project
 */
export function getClaudeDir(projectRoot = getProjectRoot()) {
  return path.join(projectRoot, '.claude');
}

/**
 * Get agents directory path
 */
export function getAgentsDir(projectRoot = getProjectRoot()) {
  return path.join(getClaudeDir(projectRoot), 'agents');
}

/**
 * Get specific agent directory path (legacy - for backward compatibility)
 */
export function getAgentDir(agentName, projectRoot = getProjectRoot()) {
  return path.join(getAgentsDir(projectRoot), agentName);
}

/**
 * Get agent file path (new format: .claude/agents/<name>.md)
 */
export function getAgentFilePath(agentName, projectRoot = getProjectRoot()) {
  return path.join(getAgentsDir(projectRoot), `${agentName}.md`);
}

/**
 * Get agent memory directory path (.claude/agent-memory/<name>/)
 */
export function getAgentMemoryDir(agentName, projectRoot = getProjectRoot()) {
  return path.join(getClaudeDir(projectRoot), 'agent-memory', agentName);
}

/**
 * Check if .claude directory exists
 */
export async function isInitialized(projectRoot = getProjectRoot()) {
  return fs.exists(getClaudeDir(projectRoot));
}

/**
 * Check if agent exists (checks for .md file)
 */
export async function agentExists(agentName, projectRoot = getProjectRoot()) {
  // Check for new format (.md file)
  const agentFile = getAgentFilePath(agentName, projectRoot);
  if (await fs.exists(agentFile)) {
    return true;
  }
  // Also check for legacy format (directory)
  return fs.exists(getAgentDir(agentName, projectRoot));
}

/**
 * Get all agents in project
 */
export async function getAgents(projectRoot = getProjectRoot()) {
  const agentsDir = getAgentsDir(projectRoot);

  if (!(await fs.exists(agentsDir))) {
    return [];
  }

  const entries = await fs.readdir(agentsDir, { withFileTypes: true });
  const agents = [];

  for (const entry of entries) {
    // New format: .md files
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const agentName = entry.name.replace('.md', '');
      const agentPath = path.join(agentsDir, entry.name);

      // Parse frontmatter to get metadata
      let metadata = { name: agentName, description: '', skills: [] };
      try {
        const content = await fs.readFile(agentPath, 'utf-8');
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          // Parse simple YAML fields
          const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
          const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
          const skillsMatch = frontmatter.match(/^skills:\s*\n((?:  - .+\n?)+)/m);

          if (nameMatch) metadata.name = nameMatch[1].trim();
          if (descMatch) metadata.description = descMatch[1].trim();
          if (skillsMatch) {
            metadata.skills = skillsMatch[1]
              .split('\n')
              .filter(line => line.trim().startsWith('-'))
              .map(line => line.replace(/^\s*-\s*/, '').trim());
          }
        }
      } catch (e) {
        // Ignore parse errors
      }

      agents.push({
        name: agentName,
        path: agentPath,
        format: 'new',
        description: metadata.description,
        skills: metadata.skills
      });
    }
    // Legacy format: directories
    else if (entry.isDirectory()) {
      const agentDir = path.join(agentsDir, entry.name);
      const variantsPath = path.join(agentDir, 'variants.json');
      const skillsDir = path.join(agentDir, 'skills');

      let variants = null;
      if (await fs.exists(variantsPath)) {
        try {
          variants = await fs.readJson(variantsPath);
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Get skills list from agent's skills directory
      let skills = [];
      if (await fs.exists(skillsDir)) {
        try {
          const skillEntries = await fs.readdir(skillsDir, { withFileTypes: true });
          skills = skillEntries
            .filter(e => e.isDirectory())
            .map(e => e.name);
        } catch (e) {
          // Ignore errors
        }
      }

      agents.push({
        name: entry.name,
        path: agentDir,
        format: 'legacy',
        variants,
        skills
      });
    }
  }

  return agents;
}

/**
 * Copy rules from package to project
 * @param {string} projectRoot - Project root directory
 * @param {Object} options - Options for copying
 * @param {string[]} options.includeRoleRules - List of roles to copy rules for
 * @param {boolean} options.overwrite - Whether to overwrite existing files
 */
export async function copyRules(projectRoot = getProjectRoot(), options = {}) {
  const { includeRoleRules = [], overwrite = false } = options;
  const rulesSourceDir = path.join(PACKAGE_ROOT, '.claude', 'rules');
  const targetRulesDir = path.join(getClaudeDir(projectRoot), 'rules');

  await fs.ensureDir(targetRulesDir);

  // Always copy common rules
  const commonSourceDir = path.join(rulesSourceDir, 'common');
  const commonTargetDir = path.join(targetRulesDir, 'common');
  if (await fs.exists(commonSourceDir)) {
    await fs.copy(commonSourceDir, commonTargetDir, { overwrite });
  }

  // Always ensure lessons directory exists and copy template if not present
  const lessonsSourceDir = path.join(rulesSourceDir, 'lessons');
  const lessonsTargetDir = path.join(targetRulesDir, 'lessons');
  await fs.ensureDir(lessonsTargetDir);

  const lessonsTemplate = path.join(lessonsSourceDir, 'lessons.md');
  const lessonsTarget = path.join(lessonsTargetDir, 'lessons.md');
  if (await fs.exists(lessonsTemplate) && (!(await fs.exists(lessonsTarget)) || overwrite)) {
    await fs.copy(lessonsTemplate, lessonsTarget);
  }

  // Create role-rules directory (empty by default)
  const roleRulesTargetDir = path.join(targetRulesDir, 'role-rules');
  await fs.ensureDir(roleRulesTargetDir);

  // Only copy specific role rules if requested
  for (const role of includeRoleRules) {
    const roleRuleFile = `${role}-rules.md`;
    const roleRuleSource = path.join(rulesSourceDir, 'role-rules', roleRuleFile);
    const roleRuleTarget = path.join(roleRulesTargetDir, roleRuleFile);
    if (await fs.exists(roleRuleSource)) {
      await fs.copy(roleRuleSource, roleRuleTarget, { overwrite });
    }
  }
}

/**
 * Copy role-specific rules when adding agent
 * @param {string} role - Role name (e.g., 'dev-fe', 'sa')
 * @param {string} projectRoot - Project root directory
 * @returns {string|null} - Name of copied file or null if not copied
 */
export async function copyRoleRules(role, projectRoot = getProjectRoot()) {
  const rulesSourceDir = path.join(PACKAGE_ROOT, '.claude', 'rules', 'role-rules');
  const targetRulesDir = path.join(getClaudeDir(projectRoot), 'rules', 'role-rules');

  await fs.ensureDir(targetRulesDir);

  // Map role to rule file
  const roleRuleMap = {
    'dev-fe': 'dev-fe-rules.md',
    'sa': 'sa-rules.md',
    'dev-be': 'dev-be-rules.md',
    'tech-lead': 'tech-lead-rules.md',
    'devops': 'devops-rules.md',
    'pm': 'pm-rules.md',
    'qa': 'qa-rules.md'
  };

  const ruleFile = roleRuleMap[role];
  if (ruleFile) {
    const source = path.join(rulesSourceDir, ruleFile);
    const target = path.join(targetRulesDir, ruleFile);
    if (await fs.exists(source) && !(await fs.exists(target))) {
      await fs.copy(source, target);
      return ruleFile;
    }
  }
  return null;
}

/**
 * Read template file
 */
export async function readTemplate(templateName) {
  const templatePath = path.join(PACKAGE_ROOT, 'templates', templateName);
  return fs.readFile(templatePath, 'utf-8');
}

/**
 * Process template with variables
 */
export function processTemplate(template, variables) {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    result = result.replace(regex, value);
  }

  return result;
}

/**
 * Read role behavioral template
 * @param {string} role - Role name (e.g., 'dev-fe', 'sa')
 * @returns {string|null} - Template content or null if not found
 */
export async function readRoleTemplate(role) {
  const templatePath = path.join(PACKAGE_ROOT, 'templates', 'roles', `${role}.md`);
  if (await fs.exists(templatePath)) {
    return fs.readFile(templatePath, 'utf-8');
  }
  return null;
}
