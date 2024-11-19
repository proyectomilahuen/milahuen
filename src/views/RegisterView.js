import { useState } from "react";
import Register from "../components/Register";
import "../styles/Register.css";

const RegisterView = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterSuccess = (message) => {
    setSuccessMessage(message);
  };

  return (
    <div >
    
      <Register onRegisterSuccess={handleRegisterSuccess} />
      {successMessage && <p style={{ color: "#28a745" }}>{successMessage}</p>}    </div>
  );
};

export default RegisterView;
