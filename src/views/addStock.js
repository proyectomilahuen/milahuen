import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddStock.css";

const AddStock = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [stock, setStock] = useState("");
  const [providers, setProviders] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.is_staff) {
      window.location.replace("/perfil");
    }

    const fetchProviders = async () => {
      try {
        const response = await axios.get("https://emporio-milahuen.onrender.com/api/proveedores/");
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://emporio-milahuen.onrender.com/api/productos/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProviders();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || !stock || selectedProviders.length === 0) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    const productData = {
      product: selectedProduct,
      stock: parseInt(stock, 10),
      providers: selectedProviders,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No tienes permisos para realizar esta acción. Inicia sesión.");
        return;
      }

      // Lógica para aumentar el stock usando fetch
      const response = await fetch(`https://emporio-milahuen.onrender.com/api/productos/${selectedProduct}/increase_stock/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ amount: parseInt(stock, 10) }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const data = await response.json();

      setSuccessMessage("¡Stock aumentado exitosamente!");
      setErrorMessage("");
      setSelectedProduct("");
      setStock("");
      setSelectedProviders([]);
    } catch (error) {
      console.error("Error al aumentar el stock:", error);
      setErrorMessage(`Hubo un error al aumentar el stock: ${error.message}`);
    }
  };

  return (
    <div className="add-stock">
      <h1>Agregar Stock</h1>
      <form className="add-stock-form" onSubmit={handleSubmit}>
        <label htmlFor="product">Producto:</label>
        <select
          id="product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label htmlFor="stock">Cantidad en Stock:</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Ej: 22"
          min="0"
        />

        <label htmlFor="providers">Proveedor:</label>
        <select
          id="providers"
          multiple
          value={selectedProviders}
          onChange={(e) => setSelectedProviders([...e.target.selectedOptions].map(option => option.value))}
        >
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>

        <button type="submit">Agregar Stock</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddStock;