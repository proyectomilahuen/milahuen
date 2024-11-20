import React, { useEffect, useState } from 'react';
import InventoryCard from '../components/InventoryCard';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function InventoryView() {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false); // Estado para controlar el acceso

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.username !== "pingeso") {
            navigate('/login'); // Redirige si no está autorizado
        } else {
            setIsAuthorized(true); // Marca como autorizado si cumple la condición
        }
    }, [navigate]);

    if (!isAuthorized) {
        return null; // No renderiza nada hasta que se valide al usuario
    }

    const products = [
        { id: 1, image: '/images/lista_prod.png', name: 'Productos' },
        { id: 2, image: '/images/lista_prov.png', name: 'Lista de Proveedores' },
        { id: 3, image: '/images/informe.png', name: 'Informe' },
        { id: 4, image: '/images/add_prov.png', name: 'Agregar Proveedor' },
        { id: 5, image: '/images/add.png', name: 'Agregar Stock' },
        { id: 6, image: '/images/remove.png', name: 'Eliminar Stock' },
        { id: 7, image: '/images/caution.png', name: 'Editar Producto' },
    ];

    const handleClick = (name) => {
        if (name === 'Lista de Proveedores') {
            navigate('/listaProov');
        }
        if (name === 'Productos') {
            navigate('/listaProduct');
        }
        if (name === 'Editar Producto') {
            navigate('/productForm');
        }
        if (name === 'Agregar Proveedor') {
            navigate('/proveedorForm');
        }
    };

    return (
        <div>
            <Link to="/" className="no-underline">
                <h2 className="inventory-view__title">Stock e Inventario</h2>
            </Link>
            <div className="inventory-view__grid">
                {products.map((product) => (
                    <InventoryCard
                        key={product.id}
                        image={product.image}
                        name={product.name}
                        onClick={() => handleClick(product.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default InventoryView;
