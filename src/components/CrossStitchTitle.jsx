import { useEffect, useRef, useCallback } from 'react';

const CrossStitchTitle = ({ text, className = '' }) => {
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

    // Draw text on offscreen canvas to sample pixels
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    const fontSize = Math.min(w / (text.length * 0.62), h * 0.7);
    offCtx.font = `bold ${fontSize}px 'Courier Prime', monospace`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = '#000';
    offCtx.fillText(text, w / 2, h / 2);

    const imageData = offCtx.getImageData(0, 0, w, h);
    const pixels = imageData.data;

    // Cross-stitch rendering
    const gridSize = Math.max(5, Math.floor(w / 90));
    const crossSize = gridSize * 0.35;

    const colors = [
      'hsl(350 60% 45%)',
      'hsl(20 50% 40%)',
      'hsl(330 40% 50%)',
      'hsl(10 45% 35%)',
      'hsl(345 50% 55%)',
    ];

    ctx.lineWidth = 1.1;
    ctx.lineCap = 'round';

    for (let y = gridSize; y < h - gridSize; y += gridSize) {
      for (let x = gridSize; x < w - gridSize; x += gridSize) {
        const i = (Math.floor(y) * Math.floor(w) + Math.floor(x)) * 4;
        const alpha = pixels[i + 3];

        if (alpha > 80) {
          const colorIdx = Math.floor((Math.sin(x * 0.05) + Math.cos(y * 0.07) + 2) / 4 * colors.length) % colors.length;
          ctx.strokeStyle = colors[colorIdx];

          ctx.beginPath();
          ctx.moveTo(x - crossSize, y - crossSize);
          ctx.lineTo(x + crossSize, y + crossSize);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x + crossSize, y - crossSize);
          ctx.lineTo(x - crossSize, y + crossSize);
          ctx.stroke();
        }
      }
    }
  }, [text]);

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
      style={{ width: '100%', height: '120px' }}
    />
  );
};

export default CrossStitchTitle;
