/**
 * Skill Resolver - Resolve skills for roles and variants
 * Uses config-driven approach with auto-discovery
 *
 * v2: Supports YAML config + per-project overrides
 */

import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { getPackageRoot, getClaudeDir } from './file-utils.js';
import { getSkills, getSkillsByCategory, clearSkillsCache } from './skill-scanner.js';

// ============================================
// Config Loading
// ============================================

// Cache for loaded configs
let defaultRolesConfig = null;

/**
 * Load YAML config file
 */
async function loadYamlConfig(configPath) {
  try {
    if (await fs.exists(configPath)) {
      const content = await fs.readFile(configPath, 'utf-8');
      return yaml.load(content);
    }
  } catch (error) {
    console.warn(`Failed to load config: ${configPath}`, error.message);
  }
  return null;
}

/**
 * Get roles config (default + per-project override)
 */
async function getRolesConfig(projectRoot = process.cwd()) {
  // Load default config
  if (!defaultRolesConfig) {
    const defaultPath = path.join(getPackageRoot(), 'config', 'roles.yaml');
    defaultRolesConfig = await loadYamlConfig(defaultPath);
  }

  // Check for per-project override
  const projectConfigPath = path.join(getClaudeDir(projectRoot), 'roles.yaml');
  const projectConfig = await loadYamlConfig(projectConfigPath);

  // Merge configs (project overrides default)
  if (projectConfig && defaultRolesConfig) {
    return {
      ...defaultRolesConfig,
      roles: {
        ...defaultRolesConfig.roles,
        ...(projectConfig.roles || {})
      }
    };
  }

  return defaultRolesConfig || { roles: {} };
}

/**
 * Resolve skills for a role using config
 * @param {string} roleName - Role name
 * @param {Object} options - Options
 * @param {boolean} options.includeOptional - Include optional skills
 * @param {string} options.projectRoot - Project root for per-project config
 * @returns {Promise<Object>} - { core, role, inherited, optional, all } skills
 */
export async function resolveRoleSkills(roleName, options = {}) {
  const { includeOptional = false, projectRoot = process.cwd() } = options;
  const config = await getRolesConfig(projectRoot);
  const allSkills = await getSkills();

  const result = {
    core: [],
    role: [],
    inherited: [],
    optional: [],
    all: []
  };

  // Get role definition
  const roleDef = config.roles?.[roleName];
  if (!roleDef) {
    console.warn(`Role not found: ${roleName}`);
    return result;
  }

  const skillsConfig = roleDef.skills || {};

  // 1. Core skills (always included)
  result.core = config.core_skills || ['code-review', 'git-automation', 'retrospect-work'];

  // 2. Skills by category (include)
  if (skillsConfig.include) {
    for (const rule of skillsConfig.include) {
      if (typeof rule === 'string') {
        // Direct skill name
        const skill = allSkills.find(s => s.name === rule);
        if (skill) result.role.push(skill.name);
      } else if (rule.category) {
        // Category-based
        const categorySkills = getSkillsByCategory(allSkills, rule.category);
        result.role.push(...categorySkills.map(s => s.name));
      }
    }
  }

  // 3. Inherited skills from parent roles
  if (skillsConfig.inherit && skillsConfig.inherit.length > 0) {
    for (const parentRole of skillsConfig.inherit) {
      const parentSkills = await resolveRoleSkills(parentRole, { projectRoot });
      result.inherited.push(...parentSkills.all);
    }
  }

  // 4. Optional skills (only if requested)
  if (includeOptional && skillsConfig.optional) {
    for (const rule of skillsConfig.optional) {
      if (rule.category) {
        const categorySkills = getSkillsByCategory(allSkills, rule.category);
        result.optional.push(...categorySkills.map(s => s.name));
      }
    }
  }

  // 5. Exclude specified skills
  if (skillsConfig.exclude && skillsConfig.exclude.length > 0) {
    for (const exclude of skillsConfig.exclude) {
      if (typeof exclude === 'string') {
        result.role = result.role.filter(s => s !== exclude);
        result.inherited = result.inherited.filter(s => s !== exclude);
      }
    }
  }

  // Combine all (deduplicated)
  result.all = [...new Set([
    ...result.core,
    ...result.role,
    ...result.inherited,
    ...(includeOptional ? result.optional : [])
  ])];

  return result;
}

/**
 * Get all skills for a role (simplified async)
 */
export async function getAllSkillsForRole(roleName, projectRoot = process.cwd()) {
  const resolved = await resolveRoleSkills(roleName, { projectRoot });
  return resolved.all;
}

/**
 * Get available roles with descriptions
 */
