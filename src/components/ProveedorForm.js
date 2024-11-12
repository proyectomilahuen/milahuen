import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import '../styles/Form.css';
import { Link } from 'react-router-dom';

// Opciones para la categoría (estas categorías pueden ser personalizadas según lo que necesites)
const categories = ['Frutos secos', 'Semillas', 'Cereales Integrales', 'Legumbres', 'Envasados', 'Lácteos', 'Bebidas', 'Productos congelados'];

// Opciones para el estado del proveedor
const providerStates = ['Activo', 'Inactivo'];

export default function ProveedorForm({ onSubmit }) {
  // Estados para cada campo del formulario
  const [nombreProveedor, setNombreProveedor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');

  // Manejo del cambio de los campos de texto
  const handleNombreProveedorChange = (event) => setNombreProveedor(event.target.value);
  const handleCategoriaChange = (event) => setCategoria(event.target.value);
  const handleDescripcionChange = (event) => setDescripcion(event.target.value);
  const handleEstadoChange = (event) => setEstado(event.target.value);

  // Función que se ejecuta al hacer submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit({
        nombreProveedor,
        categoria,
        descripcion,
        estado
      });
    }

    // Reseteamos el formulario después de enviarlo
    setNombreProveedor('');
    setCategoria('');
    setDescripcion('');
    setEstado('Activo');
  };

  return (
    <section className="form-container">
      <Link to="/inventario" className="no-underline">
      <h1 className="form-title">Agregar Nuevo Proveedor</h1>
      </Link>
      <p className="form-description">
        Completa los siguientes datos para registrar un nuevo proveedor.
      </p>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="input-form"
            type="text"
            value={nombreProveedor}
            onChange={handleNombreProveedorChange}
            placeholder="Nombre del Proveedor*"
            required
          />
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

        <div className="form-group">
          <TextField
            label="Descripción"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={descripcion}
            onChange={handleDescripcionChange}
            placeholder="Descripción del proveedor"
            required
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              value={estado}
              onChange={handleEstadoChange}
              required
            >
              {providerStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <button className="btn-form" type="submit">
          Registrar proveedor
        </button>

      </form>
    </section>
  );
}
