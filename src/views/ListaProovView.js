import React from 'react';
import '../styles/ReuseView.css';
import CollapsibleTable from '../components/CollapsibleTable';
import { Link } from 'react-router-dom';

function ListaProovView() {
  return (
    <div >
      <Link to="/inventario" className="no-underline">
        <h2 className="inventory-view__title">Lista de proovedores</h2>
        </Link>
        <CollapsibleTable />
    </div>
  );
}

export default ListaProovView;