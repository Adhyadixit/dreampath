const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function createFavicon() {
  try {
    // Create a canvas with the favicon dimensions
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, 32, 32);
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#f0f0f0';
    ctx.fill();
    ctx.strokeStyle = '#0a3b6c';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Draw the rocket shape (simplified Dexter logo)
    ctx.fillStyle = '#ffa726';  // Orange color
    ctx.beginPath();
    ctx.moveTo(8, 10);
    ctx.lineTo(24, 16);
    ctx.lineTo(8, 22);
    ctx.closePath();
    ctx.fill();
    
    // Draw outline
    ctx.strokeStyle = '#0a3b6c';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw eye
    ctx.fillStyle = '#0a3b6c';
    ctx.beginPath();
    ctx.arc(14, 16, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), buffer);
    console.log('Favicon created successfully!');
    
    // Note: For a proper .ico file, you'd typically use a library like 'png-to-ico'
    // But for simplicity, we'll just use the PNG and rename it
    fs.copyFileSync(
      path.join(__dirname, '../public/favicon.png'), 
      path.join(__dirname, '../public/favicon.ico')
    );
    console.log('Favicon.ico created (copied from PNG)');
    
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
