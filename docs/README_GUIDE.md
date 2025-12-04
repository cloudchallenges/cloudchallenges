# README Authoring Guide

This guide defines the structure and conventions for writing README files in solution repositories. The README should be concise and direct users to the website for detailed documentation.

## Purpose

The README serves as a quick reference for:
- Understanding what the repository contains
- Deploying and testing the solution
- Navigating to detailed documentation

Keep it **short and actionable**. All detailed explanations belong in the Solution Guide on the website.

## File Structure Overview

```markdown
# [Project] Solution

[One-line description]

[Challenge and Solution Links]

## Architecture
## Quick Start
## Project Structure
## License
## Support
```

## Sections

### Title and Description (Required)

Start with the project name and a one-line description.

```markdown
# BatchFactory Solution

A serverless, event-driven CSV processing pipeline on AWS, deployed with Terraform.
```

### Challenge and Solution Links (Required)

Display links as simple, recognizable text links with emojis. Users should immediately understand these are clickable.

```markdown
📋 [View Challenge](https://website.com/challenges/uid) · 📖 [Read Solution Guide](https://website.com/solutions/uid)
```

Use emojis for visual distinction:
- 📋 for Challenge
- 📖 for Solution Guide

Use `·` (middle dot) to separate the links. Keep it simple - no badges, no buttons.

### Architecture (Required)

Include the architecture diagram. Users respond well to visuals.

```markdown
## Architecture

![Architecture](./assets/architecture.svg)
```

Use SVG format when possible for crisp rendering at any size.

### Quick Start (Required)

Minimal steps to deploy and test. No explanations - just commands.

```markdown
## Quick Start

### Prerequisites

- Tool A installed
- Tool B configured
- Runtime version X

### Deploy

```bash
# 1. Build artifacts
./scripts/build.sh

# 2. Initialize infrastructure
cd terraform/environments/dev
terraform init

# 3. Deploy
terraform apply
```

### Test

```bash
# Run a test
./scripts/test.sh

# Verify output
curl https://<url>/endpoint
```

### Destroy

```bash
terraform destroy
```
```

**Guidelines:**
- Number the steps
- Use comments to explain each command
- Include placeholder values (e.g., `<api-url>`) where needed
- Always include a "Destroy" section for cleanup

### Project Structure (Required)

Brief overview of the repository layout.

```markdown
## Project Structure

```
├── src/                  # Application code
├── terraform/            # Infrastructure as Code
├── samples/              # Test data
└── scripts/              # Build and deployment scripts
```
```

Keep comments to 3-4 words max. Only show top-level directories.

### License (Required)

Reference the license file.

```markdown
## License

See [LICENSE](./LICENSE) for details.
```

### Support (Optional)

Include a sponsorship link if you accept contributions.

```markdown
## Support

If you find this helpful, consider supporting my work ❤️

<a href="https://github.com/sponsors/USERNAME"><img src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github" alt="Sponsor on GitHub"></a>
```

## Formatting Conventions

### Badges

Use badges only for the Support/Sponsor section. Use `style=for-the-badge` for visual appeal:

```
<a href="URL"><img src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github" alt="Sponsor"></a>
```

### Code Blocks

Always specify the language:

````markdown
```bash
command here
```
````

### Links

Use simple markdown links with emojis for visual distinction:

```markdown
📋 [View Challenge](https://...) · 📖 [Read Solution Guide](https://...)
```

## What NOT to Include

The README should NOT contain:
- Status badges at the top
- Badge-style links for Challenge/Solution (use simple text links)
- Detailed component explanations (belongs in Solution Guide)
- Trade-offs and design decisions (belongs in Solution Guide)
- Full testing scenarios (belongs in Solution Guide)
- Architecture diagrams in ASCII (use image file)
- Long paragraphs of text
- Multiple deployment options (pick one, link to docs for alternatives)
- Horizontal rules (`---`) between sections

## Section Order

Maintain this order:

1. Title
2. One-line description
3. Challenge and Solution Links (simple text with emojis)
4. Architecture
5. Quick Start
6. Project Structure
7. License
8. Support (optional)

## Checklist for Authors

Before publishing:

- [ ] Title matches the project name
- [ ] One-line description is clear and concise
- [ ] Challenge and Solution are simple text links with emojis
- [ ] Architecture diagram is included as an image file
- [ ] Quick Start has Prerequisites, Deploy, Test, and Destroy sections
- [ ] All commands are tested and work
- [ ] Project structure shows only top-level directories
- [ ] License section references LICENSE file
- [ ] Support section included with sponsor badge (optional)
- [ ] No horizontal rules between sections
- [ ] No detailed explanations (those belong on the website)
- [ ] Total README is under 80 lines
