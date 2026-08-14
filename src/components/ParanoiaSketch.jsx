import React from 'react';

const ParanoiaSketch = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '75%', // 750/1000 = 75% aspect ratio
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: '#000'
      }}>
        <iframe 
          src="/paranoia.html"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="Paranoia: Digital Ondel-Ondel Animation"
        />
      </div>
    </div>
  );
};

export default ParanoiaSketch;
