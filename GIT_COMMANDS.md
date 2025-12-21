# Git and GitHub Commands for Gifty Hub

This document lists the essential Git and GitHub commands used in this project.

## Initial Setup

### 1. Initialize Git Repository
```bash
git init
```

### 2. Configure Git User
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Add Remote Repository
```bash
git remote add origin https://github.com/yourusername/gifty-hub-jsx.git
```

## Daily Workflow Commands

### 4. Check Status
```bash
git status
```

### 5. Stage Files
```bash
# Stage all changes
git add .

# Stage specific file
git add filename.js
```

### 6. Commit Changes
```bash
git commit -m "Your commit message"
```

### 7. Push to GitHub
```bash
# First push
git push -u origin main

# Subsequent pushes
git push
```

### 8. Pull from GitHub
```bash
git pull origin main
```

### 9. View Commit History
```bash
git log --oneline
```

## Branching Commands

### 10. Create and Switch to New Branch
```bash
git checkout -b feature/branch-name
```

### 11. Switch to Existing Branch
```bash
git checkout main
```

### 12. List All Branches
```bash
git branch
```

### 13. Merge Branch
```bash
# Switch to main first
git checkout main

# Merge feature branch
git merge feature/branch-name
```

### 14. Delete Branch
```bash
# Delete local branch
git branch -d feature/branch-name

# Delete remote branch
git push origin --delete feature/branch-name
```

## Complete Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and check status
git status

# 3. Stage all changes
git add .

# 4. Commit changes
git commit -m "Add new feature"

# 5. Push to GitHub
git push -u origin feature/new-feature

# 6. Merge to main (after testing)
git checkout main
git merge feature/new-feature

# 7. Push main to GitHub
git push origin main

# 8. Delete feature branch
git branch -d feature/new-feature
```

## Additional Useful Commands

### Clone Repository
```bash
git clone https://github.com/yourusername/gifty-hub-jsx.git
```

### View Changes Before Committing
```bash
git diff
```

### Undo Unstaged Changes
```bash
git checkout -- filename.js
```

---

**Note:** The `.gitignore` file is already configured to exclude `node_modules/`, `.env`, and other sensitive files.
