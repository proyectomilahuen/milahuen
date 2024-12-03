import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, Button, TableSortLabel, Switch, FormControlLabel
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import '../styles/CollapsibleTable2.css';

export default function CollapsibleTableProducts() {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token de autenticación
        if (!token) {
          setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
          return;
        }

        const response = await axios.get('https://emporio-milahuen.onrender.com/api/productos/', {
          headers: {
            Authorization: `Token ${token}` // Incluye el token en la solicitud
          }
        });
        setRows(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setErrorMessage('Error al cargar la lista de productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEditClick = (row) => {
    setSelectedRow({ ...row });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setDialogOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSave = async () => {
    // Validar campos obligatorios
    if (!selectedRow.name || selectedRow.price === null || selectedRow.stock === null) {
      setErrorMessage('Los campos Nombre, Precio y Stock son obligatorios.');
      return;
    }
  
    // Crear un objeto con solo los campos que el backend espera
    const updatedProduct = {
      name: selectedRow.name,
      description: selectedRow.description,
      price: selectedRow.price,
      stock: selectedRow.stock,
      is_active: selectedRow.is_active,
    };
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
        return;
      }
  
      await axios.put(
        `https://emporio-milahuen.onrender.com/api/productos/${selectedRow.id}/`,
        updatedProduct,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      const updatedRows = rows.map((row) =>
        row.id === selectedRow.id ? { ...row, ...updatedProduct } : row
      );
      setRows(updatedRows);
  
      setSuccessMessage('Producto actualizado exitosamente.');
      setErrorMessage('');
      setTimeout(handleCloseDialog, 2000);
    } catch (error) {
      console.error('Error al actualizar el producto:', error.response?.data || error.message);
      setErrorMessage('Error al actualizar el producto. Intenta nuevamente.');
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
        return;
      }

      await axios.delete(`https://emporio-milahuen.onrender.com/api/productos/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);

      setSuccessMessage('Producto eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error.response || error.message);
      setErrorMessage('Error al eliminar el producto. Intenta nuevamente.');
    }
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (orderBy === 'price' || orderBy === 'stock') {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    } else if (orderBy === 'is_active') {
      return order === 'asc' ? a.is_active - b.is_active : b.is_active - a.is_active;
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" className="table">
          <TableHead>
            <TableRow className="first-row">
              <TableCell />
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Nombre
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleRequestSort('price')}
                >
                  Precio
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === 'stock'}
                  direction={orderBy === 'stock' ? order : 'asc'}
                  onClick={() => handleRequestSort('stock')}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell />
                <TableCell>{row.name}</TableCell>
                <TableCell align="left">{row.description || 'N/A'}</TableCell>
                <TableCell align="left">${row.price}</TableCell>
                <TableCell align="left">{row.stock}</TableCell>
                <TableCell align="left">{row.is_active ? 'Disponible' : 'Sin stock'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal estilizado */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Editar Producto
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                value={selectedRow?.name || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={selectedRow?.description || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, description: e.target.value })}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Precio"
                value={selectedRow?.price || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, price: parseFloat(e.target.value) })}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                value={selectedRow?.stock || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, stock: parseInt(e.target.value) })}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedRow?.is_active || false}
                    onChange={(e) => setSelectedRow({ ...selectedRow, is_active: e.target.checked })}
                  />
                }
                label="Disponible"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {errorMessage && <p style={{ color: 'red', marginRight: 'auto' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green', marginRight: 'auto' }}>{successMessage}</p>}
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
