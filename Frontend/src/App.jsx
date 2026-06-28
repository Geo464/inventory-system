import { useState } from 'react';
import { authenticate } from './services/authServices.jsx';
import { listProducts } from './services/productServices.jsx';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await authenticate(email, password);
      setUser(response);
      setMessage(`Bienvenido ${response.username}`);
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadProducts = async () => {
    setMessage('');
    setLoading(true);

    try {
      const response = await listProducts();
      setProducts(response);
      setMessage(`Cargados ${response.length} productos`);
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Inventory System</h1>
        <p>Prueba de conexión entre React y el backend</p>
      </header>

      <section className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Correo:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@dominio.com"
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="contraseña"
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Conectando...' : 'Autenticar'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        {user && (
          <div className="user-info">
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.roleName || user.roleId}</p>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Productos</h2>
        <button onClick={handleLoadProducts} disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar productos'}
        </button>
        {products.length > 0 && (
          <ul className="item-list">
            {products.map((product) => (
              <li key={product.productId}>
                <span>{product.name}</span>
                <small>Precio: {product.price} - Stock: {product.stock}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
