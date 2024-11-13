import { useState } from "react";
import axios from "axios";
import '../styles/Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Renombrado a password para consistencia
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor ingresa ambos campos");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(
        `http://emporio-milahuen.onrender.com/login/`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Se asume que el backend devuelve un objeto user si la autenticación es exitosa
      const user = response.data.user;

      if (!user) {
        setError("Usuario no encontrado o credenciales incorrectas");
        return;
      }

      // Guardamos el usuario en el estado
      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false, // Ajusta esto según el backend
      });

      // Mensaje de éxito y redirección si es administrador
      setSuccessMessage("Inicio de sesión exitoso.");
      if (user.isAdmin) {
        window.location.replace("/inventario");
      }
      
    } catch (error) {
      setError(
        error.response && error.response.data
          ? error.response.data
          : "Hubo un error en la solicitud"
      );
      setSuccessMessage("");
    }
  };

  return (
    <section className="login">
      <h1 className="h1-form-login">¡Hola!</h1>
      <p className="p-form-login">Qué bueno tenerte de vuelta.</p>
      <form className="formulario-login" onSubmit={handleSubmit}>
        <input
          className="input-form"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario*"
        />
        <input
          className="input-form"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña*"
        />
        <button className="btn-form-login" type="submit">
          Iniciar Sesión
        </button>
        <p className="p-form-link">
          ¿No tienes cuenta?{" "}
          <a className="link-register" href="/registro">
            Regístrate aquí
          </a>
        </p>
      </form>

      {error && <p style={{ color: "#e71d36" }}>{error}</p>}
      {successMessage && <p style={{ color: "#28a745" }}>{successMessage}</p>}
    </section>
  );
};

export default Login;
