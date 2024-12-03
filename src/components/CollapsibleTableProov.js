import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, Button
} from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function CollapsibleTableProov() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token de autenticación
        if (!token) {
          setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
          return;
        }

        const response = await axios.get(
          'https://emporio-milahuen.onrender.com/api/proveedores/',
          {
            headers: {
              Authorization: `Token ${token}` // Incluye el token en la solicitud
            }
          }
        );
        setRows(response.data);
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        setErrorMessage('Error al cargar la lista de proveedores.');
      }
    };

    fetchProveedores();
  }, []);

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
    if (!selectedRow.name || !selectedRow.contact_email || !selectedRow.phone_number) {
      setErrorMessage('Los campos Nombre, Correo y Teléfono son obligatorios.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Obtén el token de autenticación
      if (!token) {
        setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
        return;
      }

      const response = await axios.put(
        `https://emporio-milahuen.onrender.com/api/proveedores/${selectedRow.id}/`,
        selectedRow,
        {
          headers: {
            Authorization: `Token ${token}` // Envía el token en la solicitud
          }
        }
      );

      // Actualizar la tabla local con los nuevos datos
      const updatedRows = rows.map(row => (row.id === selectedRow.id ? selectedRow : row));
      setRows(updatedRows);

      setSuccessMessage('Proveedor actualizado exitosamente.');
      setErrorMessage('');
      setTimeout(handleCloseDialog, 2000);
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error.response || error.message);
      setErrorMessage('Error al actualizar el proveedor. Intenta nuevamente.');
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description || 'N/A'}</TableCell>
                <TableCell>{row.contact_email || 'N/A'}</TableCell>
                <TableCell>{row.phone_number || 'N/A'}</TableCell>
                <TableCell>{row.address || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(row)}>
                    <Edit />
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
          Editar Proveedor
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo"
                value={selectedRow?.contact_email || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, contact_email: e.target.value })}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={selectedRow?.phone_number || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, phone_number: e.target.value })}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Dirección"
                value={selectedRow?.address || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, address: e.target.value })}
                variant="outlined"
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
          <Button onClick={handleSave} variant="contained"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
              }}>Guardar
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
