# GitHub Push Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push the project `D:\AirImprovement` to GitHub repository: `https://github.com/DivyViradiya/Air-Matters.git`.

**Architecture:** Initialize a git repository at the root of the project, set up a comprehensive `.gitignore` to prevent committing secrets and unnecessary files, and push to the remote repository.

**Tech Stack:** Git, PowerShell.

---

### Task 1: Git Initialization and Remote Configuration

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create a comprehensive .gitignore**

```gitignore
# Dependencies
node_modules/
airmatters/node_modules/

# Build outputs
dist/
airmatters/dist/
build/
.next/
out/

# Environment variables (Secrets)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
airmatters/.env
airmatters/.env.local
airmatters/.env.development.local
airmatters/.env.test.local
airmatters/.env.production.local

# Local session/state data
.gemini/
.superpowers/
.local/
airmatters/.local/
.cache/
.npm/

# Logs
*.log
airmatters/*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
server_output.log

# IDEs and OS files
.vscode/
.idea/
.DS_Store
Thumbs.db
*.swp
*.bak

# Testing
coverage/
.nyc_output/

# Misc
.vercel
.turbo
```

Run: `powershell.exe -NoProfile -Command "New-Item -Path .gitignore -ItemType File -Value '# Dependencies\r\nnode_modules/\r\nairmatters/node_modules/\r\n\r\n# Build outputs\r\ndist/\r\nairmatters/dist/\r\nbuild/\r\n.next/\r\nout/\r\n\r\n# Environment variables (Secrets)\r\n.env\r\n.env.local\r\n.env.development.local\r\n.env.test.local\r\n.env.production.local\r\nairmatters/.env\r\nairmatters/.env.local\r\nairmatters/.env.development.local\r\nairmatters/.env.test.local\r\nairmatters/.env.production.local\r\n\r\n# Local session/state data\r\n.gemini/\r\n.superpowers/\r\n.local/\r\nairmatters/.local/\r\n.cache/\r\n.npm/\r\n\r\n# Logs\r\n*.log\r\nairmatters/*.log\r\nnpm-debug.log*\r\nyarn-debug.log*\r\nyarn-error.log*\r\nserver_output.log\r\n\r\n# IDEs and OS files\r\n.vscode/\r\n.idea/\r\n.DS_Store\r\nThumbs.db\r\n*.swp\r\n*.bak\r\n\r\n# Testing\r\ncoverage/\r\n.nyc_output/\r\n\r\n# Misc\r\n.vercel\r\n.turbo'" `

- [ ] **Step 2: Initialize Git repository**

Run: `git init`
Expected: "Initialized empty Git repository"

- [ ] **Step 3: Add remote origin**

Run: `git remote add origin https://github.com/DivyViradiya/Air-Matters.git`

### Task 3: Vercel Deployment Setup (Target: airmatters.vercel.app)

**Files:**
- Create: `airmatters/vercel.json`
- Create: `airmatters/api/index.ts` (Serverless Function)

- [ ] **Step 1: Create vercel.json in airmatters directory**

```json
{
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.ts"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- [ ] **Step 2: Create Vercel entry point (airmatters/api/index.ts)**

```typescript
import { app } from "../server/app.js";
import { registerRoutes } from "../server/routes.js";

// Initialize routes (Auth and API)
// We don't need the return httpServer on Vercel
registerRoutes(app);

export default app;
```

- [ ] **Step 3: Link project to Vercel and name it 'airmatters'**

Run: `vercel link --repo --scope divya-viradiyas-projects` (in `airmatters` dir)
Follow prompts to link to a new project named `airmatters`.

- [ ] **Step 4: Set DATABASE_URL on Vercel**

Run: `vercel env add DATABASE_URL production --scope divya-viradiyas-projects`
Run: `vercel env add DATABASE_URL preview --scope divya-viradiyas-projects`
(When prompted, enter your Supabase connection string)

- [ ] **Step 5: Deploy to Vercel**

Run: `git add .`
Run: `git commit -m "deploy: vercel configuration for airmatters.vercel.app"`
Run: `git push`
