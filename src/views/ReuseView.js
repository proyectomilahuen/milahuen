import React from 'react';
import ReuseInfo from '../components/ReuseInfo';
import BenefitsSection from '../components/BenefitsSection';
import  FloatingButton from '../components/FloatingButton' ;
import Carousel2 from '../components/Carousel2';
import data from "../data/carouselData.json";
import '../styles/ReuseView.css';

function ReuseView() {

  const slides = data.slides;
  return (
    <div >
      <FloatingButton />
      <Carousel2 data={slides} />
    </div>
  );
}

export default ReuseView;
