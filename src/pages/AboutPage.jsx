import { Link } from 'react-router-dom';
import AuthUser from '../components/AuthUser.jsx';

export default function AboutPage() {
  return (
    <div className="page about-page">
      <AuthUser />
      <h2>Acerca de esta app</h2>
      <p>Esta es una aplicación de demostración para aprender React con:</p>
      <ul>
        <li>Context API para autenticación</li>
        <li>React Router para navegación</li>
        <li>Fetch de APIs públicas (ReqRes + JSONPlaceholder)</li>
        <li>Manejo de estado con hooks</li>
      </ul>
      <Link to="/feed">← Volver al Feed</Link>
    </div>
  );
}