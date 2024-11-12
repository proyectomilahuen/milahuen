import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';
import '../styles/CollapsibleTable2.css';

export default function CollapsibleTable2() {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://emporio-milahuen.onrender.com/api/productos/');
        setRows(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (orderBy === 'price' || orderBy === 'stock') {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    } else if (orderBy === 'is_active') {
      return order === 'asc'
        ? a.is_active - b.is_active
        : b.is_active - a.is_active;
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <TableContainer component={Paper} className="table-container">
      <Table aria-label="collapsible table" className="table">
        <TableHead>
          <TableRow>
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
            <TableCell align="left">
              Descripción
            </TableCell>
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
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === 'is_active'}
                direction={orderBy === 'is_active' ? order : 'asc'}
                onClick={() => handleRequestSort('is_active')}
              >
                Estado
              </TableSortLabel>
            </TableCell>
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
              <TableCell align="left">{row.is_active ? 'Disponible' : 'No disponible'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