export async function getAvailableRoles(projectRoot = process.cwd()) {
  const config = await getRolesConfig(projectRoot);
  const roles = [];

  for (const [name, def] of Object.entries(config.roles || {})) {
    roles.push({
      name,
      description: def.description || '',
      inherits: def.skills?.inherit || []
    });
  }

  return roles;
}

// ============================================
// Legacy Support (Sync functions for backward compatibility)
// ============================================

/**
 * Core skills - always included for all agents
 */
const CORE_SKILLS = [
  'code-review',
  'git-automation',
  'retrospect-work'
];

/**
 * Role to skills mapping (legacy - with inheritance for tech-lead)
 */
const ROLE_SKILL_MAP = {
  'dev-fe': [
    'frontend-design',
    'accessibility',
    'state-management',
    'testing-fe',
    'performance-fe'
  ],
  'dev-be': [
    'api-design',
    'database-design',
    'security',
    'testing-be',
    'performance-be'
  ],
  'sa': [
    'system-design',
    'architecture-patterns',
    'adr-writing',
    'tech-selection',
    'performance-engineering',
    'security-architecture'
  ],
  // Tech Lead now inherits from dev-fe + dev-be
  'tech-lead': [
    // Leadership skills
    'code-review-advanced',
    'technical-decision',
    'mentoring',
    'technical-debt',
    // Inherited from dev-fe
    'frontend-design',
    'accessibility',
    'state-management',
    'testing-fe',
    'performance-fe',
    // Inherited from dev-be
    'api-design',
    'database-design',
    'security',
    'testing-be',
    'performance-be'
  ],
  'devops': [
    'ci-cd',
    'containerization',
    'infrastructure-as-code',
    'monitoring',
    'deployment'
  ],
  'pm': [
    'requirements-gathering',
    'user-stories',
    'sprint-planning',
    'roadmap-planning',
    'stakeholder-communication'
  ],
  'qa': [
    'test-planning',
    'bug-reporting',
    'test-automation',
    'regression-testing'
  ]
};

/**
 * Variant to skills mapping
 */
const VARIANT_SKILL_MAP = {
  // Framework - Frontend
  'framework:react': ['frontend-design'],
  'framework:vue': ['frontend-design'],
  'framework:angular': ['frontend-design'],
  'framework:svelte': ['frontend-design'],
  'framework:vanilla': ['frontend-design'],

  // Meta-framework
  'metaFramework:nextjs': ['frontend-design'],
  'metaFramework:nuxt': ['frontend-design'],
  'metaFramework:remix': ['frontend-design'],
  'metaFramework:astro': ['frontend-design'],

  // Styling
  'styling:tailwind': ['frontend-design'],
  'styling:css-modules': ['frontend-design'],
  'styling:styled-components': ['frontend-design'],
  'styling:scss': ['frontend-design'],

  // State management
  'state:zustand': ['state-management'],
  'state:redux': ['state-management'],
  'state:recoil': ['state-management'],
  'state:jotai': ['state-management'],
  'state:mobx': ['state-management'],
  'state:pinia': ['state-management'],

  // Data fetching
  'data:tanstack-query': ['state-management'],
  'data:swr': ['state-management'],
  'data:apollo': ['api-design'],
  'data:urql': ['api-design'],

  // Testing - Frontend
  'testing:vitest': ['testing-fe'],
  'testing:jest': ['testing-fe'],
  'testing:cypress': ['testing-fe'],
  'testing:playwright': ['testing-fe'],
  'testing:testing-library': ['testing-fe'],

  // Form handling
  'form:react-hook-form': ['frontend-design'],
  'form:formik': ['frontend-design'],
  'form:zod': ['frontend-design'],

  // UI libraries
  'uiLib:shadcn': ['frontend-design'],
  'uiLib:mui': ['frontend-design'],
  'uiLib:ant-design': ['frontend-design'],
  'uiLib:chakra': ['frontend-design'],

  // i18n
  'i18n:react-i18next': ['frontend-design'],
  'i18n:formatjs': ['frontend-design'],
  'i18n:next-intl': ['frontend-design'],

  // Framework - Backend
  'framework:nestjs': ['api-design', 'database-design'],
  'framework:express': ['api-design'],
  'framework:fastify': ['api-design'],
  'framework:fastapi': ['api-design'],
  'framework:django': ['api-design', 'database-design'],
  'framework:gin': ['api-design'],
  'framework:echo': ['api-design'],

  // Database
  'database:postgresql': ['database-design'],
  'database:mysql': ['database-design'],
  'database:mongodb': ['database-design'],
  'database:redis': ['database-design'],
  'database:sqlite': ['database-design'],

  // ORM
  'orm:prisma': ['database-design'],
  'orm:typeorm': ['database-design'],
  'orm:sequelize': ['database-design'],
  'orm:mikro-orm': ['database-design'],
  'orm:mongoose': ['database-design'],

  // Infrastructure
  'infra:docker': ['containerization'],
  'infra:kubernetes': ['containerization', 'deployment'],
  'infra:terraform': ['infrastructure-as-code'],
  'infra:ansible': ['infrastructure-as-code'],

  // CI/CD
  'cicd:github-actions': ['ci-cd'],
  'cicd:gitlab-ci': ['ci-cd'],
  'cicd:jenkins': ['ci-cd'],

  // Monitoring
  'monitoring:prometheus': ['monitoring'],
  'monitoring:grafana': ['monitoring'],
  'monitoring:datadog': ['monitoring'],
  'monitoring:sentry': ['monitoring']
};

