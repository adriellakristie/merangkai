import React from 'react';

const BarongSketch = () => {
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
          src="https://openprocessing.org/sketch/2937014/embed/?plusEmbedHash=01cb4e3e&userID=582347&plusEmbedTitle=true&show=sketch"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="Wayan the Barong: Interactive Balinese Guardian"
        />
      </div>
    </div>
  );
};

export default BarongSketch;
