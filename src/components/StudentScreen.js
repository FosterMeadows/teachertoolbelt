import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import Timer from './Timer';
import TextRow from './TextRow';
import { Rnd } from 'react-rnd';
import '../App.css'; // Ensure this import is here for the styles
import './TextRow.css'; // New import for TextRow styles

const StudentScreen = () => {
  const [state, setState] = useState('Green');
  const [isTimerSelected, setIsTimerSelected] = useState(false);
  const [isInstructionsSelected, setIsInstructionsSelected] = useState(false);
  const [timerPosition, setTimerPosition] = useState({ x: 150, y: 50 });
  const [timerWidth, setTimerWidth] = useState(500);
  const [timerHeight, setTimerHeight] = useState(200);
  const [timerScale, setTimerScale] = useState(1);
  const [textRows, setTextRows] = useState([]);
  const [instructionsPosition, setInstructionsPosition] = useState({ x: 50, y: 300 });

  const timerRef = useRef(null);
  const instructionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timerRef.current &&
        !timerRef.current.contains(event.target) &&
        instructionsRef.current &&
        !instructionsRef.current.contains(event.target)
      ) {
        setIsTimerSelected(false);
        setIsInstructionsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTimerResize = (e, direction, ref, delta, position) => {
    const scaleFactor = Math.min(ref.offsetWidth / 500, ref.offsetHeight / 200);
    setTimerScale(scaleFactor);
    setTimerWidth(ref.offsetWidth);
    setTimerHeight(ref.offsetHeight);
    setTimerPosition(position);
  };

  const handleTimerDragStop = (e, d) => {
    setTimerPosition({ x: d.x, y: d.y });
    setIsTimerSelected(false);
  };

  const handleInstructionsDragStop = (e, d) => {
    setInstructionsPosition({ x: d.x, y: d.y });
    setIsInstructionsSelected(false);
  };

  const addTextRow = () => {
    const id = textRows.length > 0 ? textRows[textRows.length - 1].id + 1 : 0;
    setTextRows([...textRows, { id, text: '' }]);
  };

  const removeTextRow = (id) => {
    setTextRows(textRows.filter(row => row.id !== id));
  };

  const handleTextChange = (id, newText) => {
    setTextRows(textRows.map(row => (row.id === id ? { ...row, text: newText } : row)));
  };

  return (
    <div className="parent-container">
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

      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <Typography variant="h5" style={{ color: state === 'Green' ? 'green' : state === 'Yellow' ? 'yellow' : 'red' }}>
          {state === 'Green' ? 'Green: Social Working' : state === 'Yellow' ? 'Yellow: Chatty Work' : 'Red: Quiet, Focused'}
        </Typography>

        <Rnd
          ref={(ref) => {
            timerRef.current = ref ? ref.resizableElement.current : null;
          }}
          size={{ width: timerWidth, height: timerHeight }}
          position={timerPosition}
          minWidth={500}
          minHeight={200}
          bounds="parent"
          style={{
            border: isTimerSelected ? '2px dashed blue' : 'none',
            borderRadius: '16px',
            padding: '20px',
            boxSizing: 'border-box'
          }}
          onClick={() => setIsTimerSelected(true)}
          onDragStop={handleTimerDragStop}
          onResize={handleTimerResize}
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
          <div style={{ transform: `scale(${timerScale})`, transformOrigin: 'top left', width: '500px', height: '200px' }}>
            <Timer />
          </div>
        </Rnd>

        <Button
          variant="contained"
          color="primary"
          onClick={addTextRow}
          style={{ margin: '20px 0' }}
        >
          Add Instruction
        </Button>

        <Rnd
          ref={(ref) => {
            instructionsRef.current = ref ? ref.resizableElement.current : null;
          }}
          size={{ width: 'auto', height: 'auto' }}
          position={instructionsPosition}
          bounds="parent"
          dragAxis="both" // Ensure dragging is allowed both vertically and horizontally
          style={{
            border: isInstructionsSelected ? '2px dashed blue' : 'none',
            borderRadius: '16px',
            padding: '10px',
            boxSizing: 'border-box',
            backgroundColor: 'white'
          }}
          onClick={() => setIsInstructionsSelected(true)}
          onDragStop={handleInstructionsDragStop}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
        >
          <div>
            {textRows.map(row => (
              <div key={row.id} className="text-row-container">
                <TextRow
                  id={row.id}
                  text={row.text}
                  onDelete={removeTextRow}
                  onTextChange={handleTextChange}
                />
              </div>
            ))}
          </div>
        </Rnd>
      </div>
    </div>
  );
};

export default StudentScreen;