/**
 * Available roles with descriptions (legacy sync)
 */
export const AVAILABLE_ROLES = [
  { name: 'dev-fe', description: 'Frontend Developer - React, Vue, Angular' },
  { name: 'dev-be', description: 'Backend Developer - Node.js, Python, Go' },
  { name: 'sa', description: 'Solution Architect - System design, ADRs' },
  { name: 'tech-lead', description: 'Tech Lead - Code review, mentoring (includes dev-fe + dev-be skills)' },
  { name: 'devops', description: 'DevOps Engineer - CI/CD, infrastructure' },
  { name: 'pm', description: 'Product Manager - Requirements, sprints' },
  { name: 'qa', description: 'QA Engineer - Testing, automation' }
];

/**
 * Available variant categories and options
 */
export const VARIANT_CATEGORIES = {
  framework: {
    label: 'Framework',
    type: 'select',
    options: [
      { value: 'react', label: 'React', roles: ['dev-fe'] },
      { value: 'vue', label: 'Vue', roles: ['dev-fe'] },
      { value: 'angular', label: 'Angular', roles: ['dev-fe'] },
      { value: 'svelte', label: 'Svelte', roles: ['dev-fe'] },
      { value: 'vanilla', label: 'Vanilla JS', roles: ['dev-fe'] },
      { value: 'nestjs', label: 'NestJS', roles: ['dev-be'] },
      { value: 'express', label: 'Express', roles: ['dev-be'] },
      { value: 'fastify', label: 'Fastify', roles: ['dev-be'] },
      { value: 'fastapi', label: 'FastAPI (Python)', roles: ['dev-be'] },
      { value: 'django', label: 'Django (Python)', roles: ['dev-be'] },
      { value: 'gin', label: 'Gin (Go)', roles: ['dev-be'] }
    ]
  },
  metaFramework: {
    label: 'Meta Framework',
    type: 'select',
    options: [
      { value: 'nextjs', label: 'Next.js', roles: ['dev-fe'] },
      { value: 'nuxt', label: 'Nuxt', roles: ['dev-fe'] },
      { value: 'remix', label: 'Remix', roles: ['dev-fe'] },
      { value: 'astro', label: 'Astro', roles: ['dev-fe'] }
    ]
  },
  styling: {
    label: 'Styling',
    type: 'select',
    options: [
      { value: 'tailwind', label: 'TailwindCSS' },
      { value: 'css-modules', label: 'CSS Modules' },
      { value: 'styled-components', label: 'Styled Components' },
      { value: 'scss', label: 'SCSS/Sass' }
    ]
  },
  state: {
    label: 'State Management',
    type: 'select',
    options: [
      { value: 'zustand', label: 'Zustand', roles: ['dev-fe'] },
      { value: 'redux', label: 'Redux Toolkit', roles: ['dev-fe'] },
      { value: 'recoil', label: 'Recoil', roles: ['dev-fe'] },
      { value: 'jotai', label: 'Jotai', roles: ['dev-fe'] },
      { value: 'mobx', label: 'MobX', roles: ['dev-fe'] },
      { value: 'pinia', label: 'Pinia (Vue)', roles: ['dev-fe'] }
    ]
  },
  data: {
    label: 'Data Fetching',
    type: 'select',
    options: [
      { value: 'tanstack-query', label: 'TanStack Query' },
      { value: 'swr', label: 'SWR' },
      { value: 'apollo', label: 'Apollo GraphQL' },
      { value: 'urql', label: 'urql' }
    ]
  },
  testing: {
    label: 'Testing',
    type: 'checkbox',
    options: [
      { value: 'vitest', label: 'Vitest' },
      { value: 'jest', label: 'Jest' },
      { value: 'cypress', label: 'Cypress' },
      { value: 'playwright', label: 'Playwright' },
      { value: 'testing-library', label: 'Testing Library' }
    ]
  },
  form: {
    label: 'Form Handling',
    type: 'select',
    options: [
      { value: 'react-hook-form', label: 'React Hook Form' },
      { value: 'formik', label: 'Formik' },
      { value: 'zod', label: 'Zod (validation)' }
    ]
  },
  uiLib: {
    label: 'UI Library',
    type: 'select',
    options: [
      { value: 'shadcn', label: 'shadcn/ui' },
      { value: 'mui', label: 'Material UI' },
      { value: 'ant-design', label: 'Ant Design' },
      { value: 'chakra', label: 'Chakra UI' }
    ]
  },
  i18n: {
    label: 'Internationalization',
    type: 'select',
    options: [
      { value: 'react-i18next', label: 'react-i18next' },
      { value: 'formatjs', label: 'FormatJS' },
      { value: 'next-intl', label: 'next-intl' }
    ]
  },
  database: {
    label: 'Database',
    type: 'checkbox',
    options: [
      { value: 'postgresql', label: 'PostgreSQL', roles: ['dev-be'] },
      { value: 'mysql', label: 'MySQL', roles: ['dev-be'] },
      { value: 'mongodb', label: 'MongoDB', roles: ['dev-be'] },
      { value: 'redis', label: 'Redis', roles: ['dev-be'] },
      { value: 'sqlite', label: 'SQLite', roles: ['dev-be'] }
    ]
  },
  orm: {
    label: 'ORM',
    type: 'select',
    options: [
      { value: 'prisma', label: 'Prisma', roles: ['dev-be'] },
      { value: 'typeorm', label: 'TypeORM', roles: ['dev-be'] },
      { value: 'sequelize', label: 'Sequelize', roles: ['dev-be'] },
      { value: 'mikro-orm', label: 'MikroORM', roles: ['dev-be'] },
      { value: 'mongoose', label: 'Mongoose', roles: ['dev-be'] }
    ]
  },
  infra: {
    label: 'Infrastructure',
    type: 'checkbox',
    options: [
      { value: 'docker', label: 'Docker', roles: ['dev-be', 'devops'] },
      { value: 'kubernetes', label: 'Kubernetes', roles: ['devops'] },
      { value: 'terraform', label: 'Terraform', roles: ['devops'] },
      { value: 'ansible', label: 'Ansible', roles: ['devops'] }
    ]
  },
  cicd: {
    label: 'CI/CD',
    type: 'select',
    options: [
      { value: 'github-actions', label: 'GitHub Actions', roles: ['devops'] },
      { value: 'gitlab-ci', label: 'GitLab CI', roles: ['devops'] },
      { value: 'jenkins', label: 'Jenkins', roles: ['devops'] }
    ]
  },
  monitoring: {
    label: 'Monitoring',
    type: 'checkbox',
    options: [
      { value: 'prometheus', label: 'Prometheus', roles: ['devops'] },
      { value: 'grafana', label: 'Grafana', roles: ['devops'] },
      { value: 'datadog', label: 'Datadog', roles: ['devops'] },
      { value: 'sentry', label: 'Sentry', roles: ['dev-be', 'dev-fe'] }
    ]
  }
};

