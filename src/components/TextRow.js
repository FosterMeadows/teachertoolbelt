import React, { useState, useRef, useEffect } from 'react';
import { TextField, IconButton, Slider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './TextRow.css';

const TextRow = ({ id, text, onDelete, onTextChange }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [textWidth, setTextWidth] = useState(0);
  const [textSize, setTextSize] = useState(16);
  const inputRef = useRef(null);

  const adjustTextWidth = () => {
    if (inputRef.current) {
      const width = inputRef.current.scrollWidth;
      setTextWidth(width);
    }
  };

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  useEffect(() => {
    adjustTextWidth();
  }, [currentText, adjustTextWidth]);

  useEffect(() => {
    adjustTextWidth();
  }, [adjustTextWidth]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setCurrentText(newText);
    onTextChange(id, newText);
  };

  const handleTextClick = () => {
    setIsEditable(true);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsEditable(false);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setTextSize(newValue);
  };

  return (
    <div className={`text-row-container ${isEditable ? 'editable' : 'display'}`} onBlur={handleBlur} style={{ fontSize: textSize }}>
      {isEditable ? (
        <>
          <TextField
            inputRef={inputRef}
            value={currentText}
            onChange={handleTextChange}
            autoFocus
            fullWidth
            style={{ minWidth: `${textWidth}px` }}
          />
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <div className="display-text" onClick={handleTextClick} style={{ minWidth: `${textWidth}px` }}>
          {currentText || "Click to edit"}
        </div>
      )}
      <Slider
        value={textSize}
        onChange={handleSliderChange}
        aria-labelledby="text-size-slider"
        min={10}
        max={40}
        step={1}
        style={{ marginLeft: '10px', width: '100px' }}
      />
    </div>
  );
};

export default TextRow;
