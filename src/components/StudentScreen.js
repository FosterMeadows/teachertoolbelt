import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import Timer from './Timer';
import { Rnd } from 'react-rnd';
import { findDOMNode } from 'react-dom';

const StudentScreen = () => {
  const [state, setState] = useState('Green');
  const [isSelected, setIsSelected] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 50 });
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(200);
  const [scale, setScale] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const timerNode = findDOMNode(timerRef.current);
      if (timerNode && !timerNode.contains(event.target)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResize = (e, direction, ref, delta, position) => {
    const scaleFactor = Math.min(ref.offsetWidth / 500, ref.offsetHeight / 200);
    setScale(scaleFactor);
    setWidth(ref.offsetWidth);
    setHeight(ref.offsetHeight);
    setPosition(position);
  };

  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
    setIsSelected(false);
  };

  const renderContent = () => {
    return (
      <>
        <Typography variant="h5" style={{ color: state === 'Green' ? 'green' : state === 'Yellow' ? 'yellow' : 'red' }}>
          {state === 'Green' ? 'Green: Social Working' : state === 'Yellow' ? 'Yellow: Chatty Work' : 'Red: Quiet, Focused'}
        </Typography>
        <Rnd
          ref={timerRef}
          size={{ width, height }}
          position={position}
          minWidth={500}
          minHeight={200}
          bounds="parent"
          style={{
            border: isSelected ? '2px dashed blue' : 'none',
            borderRadius: '16px',
            padding: '20px 530px 220px 5px', // top, right, bottom, left
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
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: '500px', height: '200px' }}>
            <Timer />
          </div>
        </Rnd>
      </>
    );
  };

  return (
    <div style={{ padding: '20px', height: '100vh', position: 'relative' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Student Screen</Typography>
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item>
          <Button
            variant={state === 'Green' ? 'contained' : 'outlined'}
            color="success"
            onClick={() => setState('Green')}
          >
            Green
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={state === 'Yellow' ? 'contained' : 'outlined'}
            color="warning"
            onClick={() => setState('Yellow')}
          >
            Yellow
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={state === 'Red' ? 'contained' : 'outlined'}
            color="error"
            onClick={() => setState('Red')}
          >
            Red
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: '20px', position: 'relative', height: '100%' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentScreen;
