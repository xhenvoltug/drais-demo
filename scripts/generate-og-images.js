// scripts/generate-og-images.js
// Generate static Open Graph images for social sharing
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const images = [
  {
    name: 'og-image-default.png',
    title: 'DRAIS School Management System',
    subtitle: 'Comprehensive School Management Made Easy',
  },
  {
    name: 'twitter-image.png',
    title: 'DRAIS',
    subtitle: 'Transforming Education Through Technology',
  },
];

async function generateOGImages() {
  const publicDir = path.join(__dirname, '../public');

  console.log('🖼️  Generating Open Graph images...\n');

  for (const { name, title, subtitle } of images) {
    try {
      // Create SVG template for OG image
      const svgImage = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <!-- Background -->
          <rect width="1200" height="630" fill="url(#grad)"/>
          
          <!-- Logo Circle -->
          <circle cx="150" cy="315" r="80" fill="white" opacity="0.15"/>
          
          <!-- Book Icon -->
          <rect x="110" y="285" width="80" height="60" rx="5" fill="white"/>
          <line x1="150" y1="285" x2="150" y2="345" stroke="#2563eb" stroke-width="3"/>
          
          <!-- Title -->
          <text x="280" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white">
            ${title}
          </text>
          
          <!-- Subtitle -->
          <text x="280" y="360" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.9)">
            ${subtitle}
          </text>
          
          <!-- Footer Badge -->
          <rect x="950" y="540" width="220" height="50" rx="10" fill="rgba(255,255,255,0.2)"/>
          <text x="1060" y="573" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" font-weight="600">
            By Xhenvolt Technologies
          </text>
        </svg>
      `;

      const outputPath = path.join(publicDir, name);
      
      await sharp(Buffer.from(svgImage))
        .resize(1200, 630)
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${name}`);
    } catch (error) {
      console.error(`❌ Error generating ${name}:`, error);
    }
  }

  console.log('\n✨ All Open Graph images generated successfully!');
}

generateOGImages();
