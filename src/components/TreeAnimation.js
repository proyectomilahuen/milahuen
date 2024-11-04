import React from 'react';
import Lottie from 'lottie-react';
import treeAnimation from '../animations/tree.json';

function TreeAnimation() {
  return (
    <div className="tree-animation">
      <Lottie animationData={treeAnimation} loop={true} />
    </div>
  );
}

export default TreeAnimation;
