---
name: infrastructure-as-code
description: |
  Infrastructure as Code patterns using Terraform, Pulumi, CloudFormation.
  Use when: provisioning cloud resources, managing infrastructure, creating
  repeatable deployments, or when user mentions "Terraform", "IaC", "Pulumi",
  "CloudFormation", "infrastructure", "provisioning".
version: 1.0.0
category: devops
tags:
  - terraform
  - iac
  - infrastructure
  - cloud
depends_on: []
recommends:
  - ci-cd
  - deployment
used_by:
  - deployment
---

# Skill: Infrastructure as Code

## Core Principle
**Infrastructure is code.** Version control, review, test, and automate everything.

## Hard Rules

1. **NEVER commit state files** - Use remote state
2. **NEVER hardcode secrets** - Use variables + secret managers
3. **ALWAYS use modules** - DRY principle
4. **ALWAYS tag resources** - Cost tracking, ownership
5. **ALWAYS plan before apply** - Review changes first

## Terraform Project Structure

```
terraform/
├── modules/
│   ├── vpc/
│   ├── ecs/
│   └── rds/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   └── prod/
├── .terraform-version
└── backend.hcl
```

## Module Template

```hcl
# modules/ecs/main.tf
variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cpu" {
  description = "CPU units"
  type        = number
  default     = 256
}

variable "memory" {
  description = "Memory in MB"
  type        = number
  default     = 512
}

resource "aws_ecs_service" "main" {
  name            = "${var.environment}-app"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.main.arn

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

output "service_arn" {
  value = aws_ecs_service.main.arn
}
```

## Remote State Configuration

```hcl
# backend.hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "env/dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Local state files | Remote state (S3 + DynamoDB) |
| Hardcoded values | Variables + tfvars |
| No tagging | Add required tags |
| Monolithic configs | Use modules |
| Manual changes | Always use Terraform |
| No state locking | Enable DynamoDB locks |

## Best Practices

### Naming Convention
```hcl
# {environment}-{service}-{resource}
resource "aws_instance" "web" {
  # dev-webserver-ec2
  tags = {
    Name = "${var.environment}-webserver-ec2"
  }
}
```

### Required Tags
```hcl
variable "common_tags" {
  type = map(string)
  default = {
    Project     = "myapp"
    ManagedBy   = "terraform"
    CostCenter  = "engineering"
  }
}
```

## Workflow

```bash
# 1. Initialize
terraform init

# 2. Plan (always review)
terraform plan -out=tfplan

# 3. Apply (after review)
terraform apply tfplan

# 4. Destroy (when needed)
terraform destroy -target=aws_instance.web
```

## CI/CD Integration

```yaml
# .github/workflows/terraform.yml
- name: Terraform Plan
  run: terraform plan -no-color -out=tfplan

- name: Terraform Apply
  if: github.ref == 'refs/heads/main'
  run: terraform apply -auto-approve tfplan
```

## Quick Checklist

- [ ] Remote state configured
- [ ] State locking enabled
- [ ] Secrets in variables
- [ ] Resources tagged
- [ ] Modules used
- [ ] Plan before apply
- [ ] .tfvars in .gitignore
