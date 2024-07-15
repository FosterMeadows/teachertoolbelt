// src/components/StudentScreen.js
import React, { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import Timer from './Timer';
import { Rnd } from 'react-rnd';

const StudentScreen = () => {
  const [state, setState] = useState('Green');
  const [isSelected, setIsSelected] = useState(false);
  const [scale, setScale] = useState(1);

  const handleResize = (e, direction, ref, delta, position) => {
    const scaleFactor = Math.min(ref.offsetWidth / 320, ref.offsetHeight / 200);
    setScale(scaleFactor);
  };

  const renderContent = () => {
    switch (state) {
      case 'Green':
        return (
          <>
            <Typography variant="h5" style={{ color: 'green' }}>Green: Social Working</Typography>
            <Rnd
              default={{
                x: 150,
                y: 50,
                width: 320,
                height: 200,
              }}
              minWidth={150}
              minHeight={100}
              bounds="parent"
              style={{ border: isSelected ? '1px solid blue' : 'none' }}
              onClick={() => setIsSelected(true)}
              onDragStop={() => setIsSelected(false)}
              onResize={handleResize}
            >
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Timer />
              </div>
            </Rnd>
          </>
        );
      case 'Yellow':
        return (
          <>
            <Typography variant="h5" style={{ color: 'yellow' }}>Yellow: Chatty Work</Typography>
            <Rnd
              default={{
                x: 150,
                y: 50,
                width: 320,
                height: 200,
              }}
              minWidth={150}
              minHeight={100}
              bounds="parent"
              style={{ border: isSelected ? '1px solid blue' : 'none' }}
              onClick={() => setIsSelected(true)}
              onDragStop={() => setIsSelected(false)}
              onResize={handleResize}
            >
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Timer />
              </div>
            </Rnd>
          </>
        );
      case 'Red':
        return (
          <>
            <Typography variant="h5" style={{ color: 'red' }}>Red: Quiet, Focused</Typography>
            <Rnd
              default={{
                x: 150,
                y: 50,
                width: 320,
                height: 200,
              }}
              minWidth={150}
              minHeight={100}
              bounds="parent"
              style={{ border: isSelected ? '1px solid blue' : 'none' }}
              onClick={() => setIsSelected(true)}
              onDragStop={() => setIsSelected(false)}
              onResize={handleResize}
            >
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Timer />
              </div>
            </Rnd>
          </>
        );
      default:
        return null;
    }
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
