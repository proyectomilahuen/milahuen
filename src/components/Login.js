import { useState } from "react";
import axios from "axios"; // Asegúrate de importar axios
import '../styles/Login.css';

// Cambio: exportamos Login como exportación por defecto
const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    console.log("1. entre");
    e.preventDefault();

    // Cambié el operador | por ||
    if (!username || !contrasena) {
      setError(true);
      setSuccessMessage("");
      return;
    }
    console.log("3. no entre if");

    try {
      console.log("4. entre try");


      const token = btoa(`${username}:${password}`);

      const response = await axios.get(
        `http://localhost:8090/user/usuario/${username}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log("5. entre get");

      console.log(response);

      if (response.data === "Usuario no encontrado") {
        setError(true);
        console.log("Usuario no encontrado");
        return;
      }

      
      setUser(response.data); 
      if (response.data === true) {
        console.log("Usuario autenticado, redirigiendo...");
     
        window.location.replace("/inventario");
        return;
      }
    } catch (error) {
      setError(
        error.response ? error.response.data : "Hubo un error en la solicitud"
      );
      setSuccessMessage("");
    }
  };

  return (
    <section className="login">
      <h1 className="h1-form">¡Hola!</h1>
      <p className="p-form">Qué bueno tenerte de vuelta.</p>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          className="input-form"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario*"
        />
        <input
          className="input-form"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña*"
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

      {error && (
        <p style={{ color: "#e71d36" }}>Por favor ingresa ambos campos</p>
      )}
      {successMessage && (
        <p style={{ color: "#28a745" }}>{successMessage}</p> // Mensaje de éxito
      )}
    </section>
  );
};

export default Login;
