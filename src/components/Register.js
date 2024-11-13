import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor ingresa ambos campos");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}register/`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      onRegisterSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Hubo un error en la solicitud";
      setError(errorMessage);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        className="input-form"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico*"
      />
      <input
        className="input-form"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña*"
      />
      <button className="btn-form-register" type="submit">
        Crear Cuenta
      </button>
      {error && <p style={{ color: "#e71d36" }}>{error}</p>}
    </form>
  );
};

export default Register;
