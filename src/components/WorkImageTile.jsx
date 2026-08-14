import { Link } from 'react-router-dom';

const WorkImageTile = ({ work, style }) => {
  return (
    <Link
      to={`/work/${work.id}`}
      style={{
        display: 'block',
        position: 'absolute',
        textDecoration: 'none',
        overflow: 'hidden',
        // backgroundColor: '#D9D9D9',
        cursor: 'pointer',
        ...style
      }}
    >
      <img
        src={work.image}
        alt={work.title}
        style={{
          width: '80%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.4s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      />
    </Link>
  );
};

export default WorkImageTile;