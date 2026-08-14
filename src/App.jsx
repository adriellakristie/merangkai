import CrossStitchTitle from './components/CrossStitchTitle';
import HatchingGraphic from './components/HatchingGraphic';
import LacePattern from './components/LacePattern';
import WorkImageTile from './components/WorkImageTile';
import WorkCaption from './components/WorkCaption';
import IntroSplash from './components/IntroSplash';
import { useState } from 'react';
import { works } from './data/works';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isEnglish, setIsEnglish] = useState(false);

  return (
    <>
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}

      {/* ===================== HERO ===================== */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '80px 24px', 
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'visible'
      }}>
        {/* Hatching graphic — top right */}
        <div style={{
          position: 'absolute',
          top: -30,
          right: '-40px',
          width: '45%',
          height: '55%',
          opacity: 0.7,
          pointerEvents: 'none'
        }}>
          <HatchingGraphic position="top-right" />
        </div>

        {/* Hatching graphic — bottom left */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '-40px',
          width: '40%',
          height: '50%',
          opacity: 0.6,
          pointerEvents: 'none'
        }}>
          <HatchingGraphic position="bottom-left" />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '780px',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            color: '#6b7280',
            marginBottom: '32px',
            letterSpacing: '0.2em'
          }}>
            EST. 2026 · DIVE INTO CULTURE & HERITAGE
          </p>

          {/* Cross-stitch title */}
          <div style={{ marginBottom: '8px' }}>
            <CrossStitchTitle text="MERANGKAI" />
          </div>

          {/* Decorative dot divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '40px'
          }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  opacity: Math.sin((i / 24) * Math.PI) * 0.6 + 0.15
                }}
              />
            ))}
          </div>

          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            color: '#6b7280',
            marginTop: '24px'
          }}>
            A FRAGMENT OF HOME, INDONESIA
          </p>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          textTransform: 'uppercase',
          color: '#6b7280'
        }}>
          SCROLL ↓
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section style={{
        height: '80vh',
        padding: '96px 24px',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'visible',
        backgroundColor: 'var(--maroon)'
      }}>
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px'
          }}>
            <p style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              color: '#6b7280'
            }}>
            </p>
          </div>

          <p 
            onClick={() => setIsEnglish(!isEnglish)}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: '80px',
              color: 'var(--gold)',
              lineHeight: '1.2',
              maxWidth: '300px',
              marginBottom: '32px',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--gold-light)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--gold)';
            }}
          >
            {isEnglish ? (
              <>
                Welcome,
                <br />
                <br />
              </>
            ) : (
              'Selamat Datang,'
            )}
          </p>

          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            textAlign: 'right',
            color: 'var(--text-on-maroon)',
            maxWidth: '420px',
            margin: '0 auto',
            marginTop: '40vh',
            marginBottom: '24px',
            marginRight: '20px',
          }}>
            Welcome to an archive of culture. <br />
            Witness Indonesia through generative code
          </p>

          {/* Dotted ornament */}
          <div style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <span 
                key={i} 
                style={{
                  display: 'block',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#8b4b5c',
                  opacity: Math.sin((i / 24) * Math.PI) * 0.4 + 0.15
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== KARYA ===================== */}
      <section style={{ overflow: 'visible', backgroundColor: '#ffffff', paddingBottom: '120px' }}>
        <div style={{
          maxWidth: '1169px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <p
            onClick={() => setIsEnglish(!isEnglish)}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '72px',
              color: 'var(--gold)',
              lineHeight: '1.2',
              margin: '0 0 24px',
              textAlign: 'right',
              paddingTop: '80px',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              marginRight: '10vh',
            }}
            onMouseEnter={(e) => { e.target.style.color = 'var(--gold-light)'; }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--gold)'; }}
          >
            {isEnglish ? 'Works' : 'Karya'}
          </p>
        </div>

        {window.innerWidth > 768 ? (
          /* Desktop: staggered mosaic, positions taken from the design file */
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1121px',
            margin: '0 auto',
            aspectRatio: '1121 / 1424',
            padding: '0 24px'
          }}>
            <WorkImageTile work={works[0]} style={{ left: '11.5%', top: '0%', width: '37.65%', height: '33.2%' }} />
            <WorkCaption work={works[0]} style={{ left: '54.5%', top: '7.9%', width: '27.2%', height: '12.5%' }} />

            <WorkImageTile work={works[1]} style={{ left: '56.6%', top: '27.4%', width: '37.65%', height: '33.2%' }} />
            <WorkCaption work={works[1]} style={{ left: '15.7%', top: '39%', width: '27.2%', height: '12.5%' }} />

            <WorkImageTile work={works[2]} style={{ left: '11.5%', top: '66.8%', width: '37.65%', height: '33.2%' }} />
            <WorkCaption work={works[2]} style={{ left: '54.5%', top: '74.7%', width: '27.2%', height: '12.5%' }} />
          </div>
        ) : (
          /* Mobile: simple stacked fallback */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '0 24px',
            maxWidth: '480px',
            margin: '0 auto'
          }}>
            {[works[0], works[1], works[2]].map((work) => (
              <div key={work.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '112%' }}>
                  <WorkImageTile work={work} style={{ left: 0, top: 0, width: '100%', height: '100%' }} />
                </div>
                <div style={{ position: 'relative', width: '55%', paddingBottom: '24%' }}>
                  <WorkCaption work={work} style={{ left: 0, top: 0, width: '100%', height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer style={{
        padding: '96px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Lace background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.06,
          pointerEvents: 'none'
        }}>
          <LacePattern variant="doily" density={0.7} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          {/* Dot border top */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '32px' }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: '#8b4b5c',
                  opacity: 0.15 + Math.sin((i / 39) * Math.PI) * 0.25
                }}
              />
            ))}
          </div>

          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: '48px',
            color: 'var(--gold)',
            lineHeight: '1.2',
            marginBottom: '24px'
          }}>
            More coming...
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: '12px', textTransform: 'uppercase', color: '#6b7280' }}>EST. 2026 — ONGOING</p>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: '12px', textTransform: 'uppercase', color: '#6b7280' }}>MERANGKAI</p>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: '12px', textTransform: 'uppercase', color: '#6b7280' }}>by Adriella Kristie</p>
          </div>

          {/* Dot border bottom */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '32px' }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: '#8b4b5c',
                  opacity: 0.15 + Math.sin((i / 39) * Math.PI) * 0.25
                }}
              />
            ))}
          </div>
        </div>

        <p style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          textTransform: 'uppercase',
          color: '#6b7280',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          © 2026 MERANGKAI — A Fragment of Home
        </p>
      </footer>
    </>
  );
}

export default App;