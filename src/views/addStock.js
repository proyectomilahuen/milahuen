import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddStock.css";

const AddStock = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.is_staff) {
      window.location.replace("/perfil");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!productName || !description || !price || !stock) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }
  
    const productData = {
      name: productName,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      image: null,
      tags: [],
    };
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setErrorMessage("No tienes permisos para realizar esta acción. Inicia sesión.");
        return;
      }
  
      console.log("Enviando solicitud con token:", token);
      console.log("Datos del producto:", productData);
  
      const response = await axios.post(
        "https://emporio-milahuen.onrender.com/admin/api/product/add/",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Respuesta del servidor:", response.data);
  
      setSuccessMessage("¡Producto agregado exitosamente!");
      setErrorMessage("");
      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      console.error("Detalles del error:", error.response?.data || error.message);
      setErrorMessage("Hubo un error al agregar el producto. Intenta nuevamente.");
    }
  };
  


  return (
    <div className="add-stock">
      <h1>Agregar Producto</h1>
      <form className="add-stock-form" onSubmit={handleSubmit}>
        <label htmlFor="productName">Nombre del Producto:</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Ej: Maní Japonés"
        />

        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: Exquisito maní japonés"
        ></textarea>

        <label htmlFor="price">Precio:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ej: 1500"
          min="0"
        />

        <label htmlFor="stock">Cantidad en Stock:</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Ej: 22"
          min="0"
        />

        <button type="submit">Agregar Producto</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddStock;
