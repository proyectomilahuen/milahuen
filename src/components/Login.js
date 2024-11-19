import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor, ingresa ambos campos.");
      return;
    }

    try {
      console.log("Enviando solicitud de login...");

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

      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      setSuccessMessage("Inicio de sesión exitoso.");
      setError(null);
      setTimeout(() => {
        window.location.replace("/inventario");
      }, 1000);
    } catch (error) {
      console.log("Error en la solicitud:", error);

      const errorMessage =
        error.response && error.response.data && error.response.data.detail
          ? error.response.data.detail === "No User matches the given query."
            ? "Usuario no registrado o credenciales incorrectas."
            : error.response.data.detail
          : "Hubo un error en la solicitud";

      alert(errorMessage);
      setError(errorMessage);
      setSuccessMessage("");
    }
  };

  return (
    <div className="login">
      <h1 className="h1-form">¡Hola!</h1>
      <p className="p-form">Qué bueno tenerte de vuelta.</p>
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

      {successMessage && <p style={{ color: "#28a745" }}>{successMessage}</p>}
    </div>
  );
};

export default Login;
