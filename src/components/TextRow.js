// src/components/TextRow.js
import React from 'react';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TextRow = ({ id, text, onDelete, onTextChange }) => {
  const handleChange = (event) => {
    onTextChange(id, event.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <TextField
        value={text}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{ fontFamily: 'Arial', fontSize: '16px' }}
      />
      <IconButton onClick={() => onDelete(id)} color="secondary" style={{ marginLeft: '10px' }}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TextRow;
