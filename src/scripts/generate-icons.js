const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Sizes for PWA icons
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Source logo path
const sourceLogo = path.join(__dirname, '../assets/e-syarat.png');

// Output directory
const outputDir = path.join(__dirname, '../assets/icon');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
async function generateIcons() {
    try {
        // Read the source image
        const image = sharp(sourceLogo);

        // Generate each size
        for (const size of sizes) {
            const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

            await image
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .png()
                .toFile(outputPath);

            console.log(`Generated ${size}x${size} icon`);
        }

        console.log('All icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

// Run the generator
generateIcons(); 