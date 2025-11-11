# AgentForge Elite - AI Persona Generator

A luxury website that creates professional real estate agent profiles with AI-generated photos and bios tailored to specific markets (NYC, Beverly Hills, Miami, Aspen).

![AgentForge Elite](https://img.shields.io/badge/Status-Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Instant Mock Mode**: Test the full UI with placeholder images (no setup required)
- **AI-Powered Generation**: Photorealistic agent headshots using HunyuanImage 3.0
- **Market-Specific Personas**: Pre-configured styles for luxury markets
- **Portfolio Gallery**: Generates 12+ contextual images per agent
- **Luxury UI/UX**: Dark theme with gold accents, smooth animations

## Quick Start (2 Minutes)

### Option 1: Mock Mode (No Setup)

1. **Download this repository**
2. **Open `index.html` in your browser**
3. **Click "Forge Persona"** - See it work instantly!

That's it! Mock mode uses placeholder images to show you how everything works.

---

## Upgrade to Real AI Images

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [fal.ai](https://fal.ai) API key (free tier available)

### Step 1: Get Your fal.ai API Key

1. Go to [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys)
2. Sign up (free)
3. Click **"Create Key"**
4. Copy your key (looks like `key_abc123...`)

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install required packages
npm install
```

### Step 3: Configure API Key

**Option A: Environment Variable (Recommended)**

```bash
# Linux/Mac
export FAL_API_KEY="your_key_here"
node server.js

# Windows (Command Prompt)
set FAL_API_KEY=your_key_here
node server.js

# Windows (PowerShell)
$env:FAL_API_KEY="your_key_here"
node server.js
```

**Option B: Edit server.js**

Open `backend/server.js` and replace:

```javascript
const FAL_API_KEY = process.env.FAL_API_KEY || 'YOUR_FAL_KEY_HERE';
```

With your actual key:

```javascript
const FAL_API_KEY = process.env.FAL_API_KEY || 'key_abc123...';
```

### Step 4: Start the Backend

```bash
cd backend
node server.js
```

You should see:

```
╔════════════════════════════════════════════╗
║   🏢 AgentForge Backend Server Running   ║
╚════════════════════════════════════════════╝

✅ Server: http://localhost:3000
✅ Health: http://localhost:3000/health
```

### Step 5: Open the Frontend

1. Open `index.html` in your browser
2. Select **"HunyuanImage 3.0 (fal.ai)"** mode
3. Click **"Forge Persona"**
4. Wait 10-15 seconds for AI generation

---

## Project Structure

```
AgentForge/
├── index.html              # Main frontend (works standalone)
├── backend/
│   ├── server.js          # Express API server
│   ├── package.json       # Node.js dependencies
│   └── node_modules/      # (created after npm install)
└── README.md              # This file
```

---

## How It Works

### Mock Mode
- Uses [Lorem Picsum](https://picsum.photos) for instant placeholder images
- Perfect for testing UI/UX without API costs
- No backend required

### AI Mode
1. Frontend sends prompts to backend (`localhost:3000`)
2. Backend calls fal.ai HunyuanImage 3.0 API
3. AI generates photorealistic images (1280x960)
4. Images returned to frontend and displayed

---

## Configuration Options

### Market Territories
- **Manhattan Luxury**: Central Park penthouses, Tom Ford aesthetic
- **Beverly Hills Estates**: Palm-lined mansions, Brunello Cucinelli style
- **Miami Beach Waterfront**: Art Deco terraces, Ralph Lauren resort wear
- **Aspen Ski Chalets**: Mountain luxury, Moncler winter elegance

### Client Tiers
- **Ultra-Luxury**: $5M+ properties
- **Luxury**: $1.5M-$5M properties
- **Premium**: $500K-$1.5M properties

### Fashion Houses
- Tom Ford / Brioni (Ultra-Luxury)
- Theory / MaxMara (Executive)
- Brunello Cucinelli (Quiet Luxury)
- Ralph Lauren (Coastal Elite)

---

## API Endpoints

### `POST /api/generate`
Generate AI image using HunyuanImage 3.0

**Request:**
```json
{
  "prompt": "Professional portrait of Alexandra Sterling...",
  "id": "profile-123"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://fal.media/files/..."
}
```

### `POST /api/mock`
Generate placeholder image (no AI)

**Request:**
```json
{
  "id": "profile-123"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://picsum.photos/seed/profile-123/800/600"
}
```

### `GET /health`
Check server status

**Response:**
```json
{
  "status": "OK",
  "service": "AgentForge Backend",
  "apiConfigured": true
}
```

---

## Costs

### fal.ai Pricing (as of 2025)
- **HunyuanImage 3.0**: ~$0.0025 per image
- **13 images per persona**: ~$0.03 per generation
- **100 personas**: ~$3.00

Free tier typically includes credits to get started.

---

## Troubleshooting

### Images Don't Appear

**Check the status log** (bottom of page):
- If it says "Backend connection failed" → Backend not running
- If it says "Invalid API key" → Check your fal.ai key
- If it shows CORS errors → Make sure backend is on `localhost:3000`

**Solutions:**
```bash
# Restart backend
cd backend
node server.js

# Check health endpoint
curl http://localhost:3000/health
```

### "Command Not Found"

You need to install Node.js:
1. Go to [nodejs.org](https://nodejs.org)
2. Download and install LTS version
3. Restart terminal
4. Try `node --version` to verify

### Images Look Weird

AI generation is creative! Try:
- Different market territories
- Different fashion houses
- Regenerating (each generation is unique)

### Backend Crashes

Check your API key:
```bash
# Test your key
curl -X POST https://api.fal.ai/health \
  -H "Authorization: Key YOUR_KEY_HERE"
```

---

## Development

### Running in Development Mode

```bash
# Install dev dependencies
cd backend
npm install

# Run with auto-reload
npm run dev
```

### Customizing Personas

Edit the `LOCATION_PERSONAS` object in `index.html` (around line 300):

```javascript
const LOCATION_PERSONAS = {
  'your-market': {
    name: 'Your Market Name',
    style: {
      attire: 'your fashion description',
      setting: 'your location description',
      lighting: 'your lighting preference',
      demeanor: 'personality traits',
      colors: 'color palette'
    }
  }
};
```

---

## Security Notes

- **Never commit API keys to Git** (use `.gitignore`)
- **Never expose keys in frontend code** (always use backend)
- **Use environment variables** for production deployments
- **Keep dependencies updated** (`npm update`)

---

## Deployment

### Deploy Frontend (Static Hosting)

Works on any static host:
- [Vercel](https://vercel.com) - `vercel deploy`
- [Netlify](https://netlify.com) - Drag and drop `index.html`
- [GitHub Pages](https://pages.github.com) - Push to `gh-pages` branch

### Deploy Backend (Node.js Hosting)

Works on any Node.js platform:
- [Railway](https://railway.app) - Auto-deploy from Git
- [Render](https://render.com) - Free tier available
- [Heroku](https://heroku.com) - `git push heroku main`

**Remember to set `FAL_API_KEY` environment variable in your hosting platform!**

---

## License

MIT License - Feel free to modify and use for your projects.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/agentforge/issues)
- **fal.ai Docs**: [fal.ai/docs](https://fal.ai/docs)
- **HunyuanImage**: [hunyuan-image](https://fal.ai/models/fal-ai/hunyuan-image)

---

## Credits

- **AI Model**: HunyuanImage 3.0 by Tencent (via fal.ai)
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Placeholder Images**: Lorem Picsum

---

**Built with love for luxury real estate professionals** 🏢✨
