import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Verificar si hay un usuario autenticado al cargar el componente
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor, ingresa ambos campos.");
      return;
    }

    try {
      const response = await axios.post(
        "https://emporio-milahuen.onrender.com/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;

      if (!token) {
        alert("Usuario no registrado o credenciales incorrectas.");
        return;
      }

      // Guardar el usuario en localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
        })
      );

      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      window.location.replace("/perfil");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.detail
          ? error.response.data.detail
          : "Hubo un error en la solicitud";
      alert(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="login">
      <h1 className="h1-form-login">¡Hola!</h1>
      <p className="p-form-login">Qué bueno tenerte de vuelta.</p>
      <form className="formulario-login" onSubmit={handleSubmit}>
        <input
          className="input-form-login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          className="input-form-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
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
    </div>
  );
};

export default Login;
