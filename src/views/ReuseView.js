import React from 'react';
import ReuseInfo from '../components/ReuseInfo';
import BenefitsSection from '../components/BenefitsSection';
import '../styles/ReuseView.css';

function ReuseView() {
  return (
    <div className="reuse-view reuse-view-image">
      <ReuseInfo />
      <BenefitsSection />
    </div>
  );
}

export default ReuseView;
