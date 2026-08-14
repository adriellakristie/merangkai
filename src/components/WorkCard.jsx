// import { Link } from 'react-router-dom';

// const WorkCard = ({ work }) => {
//   return (
//     <Link 
//       to={`/work/${work.id}`}
//       style={{
//         display: 'block',
//         textDecoration: 'none',
//         color: 'inherit'
//       }}
//     >
//       <div 
//         style={{
//           cursor: 'pointer',
//           transition: 'all 0.3s ease',
//           padding: '24px',
//           overflow: 'visible'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-4px)';
//           e.currentTarget.style.opacity = '0.9';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.opacity = '1';
//         }}
//       >
//         {/* Image */}
//         <div style={{
//           width: '100%',
//           height: '300px',
//           overflow: 'hidden',
//           marginBottom: '16px',
//           position: 'relative'
//         }}>
//           <img 
//             src={work.image}
//             alt={work.title}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'contain',
//               transition: 'all 0.3s ease',
//               transformOrigin: 'center center',
//               position: 'absolute',
//               top: '0',
//               left: '0'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = 'scale(1.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = 'scale(1)';
//             }}
//           />
//         </div>

//         {/* Title */}
//         <h3 style={{
//           fontFamily: '"Playfair Display", serif',
//           fontSize: '24px',
//           color: 'var(--maroon)',
//           marginTop: '8px',
//           marginBottom: '8px',
//           fontWeight: '600'
//         }}>
//           {work.title}
//         </h3>

//         {/* Year */}
//         <p style={{
//           fontFamily: '"Courier New", monospace',
//           fontSize: '12px',
//           textTransform: 'uppercase',
//           color: 'var(--text-muted)',
//           marginBottom: '12px',
//           letterSpacing: '0.1em'
//         }}>
//           {work.year} · {work.medium}
//         </p>

//         {/* Description */}
//         <p style={{
//           fontFamily: '"Courier New", monospace',
//           textAlign: 'center',
//           fontSize: '14px',
//           color: 'var(--text-muted)',
//           lineHeight: '1.5',
//           maxWidth: '300px',
//           margin: '0 auto'
//         }}>
//           {work.shortDesc}
//         </p>

//         {/* Decorative dots */}
//         <div style={{
//           display: 'flex',
//           gap: '3px',
//           marginTop: '16px',
//           alignItems: 'center'
//         }}>
//           {Array.from({ length: 8 }).map((_, i) => (
//             <span
//               key={i}
//               style={{
//                 display: 'block',
//                 width: '3px',
//                 height: '3px',
//                 borderRadius: '50%',
//                 backgroundColor: 'var(--gold)',
//                 opacity: Math.sin((i / 7) * Math.PI) * 0.6 + 0.4
//               }}
//             />
//           ))}
//           <span style={{
//             fontFamily: '"Courier New", monospace',
//             fontSize: '11px',
//             textTransform: 'uppercase',
//             color: 'var(--gold)',
//             marginLeft: '8px',
//             letterSpacing: '0.1em'
//           }}>
//             View Project
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default WorkCard;