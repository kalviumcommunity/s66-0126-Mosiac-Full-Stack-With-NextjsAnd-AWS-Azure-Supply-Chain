# GitHub Secrets Required for CI/CD

Copy and configure these secrets in your GitHub repository:
Settings → Secrets and variables → Actions → New repository secret

## Required Secrets (Choose based on your deployment platform)

### 🔹 Vercel (Recommended for Next.js)
```
VERCEL_TOKEN=<your_vercel_token>
```
Get token from: https://vercel.com/account/tokens

---

### 🔹 AWS Deployment
```
AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
AWS_REGION=us-east-1
ECS_CLUSTER=climatrix-cluster
ECS_SERVICE=climatrix-service
```

To create AWS credentials:
1. Go to AWS Console → IAM → Users
2. Create user with ECS/ECR permissions
3. Create access key

---

### 🔹 Azure Deployment
```
AZURE_CREDENTIALS={"clientId":"xxx","clientSecret":"xxx","subscriptionId":"xxx","tenantId":"xxx"}
ACR_LOGIN_SERVER=yourregistry.azurecr.io
ACR_USERNAME=<username>
ACR_PASSWORD=<password>
AZURE_CONTAINER_APP_NAME=climatrix-app
AZURE_RESOURCE_GROUP=climatrix-rg
```

To create Azure credentials:
```bash
az ad sp create-for-rbac --name "GitHub-Actions" --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
  --sdk-auth
```

---

### 🔹 Docker Hub
```
DOCKERHUB_USERNAME=<your_dockerhub_username>
DOCKERHUB_TOKEN=<your_access_token>
```

Get token from: https://hub.docker.com/settings/security

---

### 🔹 DigitalOcean
```
DIGITALOCEAN_ACCESS_TOKEN=<your_do_token>
DO_APP_ID=<your_app_id>
```

Get token from: https://cloud.digitalocean.com/account/api/tokens

---

### 🔹 VPS/Docker Compose Deployment
```
SERVER_HOST=<your_server_ip_or_domain>
SERVER_USERNAME=deploy
SERVER_SSH_KEY=<your_ssh_private_key>
```

Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "github-actions"
# Copy private key to SERVER_SSH_KEY secret
# Add public key to server: ~/.ssh/authorized_keys
```

---

### 🔹 Database (Production)
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

---

### 🔹 Notifications (Optional)
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

Create webhook: https://api.slack.com/messaging/webhooks

---

## Environment Variables (Non-Secret)

Add these as repository variables:
Settings → Secrets and variables → Actions → Variables tab

```
NODE_VERSION=20.x
DOCKER_IMAGE=climatrix-app
```

---

## How to Add Secrets

### Via GitHub UI:
1. Go to your repository
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Enter name and value
5. Click "Add secret"

### Via GitHub CLI:
```bash
gh secret set SECRET_NAME
# Paste value when prompted

# Or from file
gh secret set SSH_KEY < ~/.ssh/id_ed25519

# Or inline
echo "secret_value" | gh secret set SECRET_NAME
```

---

## Testing Secrets

After adding secrets, trigger a workflow to test:

```bash
# Manual trigger
gh workflow run ci.yml

# Or push to trigger
git commit --allow-empty -m "Test CI/CD"
git push
```

Check workflow logs to verify secrets are working.

---

## Security Notes

- ✅ Never commit secrets to code
- ✅ Rotate secrets regularly
- ✅ Use least privilege for cloud credentials
- ✅ Enable secret scanning in repository settings
- ✅ Use environment protection rules for production
- ✅ Audit secret usage in Actions logs

---

## Minimal Setup (Just to get started)

If you just want CI to work without deployment:

```
# No secrets needed!
# CI will run with test databases
```

To enable Docker builds:

```
# GitHub Container Registry (automatic with GITHUB_TOKEN)
# No additional secrets needed
```

---

## Quick Start Commands

```bash
# Set all secrets at once (edit values first!)
gh secret set AWS_ACCESS_KEY_ID -b"your_key"
gh secret set AWS_SECRET_ACCESS_KEY -b"your_secret"
gh secret set VERCEL_TOKEN -b"your_token"

# List current secrets
gh secret list

# Delete a secret
gh secret delete SECRET_NAME
```
