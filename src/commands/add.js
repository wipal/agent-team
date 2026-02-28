/**
 * Add command - Add a new agent to the project
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import {
  getClaudeDir,
  getAgentDir,
  getAgentFilePath,
  getAgentMemoryDir,
  isInitialized,
  agentExists,
  readTemplate,
  processTemplate,
  readRoleTemplate,
  copyRoleRules
} from '../utils/file-utils.js';
import {
  resolveSkills,
  getAllSkills,
  AVAILABLE_ROLES,
  getVariantsForRole
} from '../utils/skill-resolver.js';
import { runInteractiveAdd } from '../interactive/prompts.js';

// Role configurations
const ROLE_CONFIGS = {
  'dev-fe': {
    displayName: 'Frontend Developer',
    description: 'Frontend development specialist. Use for React/Vue/Angular tasks, UI implementation, component design.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Code runs, tests pass'
  },
  'dev-be': {
    displayName: 'Backend Developer',
    description: 'Backend development specialist. Use for API design, database work, server-side logic.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Code runs, tests pass'
  },
  'sa': {
    displayName: 'Solution Architect',
    description: 'Solution Architect specialist. Use for system design, architecture decisions, tech selection.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Architecture validated, ADRs complete'
  },
  'tech-lead': {
    displayName: 'Tech Lead',
    description: 'Technical leadership specialist. Use for code review, mentoring, technical decisions.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Code reviewed, tests pass'
  },
  'devops': {
    displayName: 'DevOps Engineer',
    description: 'DevOps specialist. Use for CI/CD, deployment, infrastructure.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Deployment verified'
  },
  'pm': {
    displayName: 'Product Manager',
    description: 'Product management specialist. Use for requirements, user stories, sprint planning.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Requirements traceable, stakeholders aligned'
  },
  'ba': {
    displayName: 'Business Analyst',
    description: 'Business analysis specialist. Use for requirements analysis, PRD creation, stakeholder communication.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Documentation accurate, acceptance criteria met'
  },
  'qa': {
    displayName: 'QA Engineer',
    description: 'Quality assurance specialist. Use for testing, bug reporting, test automation.',
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: '- [ ] Tests pass, bugs documented'
  }
};

/**
 * Add a new agent
 */
export async function addCommand(name, role, options) {
  const projectRoot = process.cwd();

  // Check if initialized
  if (!(await isInitialized(projectRoot))) {
    console.log(chalk.red('❌ Project not initialized'));
    console.log(chalk.gray('   Run `npx @wipal/agent-team init` first'));
    return;
  }

  // If no name/role provided, run interactive mode
  if (!name || !role || options.interactive) {
    await runInteractiveAdd(projectRoot, { name, role, ...options });
    return;
  }

  // Validate role
  const validRole = AVAILABLE_ROLES.find(r => r.name === role);
  if (!validRole) {
    console.log(chalk.red(`❌ Invalid role: ${role}`));
    console.log(chalk.gray('   Available roles:'));
    AVAILABLE_ROLES.forEach(r => {
      console.log(chalk.gray(`     - ${r.name}: ${r.description}`));
    });
    return;
  }

  // Check if agent already exists
  if (await agentExists(name, projectRoot)) {
    console.log(chalk.red(`❌ Agent '${name}' already exists`));
    console.log(chalk.gray('   Use a different name or remove the existing agent first'));
    return;
  }

  // Parse variants from options
  const variants = {};
  const variantOptions = [
    'framework', 'metaFramework', 'styling', 'state', 'data',
    'testing', 'form', 'uiLib', 'i18n', 'database', 'orm',
    'infra', 'cicd', 'monitoring'
  ];

  for (const opt of variantOptions) {
    const key = opt.charAt(0).toLowerCase() + opt.slice(1);
    // Handle kebab-case to camelCase
    const optKey = opt.replace(/([A-Z])/g, (m) => m.toLowerCase());
    if (options[optKey]) {
      variants[optKey] = options[optKey];
    }
  }

  // Create the agent
  await createAgent(name, role, variants, projectRoot);
}

/**
 * Create agent with given configuration
 */
