import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Estilos para las filas
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: '1px solid #ddd', // Líneas divisorias en el fondo
    },
  },
});

// Función para crear los datos
function createData(nombre, categoria, presentacion, precio, stock, proveedor, fechaUltimaCompra, estado) {
  return {
    nombre,
    categoria,
    precio,
    stock,
    proveedor,

  };
}

// Componente Row para mostrar cada fila de la tabla
function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  // Formatear el precio con punto como separador de miles
  const formattedPrice = new Intl.NumberFormat('es-ES').format(row.precio);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell />
        <TableCell component="th" scope="row">
          {row.nombre}
        </TableCell>
        <TableCell align="left">{row.categoria}</TableCell>
        <TableCell align="left">${formattedPrice}</TableCell>
        <TableCell align="left">{row.stock}</TableCell>
        <TableCell align="left">{row.proveedor}</TableCell>

      </TableRow>
    </React.Fragment>
  );
}

// Definición de las propiedades de la fila
Row.propTypes = {
  row: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    presentacion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    proveedor: PropTypes.string.isRequired,
    fechaUltimaCompra: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
};

// Datos de ejemplo de los productos
const rows = [
  createData('Almedras', 'Frutos secos', '250g Bolsa', 5000, 100, 'Frutos Secos Manilandia', '2023-09-15', 'Disponible'),
  createData('Nueces', 'Mezclas', '500g Bolsa', 4000, 50, 'NutriFrutos', '2023-08-30', 'Disponible'),
  createData('Maní tostado', 'Frutos secos', '1kg Caja', 3000, 30, 'Frutal Delicia', '2023-07-25', 'Bajo Pedido'),
  createData('Coco laminado', 'Frutos secos', '100g Bolsa', 4500, 200, 'SecoNuts', '2023-09-01', 'Agotado'),
  createData('Cranberris', 'Frutos secos', '250g Bolsa', 5500, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Ciruela sin cuesco', 'Frutos secos', '250g Bolsa', 6000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),

  createData('Chía', 'Semillas', '250g Bolsa', 2000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Linaza', 'Semillas', '250g Bolsa', 2500, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Pepas de zapallo', 'Semillas', '250g Bolsa', 4000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Maravilla pelada', 'Semillas', '250g Bolsa', 3500, 80, 'AlmondCo', '2023-09-10', 'Disponible'),

  createData('Avena integral', 'Cereales Integrales', '250g Bolsa', 3000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Arroz integral', 'Cereales Integrales', '250g Bolsa', 4500, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Quínoa', 'Cereales Integrales', '250g Bolsa', 5000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),

  createData('Lentejas rojas', 'Legumbres', '250g Bolsa', 3000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Lentejas baby', 'Legumbres', '250g Bolsa', 3200, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Porotos rojos', 'Legumbres', '250g Bolsa', 4000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),

  createData('Mantequilla de maní', 'Envasados', '250g Bolsa', 8000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Mix Puesco', 'Envasados', '250g Bolsa', 6000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Mix Lahuén', 'Envasados', '250g Bolsa', 7000, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
  createData('Mix Murta', 'Envasados', '250g Bolsa', 6500, 80, 'AlmondCo', '2023-09-10', 'Disponible'),
];

// Componente principal para mostrar la tabla
export default function CollapsibleTable2() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre</TableCell>
            <TableCell align="left">Categoría</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Stock</TableCell>
            <TableCell align="left">Proveedor</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.nombre} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
