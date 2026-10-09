import { useEffect, useRef, useState } from 'react';

// Renders a sketch iframe at a fixed "design" size and scales it down to fit its container,
// so p5 sketches keep their desktop proportions on phones and small windows.
const ScaledEmbed = ({ src, title, baseWidth = 1000, baseHeight = 750 }) => {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / baseWidth));
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div style={{ width: '100%', maxWidth: `${baseWidth}px`, margin: '0 auto' }}>
      <div
        ref={boxRef}
        style={{
          position: 'relative',
          width: '100%',
          height: `${baseHeight * scale}px`,
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#000'
        }}
      >
        <iframe
          src={src}
          title={title}
          scrolling="no"
          allow="autoplay; fullscreen"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
            border: 'none',
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        />
      </div>
      {scale < 1 && (
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '12px',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#d97706',
            textDecoration: 'none'
          }}
        >
          Open full screen ↗
        </a>
      )}
    </div>
  );
};

export default ScaledEmbed;
