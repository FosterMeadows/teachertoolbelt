import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, Slider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TextRow = ({ id, text, onDelete, onTextChange }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [textSize, setTextSize] = useState(16); // Default text size
  const [textWidth, setTextWidth] = useState(300); // Default width
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
      adjustTextWidth(currentText);
    }
  }, [isEditable]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setCurrentText(newText);
    onTextChange(id, newText);
    adjustTextWidth(newText);
  };

  const handleTextClick = () => {
    setIsEditable(true);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsEditable(false);
    }
  };

  const handleTextSizeChange = (event, newSize) => {
    event.stopPropagation();
    setTextSize(newSize);
    adjustTextWidth(currentText, newSize);
  };

  const adjustTextWidth = (text, size = textSize) => {
    if (inputRef.current) {
      const context = document.createElement('canvas').getContext('2d');
      context.font = `${size}px ${getComputedStyle(inputRef.current).fontFamily}`;
      const textMetrics = context.measureText(text);
      setTextWidth(textMetrics.width + 50); // Add some padding
    }
  };

  useEffect(() => {
    adjustTextWidth(currentText);
  }, [currentText, textSize]);

  return (
    <div className={`text-row-container ${isEditable ? 'editable' : 'display'}`} onBlur={handleBlur}>
      {isEditable ? (
        <TextField
          inputRef={inputRef}
          value={currentText}
          onChange={handleTextChange}
          autoFocus
          multiline
          style={{ fontSize: `${textSize}px`, width: `${textWidth}px`, whiteSpace: 'nowrap' }}
          inputProps={{ style: { overflowX: 'auto' } }}
        />
      ) : (
        <div className="display-text" onClick={handleTextClick} style={{ fontSize: `${textSize}px`, width: '100%' }}>
          {currentText || "Click to edit"}
        </div>
      )}
      {isEditable && (
        <>
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
          <Slider
            value={textSize}
            onChange={handleTextSizeChange}
            aria-labelledby="text-size-slider"
            min={8}
            max={40}
            style={{ marginLeft: 10, width: 100 }}
          />
        </>
      )}
    </div>
  );
};

export default TextRow;