/**
 * Resolve skills for a given role and variants (legacy sync)
 * @param {string} role - The base role (dev-fe, dev-be, etc.)
 * @param {Object} variants - Selected variants { category: value }
 * @returns {Object} - { core, role, variants } skills arrays
 */
export function resolveSkills(role, variants = {}) {
  const result = {
    core: [...CORE_SKILLS],
    role: [],
    variants: []
  };

  // Add role-specific skills (now includes inheritance for tech-lead)
  if (ROLE_SKILL_MAP[role]) {
    result.role = [...ROLE_SKILL_MAP[role]];
  }

  // Add variant-specific skills
  for (const [category, value] of Object.entries(variants)) {
    if (value) {
      const key = `${category}:${value}`;
      if (VARIANT_SKILL_MAP[key]) {
        for (const skill of VARIANT_SKILL_MAP[key]) {
          if (!result.variants.includes(skill) && !result.role.includes(skill)) {
            result.variants.push(skill);
          }
        }
      }
    }
  }

  return result;
}

/**
 * Get all unique skills for an agent (legacy sync)
 */
export function getAllSkills(role, variants = {}) {
  const { core, role: roleSkills, variants: variantSkills } = resolveSkills(role, variants);
  return [...new Set([...core, ...roleSkills, ...variantSkills])];
}

/**
 * Get variants applicable for a role
 */
export function getVariantsForRole(role) {
  const filtered = {};

  for (const [category, config] of Object.entries(VARIANT_CATEGORIES)) {
    const filteredOptions = config.options.filter(opt => {
      if (!opt.roles) return true;
      return opt.roles.includes(role);
    });

    if (filteredOptions.length > 0) {
      filtered[category] = {
        ...config,
        options: filteredOptions
      };
    }
  }

  return filtered;
}

// Export scanner functions for advanced usage
export { getSkills, clearSkillsCache };
