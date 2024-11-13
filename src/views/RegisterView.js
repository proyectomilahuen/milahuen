import { useState } from "react";
import Register from "../components/Register";
import "../styles/Register.css";

const RegisterView = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterSuccess = (message) => {
    setSuccessMessage(message);
  };

  return (
    <section className="register">
      <h1 className="h1-form">Regístrate</h1>
      <p className="p-form">Crea una cuenta para continuar</p>
      <Register onRegisterSuccess={handleRegisterSuccess} />
      {successMessage && <p style={{ color: "#28a745" }}>{successMessage}</p>}
      <p className="p-form-link">
        ¿Ya tienes una cuenta?{" "}
        <a className="link-login" href="/login">
          Inicia sesión aquí
        </a>
      </p>
    </section>
  );
};

export default RegisterView;
