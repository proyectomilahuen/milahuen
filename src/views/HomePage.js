import React from 'react';
import ReuseView from './ReuseView';
import ProductView from './ProductView';
import  FloatingButton from '../components/FloatingButton' ;
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">

      <section className="home-page__sustainability">
        <ReuseView />
      </section>

      <section className="home-page__products">
        <ProductView />
        <FloatingButton />
      </section>
    </div>
  );
}

export default HomePage;