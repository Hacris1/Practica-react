import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('eve.holt@reqres.in'); 
  const [password, setPassword] = useState('cityslicka'); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email.trim(), password.trim());
      navigate('/feed');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
      </form>
      <p className="hint">Credenciales de prueba: eve.holt@reqres.in / cityslicka. Si tu red bloquea APIs externas, usa demo@local / demo123 (modo mock).</p>
    </div>
  );
}
