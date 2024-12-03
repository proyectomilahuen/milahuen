import React from 'react';
import '../styles/ReuseView.css';
import CollapsibleTableProov from '../components/CollapsibleTableProov';
import { Link } from 'react-router-dom';

function ListaProovView() {
  return (
    <div >
      <Link to="/inventario" className="no-underline">
        <h2 className="inventory-view__title">Lista de proveedores</h2>
        </Link>
        <CollapsibleTableProov />
    </div>
  );
}

export default ListaProovView;