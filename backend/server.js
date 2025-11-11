const express = require('express');
const cors = require('cors');
const { fal } = require('@fal-ai/client');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== CONFIGURATION ====================
// Set your fal.ai API key here or use environment variable
// Get your key at: https://fal.ai/dashboard/keys
const FAL_API_KEY = process.env.FAL_API_KEY || 'YOUR_FAL_KEY_HERE';

// ==================== IMAGE GENERATION SETTINGS ====================
// These can be customized based on your needs
const IMAGE_CONFIG = {
    width: 1280,              // Image width in pixels
    height: 960,              // Image height in pixels
    num_inference_steps: 30,  // More steps = better quality but slower (20-50 recommended)
    guidance_scale: 7.5,      // How closely to follow prompt (5-15 recommended)
    output_format: 'jpeg',    // 'jpeg' or 'png' (jpeg is smaller/faster)
    enable_safety_checker: true,  // Filter inappropriate content
    enable_prompt_expansion: false, // Auto-enhance prompts with AI (may alter intent)
    negative_prompt: 'blurry, low quality, watermark, signature, distorted, malformed'
};

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
        // Documentation: https://fal.ai/models/fal-ai/hunyuan-image/v3/text-to-image
        const result = await fal.subscribe("fal-ai/hunyuan-image/v3/text-to-image", {
            input: {
                prompt: prompt,
                negative_prompt: IMAGE_CONFIG.negative_prompt,
                image_size: {
                    width: IMAGE_CONFIG.width,
                    height: IMAGE_CONFIG.height
                },
                num_inference_steps: IMAGE_CONFIG.num_inference_steps,
                guidance_scale: IMAGE_CONFIG.guidance_scale,
                enable_safety_checker: IMAGE_CONFIG.enable_safety_checker,
                output_format: IMAGE_CONFIG.output_format,
                enable_prompt_expansion: IMAGE_CONFIG.enable_prompt_expansion
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
            imageUrl: result.images[0].url,
            seed: result.seed,
            contentType: result.images[0].content_type
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
