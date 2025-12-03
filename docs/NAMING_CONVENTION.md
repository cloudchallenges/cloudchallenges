# CloudChallenges - Repository Naming Standard

This document defines the official naming convention for all repositories inside the **CloudChallenges** GitHub organization. The goal is to keep names:

- short and readable
- consistent across hundreds of challenges
- provider-agnostic for starter repos
- discoverable and search-friendly
- flexible enough to handle multi-repo and multi-cloud solutions
- stable and scalable long-term

This standard applies to:

- **Starter repositories**
- **Solution repositories**
- **Multi-repo solution sets**
- **Component-specific repos** (frontend, backend, infra, etc.)

## 1. Design Principles

Our naming model follows a simple philosophy:

### **Names should stay beautiful.

Metadata should handle the complexity.**

That means:

- No category, difficulty, or provider inside the core slug.
- Providers only appear in **solution** repos (because solutions are concrete).
- All detailed information belongs in metadata (`manifest.yml`, GitHub topics, README).
- Repo names should be guessable by humans and discoverable via GitHub search.

## 2. Core Naming Pattern

Every repository name follows this general structure:

```sh
<topic-slug>[-<part>][-<role>][-<variant>]
```

### Tokens

- **topic-slug** — the short name of the challenge

  * examples: `three-tier`, `3d-replication`, `static-hosting`, `todo-api`

- **part** *(optional)* — when a repo represents only one component

  * examples: `frontend`, `backend`, `auth`, `db`, `infra`

- **role** *(optional)* — defines the function of the repo

  * `starter` — starting code or initial scaffold
  * `solution` — completed solution
  * `demo` — simple demonstrations or playgrounds

- **variant** *(optional)* — used only where needed

  * provider-specific: `aws`, `azure`, `gcp`
  * topology: `multi`, `hybrid`
  * fallback numbering: `01`, `02` (used only when required)

## 3. Examples

### A. Starter Repositories (provider-agnostic)

```sh
three-tier-starter
three-tier-frontend-starter
three-tier-backend-starter
three-tier-db-starter
3d-replication-starter
static-hosting-starter
```

### B. Single-Cloud Solutions

```sh
three-tier-solution-aws
three-tier-backend-solution-azure
static-hosting-solution-gcp
3d-replication-infra-solution-aws
```

### C. Multi-Cloud / Hybrid Solutions

```sh
three-tier-solution-multi
three-tier-backend-solution-hybrid
3d-replication-solution-multi
```

### D. Multi-Repo Microservice Solutions

```sh
three-tier-auth-solution-aws
three-tier-order-solution-aws
three-tier-notifications-solution-gcp
three-tier-integration-solution-multi
```

### E. Fallback Suffixes

Only used if multiple solutions of the *same* type exist:

```sh
three-tier-solution-aws-01
three-tier-solution-aws-02
```

## 4. Metadata & Discoverability

Repo names remain clean because all complexity moves into **metadata**.

Every repo must include:

### 4.1 GitHub Topics

Examples:

```sh
topic:three-tier
type:starter
provider:aws        # only for solutions
topology:multi      # optional
difficulty:intermediate
```

### 4.2 README Frontmatter (first lines)

Every README must start with:

```sh
Challenge: three-tier
Role: starter | solution | demo
Providers: aws | azure | gcp | multi
```

### 4.3 Manifest (per challenge)

A challenge manifest maps *all starters and solutions* for a given topic.

Example (`manifest.yml`):

```shyaml
slug: three-tier
title: "Three-tier Web Application"
description: "Frontend, backend, and database architecture with optional multi-cloud deployments."

starters:
  - name: three-tier-starter
    repo: https://github.com/CloudChallenges/three-tier-starter

solutions:
  - name: three-tier-solution-aws
    repo: https://github.com/CloudChallenges/three-tier-solution-aws
    providers: [aws]

  - name: three-tier-solution-multi
    repo: https://github.com/CloudChallenges/three-tier-solution-multi
    providers: [aws, azure]
```

The manifest ensures clarity even when the repo names are beautifully minimal.

## 5. Rules for Maintaining Consistency

1. Always keep the topic slug short and clear.
   - `three-tier`, not `three-tier-application-challenge`
2. Starter repos must not include cloud provider names.
   They should remain neutral templates.
3. Solution repos may include provider names only when the implementation depends on them.
4. Avoid numbering unless absolutely necessary.
   Use meaningful tokens (`multi`, `hybrid`, `aws`) first.
5. Keep total segments ≤ 4.
   Example of acceptable max length:
   ```sh
   three-tier-backend-solution-multi
   ```
6. All repos must declare their role and topic in README.
7. All challenges must appear in a central manifest file for global indexing.

## 6. Avoiding Collisions

If two repos naturally want the same name:
- First repo uses:
  ```sh
  <topic-slug>-solution-aws
  ```
- Second variant uses:
  ```sh
  <topic-slug>-solution-aws-01
  ```

Keep numbering minimal and rare.

## 7. What NOT to Put in Repo Names

To preserve aesthetics and long-term stability, avoid:

- difficulty (`easy`, `hard`, `expert`)
- categories (`networking`, `devops`, `compute`)
- numeric IDs (`001`, `047`) as mandatory patterns
- cloud services (`ec2`, `rds`, `cloudfront`) in the topic
- problem versioning
- provider names in starter repos

All of that belongs in metadata or manifests.

## 8. Summary

### **Good**

```sh
three-tier-starter
three-tier-solution-aws
three-tier-backend-solution-multi
static-hosting-starter
```

### **Bad**

```sh
challenge-three-tier-aws-v2
three-tier-medium-ec2
static-hosting-001
```

### **Why the chosen system works**

- Clean for humans
- Predictable for machines
- Stable long-term
- Supports multi-cloud & multi-repo solutions
- No ugly numeric IDs
- No unnecessary prefixes (org name already solves that)
- Avoids renaming chaos as the library grows
