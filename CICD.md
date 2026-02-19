# 🚀 CI/CD Pipeline Documentation

## Overview

This project includes comprehensive CI/CD pipelines using GitHub Actions for automated testing, building, and deployment.

## 📋 Available Workflows

### 1. **CI - Continuous Integration** (`.github/workflows/ci.yml`)

Runs on every push and pull request to main/develop branches.

**Jobs:**
- ✅ **Lint & Format Check** - ESLint and Prettier validation
- ✅ **Build Application** - Next.js production build test
- ✅ **Run Tests** - Unit and integration tests with PostgreSQL & Redis
- ✅ **Security Audit** - npm audit for vulnerabilities
- ✅ **Docker Build Test** - Validates Dockerfile builds successfully

**Triggers:**
- Push to `main`, `develop`, `dockerfile` branches
- Pull requests to `main`, `develop`

---

### 2. **CD - Continuous Deployment** (`.github/workflows/cd.yml`)

Automated deployment to multiple cloud platforms.

**Deployment Targets:**
- 🟢 **Vercel** - Recommended for Next.js (primary)
- 🟠 **AWS ECS** - Container orchestration on AWS
- 🔵 **Azure Container Apps** - Microsoft Azure deployment
- 💙 **DigitalOcean** - App Platform deployment (staging)
- 🐳 **Docker Compose** - VPS/EC2 deployment

**Features:**
- Environment-specific deployments (staging/production)
- Database migrations after deployment
- Slack notifications on success/failure
- Manual trigger via GitHub Actions UI

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

---

### 3. **Docker Build & Publish** (`.github/workflows/docker.yml`)

Builds and publishes Docker images to container registries.

**Features:**
- Multi-platform builds (amd64, arm64)
- Pushes to GitHub Container Registry (ghcr.io)
- Pushes to Docker Hub (optional)
- Security scanning with Trivy
- Automated image testing
- Tag-based versioning

**Image Locations:**
- `ghcr.io/[your-org]/climatrix:latest`
- `docker.io/[your-username]/climatrix:latest`

**Triggers:**
- Push to `main`, `develop`, `dockerfile` branches
- Git tags starting with `v*` (e.g., v1.0.0)
- Pull requests (build only, no push)

---

### 4. **PR Checks** (`.github/workflows/pr-checks.yml`)

Quality checks for pull requests.

**Checks:**
- PR title semantic validation
- Merge conflict detection
- Build size monitoring
- Automated PR comments

---

### 5. **Dependency Update** (`.github/workflows/dependency-update.yml`)

Automated weekly dependency updates.

**Features:**
- Updates npm packages
- Updates Prisma
- Runs tests to verify updates
- Creates PR automatically

**Schedule:** Every Monday at 9 AM UTC

---

## 🔧 Setup Instructions

### 1. Required Secrets

Add these secrets in GitHub: Settings → Secrets and variables → Actions

#### For Vercel Deployment:
```
VERCEL_TOKEN=your_vercel_token
```

#### For AWS Deployment:
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
ECS_CLUSTER=climatrix-cluster
ECS_SERVICE=climatrix-service
```

#### For Azure Deployment:
```
AZURE_CREDENTIALS={"clientId":"xxx","clientSecret":"xxx","subscriptionId":"xxx","tenantId":"xxx"}
ACR_LOGIN_SERVER=yourregistry.azurecr.io
ACR_USERNAME=your_acr_username
ACR_PASSWORD=your_acr_password
AZURE_CONTAINER_APP_NAME=climatrix-app
AZURE_RESOURCE_GROUP=climatrix-rg
```

#### For DigitalOcean:
```
DIGITALOCEAN_ACCESS_TOKEN=your_do_token
DO_APP_ID=your_app_id
```

#### For VPS/Docker Compose:
```
SERVER_HOST=your.server.ip
SERVER_USERNAME=deploy
SERVER_SSH_KEY=your_ssh_private_key
```

#### For Docker Hub:
```
DOCKERHUB_USERNAME=your_username
DOCKERHUB_TOKEN=your_access_token
```

#### For Database:
```
DATABASE_URL=postgresql://user:pass@host:5432/db
```

#### For Notifications (Optional):
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
```

---

### 2. Configure GitHub Container Registry

Enable GitHub Container Registry for your repository:

1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Save changes

---

### 3. Environment Configuration

Create GitHub Environments for different deployment stages:

1. Go to Settings → Environments
2. Create environments:
   - `production`
   - `staging`
   - `aws-production`
   - `azure-production`
   - `digitalocean-staging`

3. Add environment-specific secrets and protection rules

---

## 🎯 Usage

### Running CI Pipeline

