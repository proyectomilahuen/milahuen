import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleEditProfile = () => {
    alert("Funcionalidad de edición de perfil próximamente.");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mi Perfil</h1>
      {user ? (
        <div className="profile-card">
          <p>
            <strong>Nombre de Usuario:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button className="btn-edit-profile" onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>
      ) : (
        <p>No estás conectado. Inicia sesión para ver tu perfil.</p>
      )}
    </div>
  );
};

export default Profile;