export async function createAgent(name, role, variants, projectRoot) {
  const agentFilePath = getAgentFilePath(name, projectRoot);
  const agentMemoryDir = getAgentMemoryDir(name, projectRoot);
  const projectName = path.basename(projectRoot);

  console.log(chalk.blue('🚀 Creating agent...'));
  console.log(chalk.gray(`   Name: ${name}`));
  console.log(chalk.gray(`   Role: ${role}`));

  // Show selected variants
  const variantEntries = Object.entries(variants).filter(([_, v]) => v);
  if (variantEntries.length > 0) {
    console.log(chalk.gray(`   Variants: ${variantEntries.map(([k, v]) => `${k}=${v}`).join(', ')}`));
  }
  console.log('');

  // Get role config
  const roleConfig = ROLE_CONFIGS[role] || {
    displayName: role,
    description: `${role} specialist.`,
    tools: 'Read, Write, Edit, Bash, Grep, Glob',
    model: 'inherit',
    verificationChecklist: ''
  };

  // Resolve skills
  console.log(chalk.blue('   Resolving skills...'));
  const skills = resolveSkills(role, variants);
  const allSkills = getAllSkills(role, variants);

  console.log(chalk.gray(`   Core skills: ${skills.core.join(', ')}`));
  console.log(chalk.gray(`   Role skills: ${skills.role.join(', ')}`));
  if (skills.variants.length > 0) {
    console.log(chalk.gray(`   Variant skills: ${skills.variants.join(', ')}`));
  }

  // Create agent memory directory
  console.log(chalk.blue('   Creating agent memory directory...'));
  await fs.ensureDir(agentMemoryDir);

  // Ensure agents directory exists
  await fs.ensureDir(path.dirname(agentFilePath));

  // Copy role-specific rules
  console.log(chalk.blue('   Copying role rules...'));
  const copiedRule = await copyRoleRules(role, projectRoot);
  if (copiedRule) {
    console.log(chalk.green(`   ✓ Copied role rules: ${copiedRule}`));
  } else {
    console.log(chalk.gray('   ℹ No additional role rules needed'));
  }

  // Create agent .md file
  console.log(chalk.blue('   Creating agent file...'));
  await createAgentMd(name, role, variants, skills, roleConfig, projectName, agentFilePath);
  console.log(chalk.green(`   ✓ Created ${name}.md`));

  // Create knowledge.md in agent-memory
  console.log(chalk.blue('   Creating knowledge.md...'));
  await createKnowledgeMd(name, role, agentMemoryDir);
  console.log(chalk.green('   ✓ Created knowledge.md'));

  // Summary
  console.log('');
  console.log(chalk.green('✅ Agent created successfully!'));
  console.log('');
  console.log(chalk.blue('Agent files:'));
  console.log(chalk.gray(`   ${agentFilePath}`));
  console.log(chalk.gray(`   ${agentMemoryDir}/knowledge.md`));
  console.log('');
  console.log(chalk.blue('To use this agent:'));
  console.log(chalk.cyan(`   /${name} <task>`));
  console.log(chalk.gray('   or Claude will auto-delegate based on task description'));
  console.log('');
}

/**
 * Create agent .md file with frontmatter
 */
async function createAgentMd(name, role, variants, skills, roleConfig, projectName, agentFilePath) {
  // Build skills YAML
  const allSkillsList = [...skills.core, ...skills.role, ...skills.variants];
  const skillsYaml = allSkillsList.map(s => `  - ${s}`).join('\n');

  // Build tech stack from variants
  const techStack = Object.entries(variants)
    .filter(([_, v]) => v)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n');

  // Build variants list
  const variantsList = Object.entries(variants)
    .filter(([_, v]) => v)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n');

  // Build skills list for display
  const skillsList = allSkillsList.map(s => `- ${s}`).join('\n');

  // Get role behavioral template
  let roleBehavioralTemplate = '';
  const roleTemplate = await readRoleTemplate(role);
  if (roleTemplate) {
    roleBehavioralTemplate = roleTemplate;
  }

  // Build role skills description
  const roleSkillsDesc = skills.role.map(s => `- ${s}`).join('\n');

  const template = await readTemplate('agent.md.tmpl');
  const content = processTemplate(template, {
    AGENT_NAME: name,
    AGENT_DESCRIPTION: roleConfig.description,
    AGENT_TOOLS: roleConfig.tools,
    AGENT_MODEL: roleConfig.model,
    AGENT_SKILLS_YAML: skillsYaml,
    ROLE_DISPLAY_NAME: roleConfig.displayName,
    ROLE_SKILLS: roleSkillsDesc || `- ${role} tasks`,
    ROLE_BEHAVIORAL_TEMPLATE: roleBehavioralTemplate,
    ROLE_VERIFICATION_CHECKLIST: roleConfig.verificationChecklist,
    TECH_STACK: techStack || '- [Configure your tech stack]',
    VARIANTS_LIST: variantsList || '- [No variants selected]',
    SKILLS_LIST: skillsList || '- [No skills]'
  });

  await fs.writeFile(agentFilePath, content);
}

/**
 * Create knowledge.md for agent
 */
async function createKnowledgeMd(name, role, agentMemoryDir) {
  const now = new Date().toISOString();
  const template = await readTemplate('knowledge.md.tmpl');
  const content = processTemplate(template, {
    AGENT_NAME: name,
    ROLE_NAME: role,
    CREATED_AT: now,
    DATE: now.split('T')[0]
  });

  await fs.writeFile(path.join(agentMemoryDir, 'knowledge.md'), content);
}
