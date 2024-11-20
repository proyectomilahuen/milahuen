import React, { useState } from "react";
import Login from "../components/Login";
import Modal from "../components/Modal";

const LoginView = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Login setUser={setUser} />
      {user && (
        <Modal>
          <h2>¡Bienvenido, {user.username}!</h2>
          <p>Has iniciado sesión exitosamente. Ahora puedes gestionar el inventario de productos.</p>
        </Modal>
      )}
    </div>
  );
};

export default LoginView;
