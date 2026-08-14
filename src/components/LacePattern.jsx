import { useEffect, useRef, useCallback } from 'react';

/**
 * Generates organic lace / dot-matrix patterns on a canvas.
 * Inspired by textile art: doily curves, dripping dot grids, and floral medallions.
 */
const LacePattern = ({ className = '', variant = 'doily', color, density = 1 }) => {
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    const dotColor = color || 'hsl(350 45% 45%)';
    ctx.fillStyle = dotColor;

    if (variant === 'doily') {
      drawDoily(ctx, w, h, density);
    } else if (variant === 'drip') {
      drawDrip(ctx, w, h, density);
    } else if (variant === 'floral') {
      drawFloral(ctx, w, h, density);
    }
  }, [variant, color, density]);

  useEffect(() => {
    document.fonts.ready.then(() => draw());
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

function drawDot(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawDoily(ctx, w, h, density) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const maxR = Math.min(w, h) * 0.45;
  const dotR = 1.5 * density;
  const spacing = 6 / density;

  // Concentric rings with scalloped edges
  for (let r = spacing * 2; r < maxR; r += spacing) {
    const circumference = 2 * Math.PI * r;
    const numDots = Math.floor(circumference / spacing);
    
    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * Math.PI * 2;
      // Add scallop modulation
      const scallops = Math.floor(r / 15) + 4;
      const scallop = Math.sin(angle * scallops) * (spacing * 0.8);
      const actualR = r + scallop;
      
      const x = cx + Math.cos(angle) * actualR;
      const y = cy + Math.sin(angle) * actualR;
      
      if (x > -5 && x < w + 5 && y > -5 && y < h + 5) {
        drawDot(ctx, x, y, dotR);
      }
    }
  }

  // Inner ornamental spirals
  for (let s = 0; s < 6; s++) {
    const baseAngle = (s / 6) * Math.PI * 2;
    for (let t = 0; t < 60; t++) {
      const spiralR = 20 + t * 0.8;
      const angle = baseAngle + t * 0.15;
      const x = cx + Math.cos(angle) * spiralR;
      const y = cy + Math.sin(angle) * spiralR;
      drawDot(ctx, x, y, dotR * 0.8);
    }
  }
}

function drawDrip(ctx, w, h, density) {
  const dotR = 1.5 * density;
  const spacing = 7 / density;
  const cols = Math.floor(w / spacing);

  // Grid of dots that "drip" downward with varying lengths
  for (let col = 0; col < cols; col++) {
    const x = col * spacing + spacing * 0.5;
    // Determine drip length based on position (wave pattern)
    const dripLength = Math.sin(col * 0.15) * h * 0.3 + h * 0.5;
    const startY = h * 0.05;
    
    for (let y = startY; y < startY + dripLength; y += spacing) {
      // Fade out dots toward the bottom of the drip
      const progress = (y - startY) / dripLength;
      if (Math.random() > progress * 0.3) {
        drawDot(ctx, x, y, dotR * (1 - progress * 0.4));
      }
    }
  }

  // Add ornamental curves at the top
  for (let i = 0; i < 8; i++) {
    const cx = (i + 0.5) * (w / 8);
    const cy = h * 0.08;
    for (let t = 0; t < 40; t++) {
      const angle = Math.PI + (t / 40) * Math.PI;
      const r = 20 + Math.sin(t * 0.3) * 8;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r * 0.6;
      drawDot(ctx, x, y, dotR * 0.7);
    }
  }
}

function drawFloral(ctx, w, h, density) {
  const dotR = 1.8 * density;
  const spacing = 8 / density;

  // Create floral medallion clusters
  const centers = [
    { x: w * 0.2, y: h * 0.3 },
    { x: w * 0.7, y: h * 0.2 },
    { x: w * 0.4, y: h * 0.7 },
    { x: w * 0.85, y: h * 0.65 },
    { x: w * 0.1, y: h * 0.85 },
  ];

  for (const center of centers) {
    // Petals
    const petalCount = 6 + Math.floor(Math.random() * 4);
    for (let p = 0; p < petalCount; p++) {
      const baseAngle = (p / petalCount) * Math.PI * 2;
      for (let t = 0; t < 25; t++) {
        const r = t * 2.5;
        const spread = Math.sin(t / 25 * Math.PI) * 12;
        for (let s = -2; s <= 2; s++) {
          const angle = baseAngle + s * 0.04;
          const x = center.x + Math.cos(angle) * r + Math.cos(angle + Math.PI / 2) * s * spread * 0.2;
          const y = center.y + Math.sin(angle) * r + Math.sin(angle + Math.PI / 2) * s * spread * 0.2;
          if (x > 0 && x < w && y > 0 && y < h) {
            drawDot(ctx, x, y, dotR * 0.6);
          }
        }
      }
    }

    // Center dot cluster
    for (let r = 0; r < 12; r += spacing * 0.5) {
      const numDots = Math.max(1, Math.floor(2 * Math.PI * r / spacing));
      for (let i = 0; i < numDots; i++) {
        const angle = (i / numDots) * Math.PI * 2;
        drawDot(ctx, center.x + Math.cos(angle) * r, center.y + Math.sin(angle) * r, dotR);
      }
    }
  }

  // Connect clusters with dotted vines
  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i];
    const b = centers[i + 1];
    const steps = 60;
    for (let t = 0; t < steps; t++) {
      const progress = t / steps;
      const x = a.x + (b.x - a.x) * progress + Math.sin(progress * Math.PI * 3) * 20;
      const y = a.y + (b.y - a.y) * progress + Math.cos(progress * Math.PI * 2) * 15;
      if (Math.random() > 0.2) {
        drawDot(ctx, x, y, dotR * 0.5);
      }
    }
  }
}

export default LacePattern;
