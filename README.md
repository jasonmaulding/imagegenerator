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

## Customizing Image Generation

The backend uses fal.ai's HunyuanImage 3.0 model. You can customize the image quality and characteristics by editing `backend/server.js`.

### Available Settings (IMAGE_CONFIG)

Open `backend/server.js` and find the `IMAGE_CONFIG` object (around line 16):

```javascript
const IMAGE_CONFIG = {
    width: 1280,              // Image width (512-2048)
    height: 960,              // Image height (512-2048)
    num_inference_steps: 30,  // Quality vs speed (20-50)
    guidance_scale: 7.5,      // Prompt adherence (5-15)
    output_format: 'jpeg',    // 'jpeg' or 'png'
    enable_safety_checker: true,
    enable_prompt_expansion: false,
    negative_prompt: 'blurry, low quality, watermark...'
};
```

### Parameter Guide

| Parameter | Description | Recommended Range | Impact |
|-----------|-------------|-------------------|---------|
| **width/height** | Image dimensions in pixels | 512-2048 | Larger = better detail but slower |
| **num_inference_steps** | AI generation iterations | 20-50 | More = better quality but slower |
| **guidance_scale** | How strictly to follow prompt | 5-15 | Higher = more literal interpretation |
| **output_format** | File format | jpeg, png | JPEG is faster/smaller, PNG is lossless |
| **enable_safety_checker** | Filter inappropriate content | true/false | Keep true for production |
| **enable_prompt_expansion** | Auto-enhance prompts with AI | true/false | May alter your intended style |
| **negative_prompt** | What to avoid in images | Custom text | Helps prevent unwanted artifacts |

### Quality Presets

**Fast Mode (Cost-Effective):**
```javascript
num_inference_steps: 20,
guidance_scale: 6.0,
output_format: 'jpeg'
```

**Balanced Mode (Recommended):**
```javascript
num_inference_steps: 30,
guidance_scale: 7.5,
output_format: 'jpeg'
```

**Premium Mode (Best Quality):**
```javascript
num_inference_steps: 50,
guidance_scale: 10.0,
output_format: 'png'
```

### Common Customizations

**For Portrait Photography:**
```javascript
negative_prompt: 'blurry, distorted face, multiple heads, disfigured, deformed'
guidance_scale: 8.5
```

**For Architectural Shots:**
```javascript
negative_prompt: 'people, watermark, text, cropped, poor composition'
guidance_scale: 9.0
```

**For Faster Generation (Testing):**
```javascript
width: 960,
height: 720,
num_inference_steps: 20
```

After making changes, restart the backend:
```bash
cd backend
node server.js
```

Full API documentation: [fal.ai HunyuanImage 3.0](https://fal.ai/models/fal-ai/hunyuan-image/v3/text-to-image)

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
  "imageUrl": "https://fal.media/files/...",
  "seed": 12345678,
  "contentType": "image/jpeg"
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
