import { useEffect, useRef, useCallback } from 'react';

/**
 * Draws floral forms (stems, petals, buds) using vertical hatching strokes.
 * The flowers are built from density fields shaped like botanical elements,
 * then rendered with the same vertical-line halftone technique.
 */
const HatchingGraphic = ({ className = '', position = 'top-right' }) => {
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

    // Build a density map for floral shapes
    const mapW = Math.ceil(w);
    const mapH = Math.ceil(h);
    const densityMap = new Float32Array(mapW * mapH);

    const setDensity = (px, py, radius, strength) => {
      const r2 = radius * radius;
      const x0 = Math.max(0, Math.floor(px - radius));
      const x1 = Math.min(mapW - 1, Math.ceil(px + radius));
      const y0 = Math.max(0, Math.floor(py - radius));
      const y1 = Math.min(mapH - 1, Math.ceil(py + radius));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d2 = (x - px) ** 2 + (y - py) ** 2;
          if (d2 < r2) {
            const falloff = 1 - d2 / r2;
            densityMap[y * mapW + x] += falloff * falloff * strength;
          }
        }
      }
    };

    // Draw a stem as a series of overlapping circles along a curve
    const drawStem = (startX, startY, endX, endY, thickness) => {
      const steps = 80;
      for (let t = 0; t <= steps; t++) {
        const p = t / steps;
        const x = startX + (endX - startX) * p + Math.sin(p * Math.PI * 2.5) * thickness * 3;
        const y = startY + (endY - startY) * p;
        setDensity(x, y, thickness, 0.9);
      }
    };

    // Draw a petal as an elliptical density blob
    const drawPetal = (cx, cy, angle, length, width) => {
      const steps = 30;
      for (let t = 0; t <= steps; t++) {
        const p = t / steps;
        const along = (p - 0.5) * length;
        const petalWidth = width * Math.sin(p * Math.PI); // widest in middle
        const px = cx + Math.cos(angle) * along;
        const py = cy + Math.sin(angle) * along;
        setDensity(px, py, petalWidth, 0.8 + p * 0.2);
      }
    };

    // Draw a leaf
    const drawLeaf = (cx, cy, angle, length) => {
      const steps = 25;
      for (let t = 0; t <= steps; t++) {
        const p = t / steps;
        const along = p * length;
        const leafWidth = length * 0.2 * Math.sin(p * Math.PI);
        const px = cx + Math.cos(angle) * along;
        const py = cy + Math.sin(angle) * along;
        setDensity(px, py, leafWidth, 0.6);
      }
    };

    const mirror = position === 'bottom-left';
    const scale = Math.min(w, h) / 400;

    // Compose floral arrangement
    if (!mirror) {
      // Top-right: flowers growing from top-right corner downward/left
      const baseX = w * 0.7;
      const baseY = h * 0.1;

      // Main stem curving down
      drawStem(baseX + 40 * scale, baseY - 20, baseX - 60 * scale, h * 0.85, 4 * scale);
      // Secondary stem
      drawStem(baseX + 80 * scale, baseY - 10, baseX + 20 * scale, h * 0.7, 3 * scale);
      // Third stem
      drawStem(baseX - 20 * scale, baseY, baseX - 100 * scale, h * 0.6, 3 * scale);

      // Large flower at top
      const f1x = baseX + 30 * scale, f1y = baseY + 60 * scale;
      for (let p = 0; p < 7; p++) {
        const angle = (p / 7) * Math.PI * 2 + 0.3;
        drawPetal(f1x, f1y, angle, 45 * scale, 18 * scale);
      }
      setDensity(f1x, f1y, 12 * scale, 1);

      // Medium flower mid-right
      const f2x = baseX + 60 * scale, f2y = h * 0.35;
      for (let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2 + 1;
        drawPetal(f2x, f2y, angle, 30 * scale, 12 * scale);
      }
      setDensity(f2x, f2y, 8 * scale, 1);

      // Bud
      const f3x = baseX - 50 * scale, f3y = h * 0.3;
      drawPetal(f3x, f3y, -Math.PI * 0.4, 25 * scale, 10 * scale);
      drawPetal(f3x, f3y, -Math.PI * 0.6, 22 * scale, 9 * scale);

      // Leaves along stems
      drawLeaf(baseX, h * 0.25, Math.PI * 0.7, 50 * scale);
      drawLeaf(baseX + 40 * scale, h * 0.45, Math.PI * 0.3, 40 * scale);
      drawLeaf(baseX - 30 * scale, h * 0.5, Math.PI * 0.8, 45 * scale);
      drawLeaf(baseX + 70 * scale, h * 0.55, -Math.PI * 0.2, 35 * scale);

      // Small scattered buds
      setDensity(baseX + 90 * scale, h * 0.15, 10 * scale, 0.7);
      setDensity(baseX - 70 * scale, h * 0.45, 8 * scale, 0.5);
    } else {
      // Bottom-left: mirror arrangement growing from bottom-left up
      const baseX = w * 0.3;
      const baseY = h * 0.9;

      drawStem(baseX - 40 * scale, baseY + 20, baseX + 60 * scale, h * 0.15, 4 * scale);
      drawStem(baseX - 80 * scale, baseY + 10, baseX - 20 * scale, h * 0.3, 3 * scale);
      drawStem(baseX + 20 * scale, baseY, baseX + 100 * scale, h * 0.4, 3 * scale);

      const f1x = baseX - 30 * scale, f1y = baseY - 60 * scale;
      for (let p = 0; p < 6; p++) {
        const angle = (p / 6) * Math.PI * 2 + 0.5;
        drawPetal(f1x, f1y, angle, 40 * scale, 16 * scale);
      }
      setDensity(f1x, f1y, 10 * scale, 1);

      const f2x = baseX - 60 * scale, f2y = h * 0.65;
      for (let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2;
        drawPetal(f2x, f2y, angle, 28 * scale, 11 * scale);
      }
      setDensity(f2x, f2y, 7 * scale, 1);

      const f3x = baseX + 50 * scale, f3y = h * 0.7;
      drawPetal(f3x, f3y, Math.PI * 0.4, 25 * scale, 10 * scale);
      drawPetal(f3x, f3y, Math.PI * 0.6, 22 * scale, 9 * scale);

      drawLeaf(baseX, h * 0.75, -Math.PI * 0.7, 50 * scale);
      drawLeaf(baseX - 40 * scale, h * 0.55, -Math.PI * 0.3, 40 * scale);
      drawLeaf(baseX + 30 * scale, h * 0.5, -Math.PI * 0.8, 45 * scale);

      setDensity(baseX - 90 * scale, h * 0.85, 10 * scale, 0.7);
      setDensity(baseX + 70 * scale, h * 0.55, 8 * scale, 0.5);
    }

    // Render density map as vertical hatching strokes
    ctx.strokeStyle = 'hsl(25 10% 10%)';
    ctx.lineCap = 'butt';

    const colSpacing = 2.2;
    for (let x = 0; x < w; x += colSpacing) {
      let inStroke = false;
      let strokeStart = 0;
      const xi = Math.floor(x);

      for (let y = 0; y < h; y++) {
        const idx = y * mapW + xi;
        const d = idx < densityMap.length ? densityMap[idx] : 0;
        const threshold = 0.08 + Math.random() * 0.12;

        if (d > threshold && !inStroke) {
          inStroke = true;
          strokeStart = y;
        } else if ((d <= threshold || y >= h - 1) && inStroke) {
          inStroke = false;
          const midY = Math.floor((strokeStart + y) / 2);
          const midIdx = midY * mapW + xi;
          const midD = midIdx < densityMap.length ? densityMap[midIdx] : 0;
          ctx.lineWidth = 0.6 + Math.min(midD, 1) * 2.2;

          const jitter = (Math.random() - 0.5) * 1.2;
          ctx.beginPath();
          ctx.moveTo(x + jitter, strokeStart);
          ctx.lineTo(x + jitter, y);
          ctx.stroke();
        }
      }
    }
  }, [position]);

  useEffect(() => {
    draw();
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

export default HatchingGraphic;
