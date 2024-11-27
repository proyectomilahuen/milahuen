import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import '../styles/Form.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProveedorForm = ({ onSubmit }) => {
  const [nombreProveedor, setNombreProveedor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [contactEmail, setContactEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [tags, setTags] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://emporio-milahuen.onrender.com/api/tags/');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleNombreProveedorChange = (event) => setNombreProveedor(event.target.value);
  const handleDescripcionChange = (event) => setDescripcion(event.target.value);
  const handleEstadoChange = (event) => setEstado(event.target.value);
  const handleContactEmailChange = (event) => setContactEmail(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const proveedorData = {
      name: nombreProveedor,
      description: descripcion,
      state: estado,
      contact_email: contactEmail,
      phone_number: phoneNumber,
      address: address,
      tags: tags.map(tag => tag.id) // Send tag IDs instead of names
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No tienes permisos para realizar esta acción. Inicia sesión.");
        return;
      }

      const response = await axios.post(
        'https://emporio-milahuen.onrender.com/api/proveedores/',
        proveedorData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        }
      );

      console.log('Proveedor añadido:', response.data);
      setSuccessMessage("¡Proveedor agregado exitosamente!");
      setErrorMessage("");
      setNombreProveedor('');
      setDescripcion('');
      setEstado('Activo');
      setContactEmail('');
      setPhoneNumber('');
      setAddress('');
      setTags([]);
    } catch (error) {
      console.error('Error al añadir proveedor:', error);
      setErrorMessage("Hubo un error al agregar el proveedor. Intenta nuevamente.");
    }
  };

  return (
    <section className="form-container">
      <Link to="/inventario" className="no-underline">
        <h2 className="inventory-view__title">Agregar Nuevo Proveedor</h2>
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
          <TextField
            label="Correo de Contacto"
            fullWidth
            variant="outlined"
            value={contactEmail}
            onChange={handleContactEmailChange}
            placeholder="Correo de Contacto"
            required
          />

          <TextField
            label="Número de Teléfono"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Número de Teléfono"
          />

          <TextField
            label="Dirección"
            fullWidth
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
            placeholder="Dirección"
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Tags</InputLabel>
            <Select
              label="Tags"
              value={tags}
              onChange={handleTagsChange}
              multiple
            >
              {categorias.map((tag) => (
                <MenuItem key={tag.id} value={tag}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              value={estado}
              onChange={handleEstadoChange}
              required
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button className="btn-form" type="submit">
          Registrar proveedor
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
};

export default ProveedorForm;