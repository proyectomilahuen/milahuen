import React from 'react';
import InventoryCard from '../components/InventoryCard';


function InventoryView() {

    const products = [
        { id: 1, image: '/images/lista_prod.png', name: 'Productos' },
        { id: 2, image: '/images/lista_prov.png', name: 'Lista de Proveedores' },
        { id: 3, image: '/images/informe.png', name: 'Informe'},
        { id: 4, image: '/images/add_prov.png', name: 'Agregar Proveedor'},
        { id: 5, image: '/images/add.png', name: 'Agregar Stock'},
        { id: 6, image: '/images/remove.png', name: 'Eliminar Stock'},
        { id: 7, image: '/images/caution.png', name: 'Editar Stock'},
    ];

    return (
        
        <div>
           
            <h2 className="inventory-view__title">Stock e Inventario</h2>
            <div className="inventory-view__grid">
                {products.map((product) => (
                    <InventoryCard
                        key={product.id}
                        image={product.image}
                        name={product.name}
                    />
                ))}
            </div></div>

    );
}

export default InventoryView;

