import React from 'react';
import '../styles/ReuseView.css';
import CollapsibleTable2 from '../components/CollapsibleTable2';
import { Link } from 'react-router-dom';

function ListProductsView() {
  return (
    <div >
            <Link to="/inventario" className="no-underline">
        <h2 className="inventory-view__title">Lista de productos</h2>
        </Link>
        <CollapsibleTable2 />
    </div>
  );
}

export default ListProductsView;