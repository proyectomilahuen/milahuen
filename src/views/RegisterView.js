import { useState } from "react";
import Register from "../components/Register";
import "../styles/Register.css";

const RegisterView = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      window.location.replace("/login");
    }, 3000);
  };

  return (
    <div className="register-view">
      <Register onRegisterSuccess={handleRegisterSuccess} />
      {successMessage && <p style={{ color: "#28a745", marginTop: "20px" }}>{successMessage}</p>}
    </div>
  );
};

export default RegisterView;
