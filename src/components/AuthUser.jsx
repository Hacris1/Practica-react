import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function AuthUser() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  if (!user) return null;
  
  return (
    <div className="auth-user">
      <span>Sesión: {user.email}</span>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
