# Quick Setup for Mac

## Method 1: Using Git (Recommended)

```bash
# 1. Open Terminal on your Mac

# 2. Navigate to Desktop
cd ~/Desktop

# 3. Clone the repository (if you have the GitHub URL)
git clone https://github.com/jasonmaulding/imagegenerator.git AgentForge
cd AgentForge

# 4. Install backend dependencies
cd backend
npm install

# 5. Set your API key and start server
export FAL_API_KEY="6d27e7b9-4688-437b-a986-22af87a45e18:094ba0bcf81bd2e0c862f16bb9ecb5f6"
node server.js

# 6. In a NEW terminal tab, open the frontend
cd ~/Desktop/AgentForge
open index.html
```

## Method 2: Manual Setup (If Git Clone Fails)

```bash
# 1. Create project folder
cd ~/Desktop
mkdir AgentForge
cd AgentForge

# 2. Create backend folder
mkdir backend

# 3. Download files from your repository branch:
# - index.html
# - README.md
# - .gitignore
# - backend/server.js
# - backend/package.json

# 4. Install dependencies
cd backend
npm install

# 5. Start server
export FAL_API_KEY="6d27e7b9-4688-437b-a986-22af87a45e18:094ba0bcf81bd2e0c862f16bb9ecb5f6"
node server.js
```

## Method 3: One-Command Setup

Copy and paste this entire block into your Mac terminal:

```bash
cd ~/Desktop && \
mkdir -p AgentForge/backend && \
cd AgentForge && \
cat > backend/package.json << 'EOF'
{
  "name": "agentforge-backend",
  "version": "1.0.0",
  "description": "Backend server for AgentForge Elite",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@fal-ai/client": "^1.3.0",
    "cors": "^2.8.5",
    "express": "^4.21.2"
  }
}
EOF
cd backend && \
npm install && \
echo "✅ Backend dependencies installed!" && \
echo "" && \
echo "📥 Now download these files from your repository:" && \
echo "   - backend/server.js" && \
echo "   - index.html" && \
echo "" && \
echo "Then run:" && \
echo "   export FAL_API_KEY=\"6d27e7b9-4688-437b-a986-22af87a45e18:094ba0bcf81bd2e0c862f16bb9ecb5f6\"" && \
echo "   node server.js"
```

## What Should Happen

When the server starts correctly, you'll see:

```
╔════════════════════════════════════════════╗
║   🏢 AgentForge Backend Server Running   ║
╚════════════════════════════════════════════╝

✅ Server: http://localhost:3000
✅ Health: http://localhost:3000/health
✅ FAL_API_KEY configured
```

## Testing It Works

1. **Test the backend health:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Open the frontend:**
   - Double-click `index.html` in Finder
   - OR run: `open index.html`

3. **Switch to AI mode** in the UI and click "Forge Persona"

## Troubleshooting

**Error: "Cannot find module"**
- You're in the wrong directory
- Run: `pwd` to see where you are
- Should be: `/Users/jmaulding/Desktop/AgentForge/backend`

**Error: "ENOENT package.json"**
- You haven't downloaded the files yet
- Use Git clone OR download manually from GitHub

**Server starts but images fail:**
- Check the browser console (F12)
- Check backend terminal for errors
- Verify API key is correct

## Need the Repository Files?

Download them from your GitHub repository:
- **Repository**: jasonmaulding/imagegenerator
- **Branch**: claude/agentforge-luxury-generator-011CV2XwXidCb7VvmH2s9coT

Or ask me to create a downloadable package!
