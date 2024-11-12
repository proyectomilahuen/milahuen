import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import '../styles/Form.css';
import { Link } from 'react-router-dom';

// Opciones para la categoría
const categories = ['Frutos secos', 'Semillas', 'Cereales Integrales', 'Legumbres', 'Envasados'];

export default function ProductForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [proveedor, setProveedor] = useState('');

  const handleNombreChange = (event) => setNombre(event.target.value);
  const handleCategoriaChange = (event) => setCategoria(event.target.value);
  const handlePrecioChange = (event) => setPrecio(event.target.value);
  const handleStockChange = (event) => setStock(event.target.value);
  const handleProveedorChange = (event) => setProveedor(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit({
        nombre,
        categoria,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        proveedor
      });
    }

    // Reseteamos el formulario
    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');
    setProveedor('');
  };

  return (
    <section className="form-container">
      <Link to="/inventario" className="no-underline">
        <h1 className="form-title">Agregar Nuevo Producto</h1>
      </Link>
      <p className="form-description">
        Completa los siguientes datos para agregar un nuevo producto a la lista.
      </p>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="input-form"
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Nombre*"
            required
          />
          <input
            className="input-form"
            type="text"
            value={proveedor}
            onChange={handleProveedorChange}
            placeholder="Proveedor*"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="input-form"
            type="number"
            value={precio}
            onChange={handlePrecioChange}
            placeholder="Precio*"
            required
          />
          <input
            className="input-form"
            type="number"
            value={stock}
            onChange={handleStockChange}
            placeholder="Stock*"
            required
          />
        </div>

        <div className="form-group">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Categoría</InputLabel>
            <Select
              label="Categoría"
              value={categoria}
              onChange={handleCategoriaChange}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <button className="btn-form" type="submit">
          Agregar Producto
        </button>
      </form>
    </section>
  );
}
