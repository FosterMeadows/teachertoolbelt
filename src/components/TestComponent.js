import React from 'react';
import './App.css';

const TestComponent = () => {
  return (
    <div className="test-container" style={{ backgroundImage: 'url(/Green Mode Background.svg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100%' }}>
      Test Background
    </div>
  );
};

export default TestComponent;
