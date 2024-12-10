import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Form.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('https://emporio-milahuen.onrender.com/api/proveedores/');
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://emporio-milahuen.onrender.com/api/tags/');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProviders();
    fetchCategories();
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value ? parseFloat(event.target.value) : null);
  const handleStockChange = (event) => setStock(event.target.value ? parseInt(event.target.value) : null);
  const handleIsActiveChange = (event) => setIsActive(event.target.value === 'true');
  const handleProviderChange = (event) => setSelectedProvider(event.target.value ? parseInt(event.target.value) : null);
  const handleTagsChange = (event) => setTags(event.target.value);
  const handleImageChange = (event) => setImage(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !price || !selectedProvider || tags.length === 0) {
      setErrorMessage("Todos los campos obligatorios deben ser completados.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No tienes permisos para realizar esta acción. Inicia sesión.");
      return;
    }

    // Prepara datos
    const tagsIds = tags.map(tag => tag.id);
    const headers = { 
      'Authorization': `Token ${token}`
    };

    try {
      let response;

      if (image) {
        // Si hay imagen, enviamos como FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description || '');
        formData.append('price', price);
        formData.append('stock', stock || 0);
        formData.append('is_active', isActive ? 'true' : 'false');
        formData.append('proveedor', selectedProvider);
        
        // Agrega cada tag por separado
        tagsIds.forEach(tagId => formData.append('tags', tagId));

        formData.append('image', image);

        response = await axios.post(
          'https://emporio-milahuen.onrender.com/api/productos/',
          formData,
          { headers }
        );
      } else {
        // Sin imagen, enviamos JSON
        const productData = {
          name,
          description: description || '',
          price,
          stock: stock || 0,
          is_active: isActive,
          proveedor: selectedProvider,
          tags: tagsIds
        };

        response = await axios.post(
          'https://emporio-milahuen.onrender.com/api/productos/',
          productData,
          { 
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("¡Producto creado exitosamente!");
        setErrorMessage("");
        setName('');
        setDescription('');
        setPrice(null);
        setStock(null);
        setIsActive(false);
        setSelectedProvider(null);
        setTags([]);
        setImage(null);
      } else {
        setErrorMessage("Hubo un error al crear el producto. Intenta nuevamente.");
      }

    } catch (error) {
      console.error('Error al crear producto:', error.response?.data || error.message);
      setErrorMessage("Hubo un error al crear el producto. Revisa la consola o logs del servidor para más detalles.");
    }
  };

  return (
    <section className="form-container">
      <Link to="/inventario" className="no-underline">
        <h2 className="inventory-view__title">Crear Nuevo Producto</h2>
      </Link>
      <p className="form-description">
        Completa los siguientes datos para crear un nuevo producto.
      </p>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            label="Nombre del Producto"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            placeholder="Nombre del Producto"
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
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Descripción del Producto"
          />
        </div>

        <div className="form-group">
          <TextField
            label="Precio"
            fullWidth
            variant="outlined"
            type="number"
            value={price || ''}
            onChange={handlePriceChange}
            placeholder="Precio"
            required
          />
          <TextField
            label="Stock"
            fullWidth
            variant="outlined"
            type="number"
            value={stock || ''}
            onChange={handleStockChange}
            placeholder="Stock"
          />
        </div>

        <div className="form-group">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Proveedor</InputLabel>
            <Select
              label="Proveedor"
              value={selectedProvider || ''}
              onChange={handleProviderChange}
              required
            >
              {providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="form-group">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Tags</InputLabel>
            <Select
              label="Tags"
              value={tags}
              onChange={handleTagsChange}
              multiple
            >
              {categories.map((tag) => (
                <MenuItem key={tag.id} value={tag}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="form-group">
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Activo</InputLabel>
            <Select
              label="Activo"
              value={isActive.toString()}
              onChange={handleIsActiveChange}
              required
            >
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button className="btn-form" type="submit">
          Crear Producto
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
};

export default ProductForm;
