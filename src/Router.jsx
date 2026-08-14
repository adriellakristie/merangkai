import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import WorkDetail from './pages/WorkDetail';

const NotFound = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Courier New", monospace',
    textAlign: 'center'
  }}>
    <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
    <p style={{ marginBottom: '24px', color: '#6b7280' }}>Page not found</p>
    <a 
      href="/" 
      style={{ 
        color: '#d97706', 
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}
    >
      ← Return to Archive
    </a>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
