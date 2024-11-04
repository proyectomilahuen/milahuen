import React from 'react';
import Lottie from 'lottie-react';
import waterAnimation from '../animations/water-fill.json';

function WaterAnimation() {
  return (
    <div className="water-animation">
      <Lottie animationData={waterAnimation} loop={true} />
    </div>
  );
}

export default WaterAnimation;