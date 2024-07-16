// src/components/StudentInstructions.js
import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { findDOMNode } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StudentInstructions = () => {
  const [text, setText] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [scale, setScale] = useState(1);
  const instructionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const instructionsNode = findDOMNode(instructionsRef.current);
      if (instructionsNode && !instructionsNode.contains(event.target)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResize = (e, direction, ref, delta, position) => {
    const scaleFactor = Math.min(ref.offsetWidth / 600, ref.offsetHeight / 400);
    setScale(scaleFactor);
    setWidth(ref.offsetWidth);
    setHeight(ref.offsetHeight);
    setPosition(position);
  };

  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
    setIsSelected(false);
  };

  return (
    <Rnd
      ref={instructionsRef}
      size={{ width, height }}
      position={position}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      style={{
        border: isSelected ? '2px dashed blue' : 'none',
        borderRadius: '16px',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      onClick={() => setIsSelected(true)}
      onDragStop={handleDragStop}
      onResize={handleResize}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: '600px', height: '400px' }}>
        <ReactQuill value={text} onChange={setText} style={{ height: '100%' }} />
      </div>
    </Rnd>
  );
};

export default StudentInstructions;
