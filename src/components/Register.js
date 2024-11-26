import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}register/`,
        {
          username,
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      onRegisterSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setError(null);

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Hubo un error en la solicitud.";
      setError(errorMessage);
    }
  };

  return (
    <div className="login">
      <h1 className="h1-form-login">Regístrate</h1>
      <p className="p-form-login">Crea una cuenta para continuar.</p>
      <form className="formulario-login" onSubmit={handleSubmit}>
        <input
          className="input-form-login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
        />
        <input
          className="input-form-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          className="input-form-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button className="btn-form-login" type="submit">
          Crear Cuenta
        </button>
        <p className="p-form-link">
          ¿Ya tienes una cuenta?{" "}
          <a className="link-register" href="/login">
            Inicia sesión
          </a>
        </p>
      </form>
      {error && <p style={{ color: "#e71d36" }}>{error}</p>}
    </div>
  );
};

export default Register;
