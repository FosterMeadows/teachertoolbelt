import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Autocomplete } from '@mui/material';
import standards from '../data/standards.json'; // Ensure the correct path

const EditableCard = ({ currentDay, entry, handleInputChange, handleSaveEntry }) => {
  const [selectedStandards, setSelectedStandards] = useState([]);

  useEffect(() => {
    // Initialize selectedStandards from entry.standards
    if (entry.standards && Array.isArray(entry.standards)) {
      setSelectedStandards(entry.standards);
    } else if (entry.standards && typeof entry.standards === 'string') {
      // If standards are stored as a newline-separated string
      const standardsArray = entry.standards.split('\n').map((standardText) => {
        const [number, text] = standardText.split(': ', 2);
        return { id: number.trim(), number: number.trim(), text: text.trim() };
      });
      setSelectedStandards(standardsArray);
    }
  }, [entry.standards]);

  const handleStandardsChange = (event, newValue) => {
    setSelectedStandards(newValue);
    handleInputChange(currentDay, 'standards', newValue);
  };

  const handleSave = () => {
    handleSaveEntry(currentDay);
  };

  return (
    <div>
      {/* Standards */}
      <Typography
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}
        variant="subtitle1"
        className="header"
        gutterBottom
      >
        Standards
      </Typography>
      <Autocomplete
        multiple
        options={standards}
        getOptionLabel={(option) => `${option.number}: ${option.text}`}
        value={selectedStandards}
        onChange={handleStandardsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Standards"
            placeholder="Choose standards"
            style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
          />
        )}
      />
      {/* Prep */}
      <Typography
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}
        variant="subtitle1"
        className="header"
        gutterBottom
      >
        Prep
      </Typography>
      <ReactQuill
        value={entry.prep}
        onChange={(value) => handleInputChange(currentDay, 'prep', value)}
        style={{
          marginBottom: '20px',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      />
      {/* ELA Plan */}
      <Typography
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}
        variant="subtitle1"
        className="header"
        gutterBottom
      >
        ELA Plan
      </Typography>
      <ReactQuill
        value={entry.elaplan}
        onChange={(value) => handleInputChange(currentDay, 'elaplan', value)}
        style={{
          marginBottom: '20px',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      />
      {/* Writing is Pog Plan */}
      <Typography
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}
        variant="subtitle1"
        className="header"
        gutterBottom
      >
        Writing is Pog Plan
      </Typography>
      <ReactQuill
        value={entry.writingispogplan}
        onChange={(value) => handleInputChange(currentDay, 'writingispogplan', value)}
        style={{
          marginBottom: '20px',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      />
      {/* CORE */}
      <Typography
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}
        variant="subtitle1"
        className="header"
        gutterBottom
      >
        CORE
      </Typography>
      <ReactQuill
        value={entry.core}
        onChange={(value) => handleInputChange(currentDay, 'core', value)}
        style={{
          marginBottom: '20px',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default EditableCard;
