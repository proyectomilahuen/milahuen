import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Modal from "../components/Modal";

const LoginView = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.is_staff) {
        navigate("/inventario");
      } else {
        navigate("/perfil");
      }
    }
  }, [user, navigate]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowModal(true);
  };

  return (
    <div>
      <Login setUser={handleLogin} />
      {user && showModal && (
        <Modal>
          <h2>¡Bienvenido, {user.username}!</h2>
          {user.is_staff ? (
            <p>Has iniciado sesión exitosamente. Ahora puedes gestionar el inventario de productos.</p>
          ) : (
            <p>Has iniciado sesión exitosamente. Ahora puedes explorar tu perfil y pedidos.</p>
          )}
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default LoginView;
