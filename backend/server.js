const express = require('express');
const cors = require('cors');
const { fal } = require('@fal-ai/client');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== CONFIGURATION ====================
// Set your fal.ai API key here or use environment variable
const FAL_API_KEY = process.env.FAL_API_KEY || 'YOUR_FAL_KEY_HERE';

if (FAL_API_KEY === 'YOUR_FAL_KEY_HERE') {
    console.warn('⚠️  WARNING: Using placeholder API key. Set FAL_API_KEY environment variable or update server.js');
} else {
    console.log('✅ FAL_API_KEY configured');
}

fal.config({ credentials: FAL_API_KEY });

// ==================== IMAGE GENERATION ENDPOINT ====================
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt, id } = req.body;

        console.log(`🎨 Generating image for: ${id}`);
        console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

        // Call HunyuanImage 3.0 via fal.ai
        const result = await fal.subscribe("fal-ai/hunyuan-image/v3/text-to-image", {
            input: {
                prompt: prompt,
                image_size: "1280x960",
                num_inference_steps: 30,
                guidance_scale: 7.5
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    console.log(`⏳ Progress: ${update.logs?.join(' ')}`);
                }
            }
        });

        console.log(`✅ Image generated successfully for: ${id}`);
        res.json({
            success: true,
            imageUrl: result.images[0].url
        });

    } catch (error) {
        console.error('❌ Generation error:', error.message);

        // Return fallback mode on error
        res.json({
            success: false,
            error: error.message,
            fallback: true,
            imageUrl: `https://picsum.photos/seed/${encodeURIComponent(req.body.id)}/800/600`
        });
    }
});

// ==================== MOCK ENDPOINT (for testing) ====================
app.post('/api/mock', (req, res) => {
    const { id } = req.body;
    console.log(`🎭 Mock mode: Generating placeholder for ${id}`);

    res.json({
        success: true,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(id)}/800/600`
    });
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'AgentForge Backend',
        apiConfigured: FAL_API_KEY !== 'YOUR_FAL_KEY_HERE'
    });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║   🏢 AgentForge Backend Server Running   ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log(`\n✅ Server: http://localhost:${PORT}`);
    console.log(`✅ Health: http://localhost:${PORT}/health`);
    console.log(`\n📖 Usage:`);
    console.log(`   - POST /api/generate - Generate AI images`);
    console.log(`   - POST /api/mock     - Generate placeholder images`);
    console.log(`\n🔑 API Key Status: ${FAL_API_KEY !== 'YOUR_FAL_KEY_HERE' ? 'Configured ✅' : 'Not configured ⚠️'}`);
    console.log(`\n💡 Tip: Set FAL_API_KEY environment variable:`);
    console.log(`   export FAL_API_KEY="your_key_here" && node server.js\n`);
});

// ==================== ERROR HANDLING ====================
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nShutting down server gracefully...');
    process.exit(0);
});
