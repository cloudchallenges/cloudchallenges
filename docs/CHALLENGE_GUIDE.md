# CloudChallenges — Challenge Writing Guide

This guide explains exactly how to write a challenge using the `content/challenges` collection. It defines which sections to include, what each section means, and what heading levels (`h2`, `h3`, `h4`) you should use.

## Purpose of This Guide

Use this document whenever creating a new challenge. It ensures all challenges follow a consistent structure, remain easy to read, and provide a complete problem-definition experience.

## Overall Structure

A challenge consists of two parts:

1. **Frontmatter** (metadata used by the website)
2. **Body content** (the challenge itself)

The *body content* should always follow the structure below.

## Frontmatter

Place this at the top of the MDX file. All fields are typed by the Astro schema.

```yaml
---
title: "Challenge Title"
uid: "example"
providers: ["aws"]
services: ["ec2", "s3"]
tags: ["serverless", "event-driven"]
level: "intermediate"
duration_hours: 2
starter_repo: "https://github.com/..."
summary: "A short 1–2 line description."
created_at: "2025-01-01"
cover: ./diagram.png
coverAlt: "An architecture diagram"
---
```

## Body Content Structure

Below is the exact outline you should follow. Every heading level is defined explicitly.

### (h1) — Challenge Title

Repeat the title of the challenge.

Example:

```md
## Static Website on a Compute Instance
```

### (h2) — Real-World Context

Explain *why this challenge exists*. Keep it short.

Use this section to ground the learner in an actual business or engineering scenario.

### (h2) — High-Level Overview

Describe what the learner will build at a conceptual level.
Keep this to 2–4 sentences.

### (h2) — Architecture Diagram (Optional)

You may include:

* A PNG/JPG diagram
* An ASCII diagram

Example:

```md
![Architecture Diagram](./diagram.png)
```

### (h2) — Problem Statement

This is the most important section.

Use **strict requirement language**:

* **MUST** – required
* **SHOULD** – recommended
* **MUST NOT** – forbidden

#### (h3) — Mandatory Requirements

List all hard requirements.

#### (h3) — Recommended Requirements

Useful additions, not required.

#### (h3) — Out-of-Scope / Forbidden

Clearly state what cannot be used.

### (h2) — Inputs Provided

Define exactly what the learner receives.

Use bullet points and include links to starter repositories if present.

### (h2) — Expected Outputs

Describe the shape of a correct result.

This is NOT where you provide the solution—just define validation criteria.

Use bullet points.

### (h2) — Test Scenarios

Give learners test cases to confirm correctness.

Use numbered lists.

#### (h3) — Success Tests

Happy path checks.

#### (h3) — Failure Tests (Optional)

Bad path scenarios they should verify.

### (h2) — Optional Enhancements

List optional tasks for advanced learners.
Use bullets.

### (h2) — Deliverables

State what the learner must provide.
This makes challenges evaluable.

You may include:

* repo structure
* diagrams
* terraform code
* documentation requirements

### (h2) — Grading Rubric (Optional)

Also hidden via comment (same pattern as above).

Useful for programs or workshops.

## Heading Summary

Use this table to ensure correct heading levels:

| Section                             | Heading Level |
| ----------------------------------- | ------------- |
| Title                               | h1 (`#`)      |
| Real-World Context                  | h2 (`##`)     |
| High-Level Overview                 | h2 (`##`)     |
| Architecture Diagram                | h2 (`##`)     |
| Problem Statement                   | h2 (`##`)     |
| Mandatory / Recommended / Forbidden | h3 (`###`)    |
| Inputs Provided                     | h2 (`##`)     |
| Expected Outputs                    | h2 (`##`)     |
| Test Scenarios                      | h2 (`##`)     |
| Success / Failure tests             | h3 (`###`)    |
| Optional Enhancements               | h2 (`##`)     |
| Deliverables                        | h2 (`##`)     |
| Instructor Notes                    | h2 (`##`)     |
| Grading Rubric                      | h2 (`##`)     |

## Style Guidelines

To ensure consistency:

### (h2) — Writing Style

* Keep sentences clear and short.
* Avoid teaching; describe the problem, not the solution.
* Use bullet points liberally.
* Make requirements unambiguous.

### (h2) — What Not To Do

* Do not include solution steps.
* Do not include code hints.
* Do not use vague requirements.

## End of Guide

Follow this structure for every new challenge to keep CloudChallenges consistent, scalable, and easy to understand.
