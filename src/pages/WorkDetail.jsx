import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { works } from '../data/works';
import HatchingGraphic from '../components/HatchingGraphic';
import ParanoiaSketch from '../components/ParanoiaSketch';
import BarongSketch from '../components/BarongSketch';
import useIsMobile from '../hooks/useIsMobile';

const TagPill = ({ children }) => (
  <span style={{
    fontFamily: '"Courier New", monospace',
    fontSize: '14px',
    color: '#4b5563',
    backgroundColor: '#e5e7eb',
    padding: '10px 24px',
    borderRadius: '999px',
    display: 'inline-block'
  }}>
    {children}
  </span>
);

const TitleBlock = ({ work, align = 'right', isMobile }) => (
  <div style={{ marginBottom: '32px', marginRight: isMobile ? 0 : '36px', textAlign: align }}>
    <div style={{
      display: 'flex',
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'baseline',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <p style={{
        fontFamily: 'inter, sans-serif',
        marginRight:'24px',
        fontSize: '14px',
        color: '#d97706',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap'
      }}>
        {work.year}
      </p>
      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: isMobile ? '40px' : '56px',
        // marginRight: '36px',
        color: '#571e00',
        maxWidth: '200px',
        fontWeight: '600',
        lineHeight: '0.8',
        margin: 0
      }}>
        {work.title}
      </h1>
    </div>

    <p style={{
      fontFamily: 'Inter, sans-serif',
      // marginRight: '36px',
      alignSelf: 'right',
      fontSize: '14px',
      color: '#d97706',
      lineHeight: '2',
      marginTop: isMobile ? '28px' : '50px'
    }}>
      {work.fullDesc}
    </p>
  </div>
);

const WorkDetail = () => {
  const { id } = useParams();
  const work = works.find(w => w.id === id);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!work) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}>
        Work not found
      </div>
    );
  }

  const isSpecialLayout = work.id === 'wayan-barong' || work.id === 'ondel-ondel';
  const SketchComponent = work.id === 'wayan-barong' ? BarongSketch : ParanoiaSketch;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header with back button */}
      <header style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-40px',
          width: '200px',
          height: '100px',
          opacity: 0.1,
          pointerEvents: 'none'
        }}>
          <HatchingGraphic position="top-right" />
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          zIndex: 2
        }}>
          <Link
            to="/"
            style={{
              fontFamily: 'inter, sans-serif',
              fontSize: '14px',
              textTransform: 'uppercase',
              color: '#d97706',
              textDecoration: 'none',
              letterSpacing: '0.1em'
            }}
          >
            ← 
          </Link>
        </div>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isSpecialLayout ? '0 24px 80px' : (isMobile ? '24px 24px 80px' : '80px 24px')
      }}>
        {isSpecialLayout ? (
          <div>
            <TitleBlock work={work} align="right" isMobile={isMobile} />

            <div style={{ marginBottom: '32px' }}>
              <SketchComponent />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {work.tags?.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
        ) : (
          // Default layout for other projects (gallery + text)
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'start'
          }}>
            {/* Left: Image gallery */}
            <div>
              <div style={{ display: 'grid', gap: isMobile ? '24px' : '0px' }}>
                {work.gallery.map((image, index) => (
                  <div key={index} style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={image}
                      alt={`${work.title} ${index + 1}`}
                      style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Project details */}
            <div style={{ position: isMobile ? 'static' : 'sticky', top: '80px', order: isMobile ? -1 : 0 }}>
              <TitleBlock work={work} align="right" isMobile={isMobile} />

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {work.tags?.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkDetail;