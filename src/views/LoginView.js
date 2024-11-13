import React, { useState } from "react";
import Login from "../components/Login";

const LoginView = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Login setUser={setUser} />
      {user && <div>Bienvenido, {user.username}</div>}
    </div>
  );
};

export default LoginView;
