# CheasyInvest: Official Project Repository & Contribution Guide

Welcome to the official home of the CheasyInvest project! This document is your central hub for understanding our vision, exploring our technical architecture, and learning how to contribute. We've designed this guide to be accessible for everyone, from potential investors to seasoned developers.

## Purpose of the `infra/` Workspace
This directory will evolve into the single source of truth for platform infrastructure and automation. It is intentionally lightweight today so future pull requests can iteratively add Terraform modules, Helm charts, and GitHub Actions.

---

## What Lives Here
- **Terraform Modules:** Define AWS resources (EKS, RDS, ElastiCache, S3) and supporting networking.
- **Helm Charts:** Package Kubernetes deployments for the web, admin, and API services.
- **CI/CD Pipelines:** GitHub Actions workflows that run lint/test/build, security scans, and deployment steps.

---

## Step-by-Step Setup for Infrastructure Contributors
1. **Review Architecture Decisions:** Consult ADRs in `docs/adr/` to understand our cloud strategy before making changes.
2. **Prepare Credentials:** Ensure you have access to the target cloud account and required IAM roles (request from the platform team if not).
3. **Bootstrap Terraform:**
   ```bash
   cd infra/terraform
   terraform init
   terraform plan
   ```
   (Modules will be added in upcoming sprints.)
4. **Work on Helm Charts:** Draft charts under `infra/helm/` and test locally using `kind` or `minikube` once available.
5. **Update Automation:** When proposing new CI workflows, add YAML files under `infra/.github/workflows/` and document triggers plus secrets.

---

## Collaboration Tips
- Keep infrastructure changes behind feature flags or staged environments when possible.
- Run `terraform fmt` and linting before submitting PRs.
- Provide architecture diagrams or links to ADRs in your pull request summary for clarity.