CI runs automatically on every push/PR. To trigger manually:

```bash
git push origin your-branch
```

### Deploying to Production

**Option 1: Automatic (recommended)**
```bash
git checkout main
git merge develop
git push origin main
# Deployment starts automatically
```

**Option 2: Manual trigger**
1. Go to Actions tab in GitHub
2. Select "CD - Continuous Deployment"
3. Click "Run workflow"
4. Select environment (staging/production)
5. Click "Run workflow"

### Building Docker Image

**Automatic:**
```bash
git tag v1.0.0
git push origin v1.0.0
# Multi-platform Docker build starts
```

**Manual:**
```bash
# Trigger Docker workflow from GitHub Actions UI
```

---

## 📊 Pipeline Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Push/PR                        │
└────────────────────────────┬────────────────────────────────┘
                             │
                ┌────────────▼────────────┐
                │   CI Pipeline Trigger    │
                └────────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
    ┌───▼───┐          ┌────▼────┐         ┌────▼────┐
    │ Lint  │          │  Build  │         │  Test   │
    └───┬───┘          └────┬────┘         └────┬────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Docker Build   │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │ CI Success ✅   │
                    └───────┬────────┘
                            │
            (if main branch)│
                            │
                    ┌───────▼────────┐
                    │  CD Pipeline    │
                    └───────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼────┐        ┌────▼─────┐       ┌────▼─────┐
    │ Vercel │        │   AWS    │       │  Azure   │
    └───┬────┘        └────┬─────┘       └────┬─────┘
        │                  │                   │
        └──────────────────┼───────────────────┘
                           │
                   ┌───────▼────────┐
                   │   Migrations    │
                   └───────┬────────┘
                           │
                   ┌───────▼────────┐
                   │  Notification   │
                   └────────────────┘
```

---

## 🛠️ Customization

### Modify Build Process

Edit [.github/workflows/ci.yml](.github/workflows/ci.yml):

```yaml
- name: Build Next.js application
  run: |
    cd frontend
    npm run build
    # Add custom build steps here
```

### Add New Deployment Target

Edit [.github/workflows/cd.yml](.github/workflows/cd.yml) and add a new job:

```yaml
deploy-my-platform:
  name: Deploy to My Platform
  runs-on: ubuntu-latest
  steps:
    - name: Deploy
      run: |
        # Your deployment commands
```

### Change Docker Registry

Edit [.github/workflows/docker.yml](.github/workflows/docker.yml):

```yaml
- name: Log in to your registry
  uses: docker/login-action@v3
  with:
    registry: your-registry.com
    username: ${{ secrets.REGISTRY_USERNAME }}
    password: ${{ secrets.REGISTRY_PASSWORD }}
```

---

## 📈 Monitoring & Debugging

### View Pipeline Status

- Go to repository → Actions tab
- Click on any workflow run
- View detailed logs for each job

### Common Issues

**1. Build fails with missing dependencies**
```bash
# Clear cache and rebuild
# In Actions → Caches → Delete all caches
```

**2. Docker build timeout**
```yaml
# Increase timeout in workflow
timeout-minutes: 30
```

**3. Database connection fails**
```bash
# Check DATABASE_URL secret is correctly set
# Ensure database allows connections from GitHub Actions IPs
```

### Debug Mode

Enable debug logging:

1. Settings → Secrets and variables → Actions
2. Add repository variable:
   - Name: `ACTIONS_STEP_DEBUG`
   - Value: `true`

---

## 🔒 Security Best Practices

1. ✅ **Never commit secrets** - Use GitHub Secrets
2. ✅ **Use environment protection rules** - Require approval for production
3. ✅ **Enable dependency scanning** - Dependabot alerts
4. ✅ **Regular security audits** - Automated with npm audit
5. ✅ **Image scanning** - Trivy scans Docker images
6. ✅ **Least privilege** - Minimal IAM permissions

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Vercel Deployment](https://vercel.com/docs/cli)
- [AWS ECS Deployment](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/)

---

## 🤝 Contributing

When contributing, ensure:
- All CI checks pass
- PR title follows semantic conventions
- Tests are added for new features
- Documentation is updated

---

## 📝 Pipeline Metrics

Track these metrics for pipeline health:
- ⏱️ Build time: Target < 5 minutes
- ✅ Success rate: Target > 95%
- 🐛 Failed builds: Investigate if > 5%
- 📦 Docker image size: Monitor growth

---

## 🔄 Version History

- **v1.0** - Initial CI/CD setup with GitHub Actions
- Multi-platform Docker builds
- AWS, Azure, Vercel deployments
- Automated dependency updates

---

For questions or issues with CI/CD, create an issue with the `ci/cd` label.
