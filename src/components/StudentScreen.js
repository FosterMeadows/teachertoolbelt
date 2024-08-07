import React, { useState, useRef, useEffect } from 'react';
// import { Typography, Button, Grid } from '@mui/material'; // Remove Typography if not used
import { Button, Grid } from '@mui/material'; // Keep the other imports if they are used
import Timer from './Timer';
import TextRow from './TextRow';
import { Rnd } from 'react-rnd';
import '../App.css';
import './TextRow.css';

const StudentScreen = () => {
  const [state, setState] = useState('Green');
  const [isFullScreen, setIsFullScreen] = useState(false);
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
  const screenRef = useRef(null);

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
    const newWidth = ref.offsetWidth;
    const newHeight = ref.offsetHeight;
    const scaleFactor = Math.min(newWidth / 500, newHeight / 200);
    setTimerScale(scaleFactor);
    setTimerWidth(newWidth);
    setTimerHeight(newHeight);

    // Ensure the position is adjusted to keep the timer within the desired bounds
    const parentBounds = screenRef.current.getBoundingClientRect();
    const newPosX = Math.min(position.x, parentBounds.width - newWidth - 400); // 20px padding
    const newPosY = Math.min(position.y, parentBounds.height - newHeight - 400); // 20px padding

    setTimerPosition({ x: newPosX, y: newPosY });
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
    const newId = textRows.length > 0 ? textRows[textRows.length - 1].id + 1 : 1;
    setTextRows([...textRows, { id: newId, text: '' }]);
  };

  const handleTextChange = (id, newText) => {
    setTextRows(textRows.map(row => (row.id === id ? { ...row, text: newText } : row)));
  };

  const handleDelete = (id) => {
    setTextRows(textRows.filter(row => row.id !== id));
  };

  const getBackgroundImage = () => {
    switch (state) {
      case 'Green':
        return '/GreenModeBackground.svg';
      case 'Yellow':
        return '/YellowModeBackground.svg';
      case 'Red':
        return '/RedModeBackground.svg';
      default:
        return 'none';
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (screenRef.current.requestFullscreen) {
        screenRef.current.requestFullscreen();
      } else if (screenRef.current.mozRequestFullScreen) { // Firefox
        screenRef.current.mozRequestFullScreen();
      } else if (screenRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        screenRef.current.webkitRequestFullscreen();
      } else if (screenRef.current.msRequestFullscreen) { // IE/Edge
        screenRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div ref={screenRef} className="parent-container" style={{ backgroundImage: `url(${getBackgroundImage()})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100%' }}>
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
        <Grid item>
          <IconButton color="inherit" onClick={toggleFullScreen}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
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
          dragAxis="both"
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
                  onDelete={handleDelete}
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
