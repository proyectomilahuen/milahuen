import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Alert, Select, MenuItem } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import '../styles/OrdersItems.css';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row, history, productNames, isSecondRow, onUpdateStatus } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleStatusChange = (event) => {
        onUpdateStatus(row.id, event.target.value);
    };

    return (
        <React.Fragment>
            <TableRow className={`${classes.root} ${isSecondRow ? 'second-row' : 'first-row'}`}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">
                    {new Date(row.order_date).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell align="left">
                    <Select
                        value={row.status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="pendiente">Pendiente</MenuItem>
                        <MenuItem value="cancelada">Cancelada</MenuItem>
                        <MenuItem value="completada">Completada</MenuItem>
                    </Select>
                </TableCell>
                <TableCell align="left">{row.total_price}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalles adicionales
                            </Typography>
                            <Typography variant="body2">Dirección: {row.address}</Typography>
                            <Typography variant="body2">Teléfono: {row.contact_number}</Typography>
                            <Typography variant="body2">Correo: {row.email}</Typography>
                            <Typography variant="body2" gutterBottom>Historial de artículos:</Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell align="left">Cantidad</TableCell>
                                        <TableCell align="left">Precio</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {productNames[item.product] || `Producto ${item.product}`}
                                            </TableCell>
                                            <TableCell align="left">{item.quantity}</TableCell>
                                            <TableCell align="left">{item.price_at_purchase}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        contact_number: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        order_date: PropTypes.string.isRequired,
        total_price: PropTypes.number.isRequired,
    }).isRequired,
    history: PropTypes.array.isRequired,
    productNames: PropTypes.object.isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
};

export default function OrdersItems() {
    const [rows, setRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [historyData, setHistoryData] = useState({});
    const [productNames, setProductNames] = useState({});

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
                    return;
                }

                const [ordersResponse, productsResponse] = await Promise.all([
                    axios.get('https://emporio-milahuen.onrender.com/api/ordenes/', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }),
                    axios.get('https://emporio-milahuen.onrender.com/api/productos/', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }),
                ]);

                const ordersData = ordersResponse.data;
                const productsData = productsResponse.data;

                const productNamesMap = productsData.reduce((acc, product) => {
                    acc[product.id] = product.name;
                    return acc;
                }, {});

                const historyPromises = ordersData.map(async (order) => {
                    const historyResponse = await axios.get(`https://emporio-milahuen.onrender.com/api/orden_items/order/${order.id}/`);
                    return { orderId: order.id, history: historyResponse.data };
                });

                const historyResponses = await Promise.all(historyPromises);

                const historyMap = historyResponses.reduce((acc, { orderId, history }) => {
                    acc[orderId] = history;
                    return acc;
                }, {});

                setRows(ordersData);
                setHistoryData(historyMap);
                setProductNames(productNamesMap);
                setErrorMessage('');
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setErrorMessage('Error al cargar la lista de productos.');
            }
        };

        fetchOrdersAndProducts();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
                return;
            }

            await axios.patch(`https://emporio-milahuen.onrender.com/api/ordenes/${orderId}/`, { status: newStatus }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === orderId ? { ...row, status: newStatus } : row
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado de la orden:', error);
            setErrorMessage('Error al actualizar el estado de la orden.');
        }
    };

    return (
        <Box>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead className="table-head">
                        <TableRow>
                            <TableCell />
                            <TableCell className='tablecell'>Nombre</TableCell>
                            <TableCell align="left">Fecha de Orden</TableCell>
                            <TableCell align="left">Estado</TableCell>
                            <TableCell align="left">Precio Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row
                                key={row.id}
                                row={row}
                                history={historyData[row.id] || []}
                                productNames={productNames}
                                isSecondRow={index % 2 !== 0}
                                onUpdateStatus={updateOrderStatus}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}