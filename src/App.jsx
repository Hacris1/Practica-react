import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Footer from './components/Footer.jsx';
import AboutPage from './pages/AboutPage.jsx';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PrivateRoute><PostDetailPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
