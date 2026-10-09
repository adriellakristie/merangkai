import { Link } from 'react-router-dom';

const WorkCaption = ({ work, style }) => {
  return (
    <Link
      to={`/work/${work.id}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        textDecoration: 'none',
        backgroundColor: '#F3F2F2',
        boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        padding: '12px',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        right: '100px',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 14px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
      }}
    >
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(18px, 4.1vw, 36px)',
        textAlign: 'left',
        color: 'var(--maroon)',
        lineHeight: '0.95',
        maxWidth: '100px',
        margin: 0
      }}>
        {work.title}
      </h3>
    </Link>
  );
};

export default WorkCaption;