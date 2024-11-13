import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Login  from "../components/Login";
import { UseState } from "react";

import "regenerator-runtime/runtime";

const LoginView = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const username = "pingeso";
        const password = "Hola1234.";
        const token = btoa(`${username}:${password}`);


        const response = await axios.get("http://emporio-milahuen.onrender.com/login/", {
          headers: {
            username: username,
            password: contrasena,
          },
        });

        setUsers(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>


      <Login setUser={setUser} />

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default LoginView;