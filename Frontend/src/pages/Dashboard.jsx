import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>📦 Sistema de Inventario</h1>
        <div className="nav-items">
          <span className="user-info">Bienvenido, {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h2>¡Bienvenido al Sistema de Inventario!</h2>
          <p>Usuario: {user?.email}</p>
          <p>Rol: {user?.role}</p>
          
          <div className="coming-soon">
            <h3>Próximamente:</h3>
            <ul>
              <li>✓ Gestión de Productos</li>
              <li>✓ Gestión de Órdenes</li>
              <li>✓ Reportes y Estadísticas</li>
              <li>✓ Panel de Control</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
