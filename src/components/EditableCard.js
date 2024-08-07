import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import StandardsModal from './StandardsModal';

const EditableCard = ({ currentDay, newEntries, handleInputChange, handleSaveEntry }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStandards, setSelectedStandards] = useState(newEntries[currentDay].standards ? newEntries[currentDay].standards.split('\n') : []);

  const handleModalClose = () => {
    setModalOpen(false);
    handleInputChange(currentDay, 'standards', selectedStandards.join('\n'));
  };

  const handleSave = () => {
    handleInputChange(currentDay, 'standards', selectedStandards.join('\n'));
    handleSaveEntry(currentDay);
  };

  return (
    <div>
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        Standards
      </Typography>
      <Button onClick={() => setModalOpen(true)} style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}>
        Choose Standards
      </Button>
      <StandardsModal
        open={modalOpen}
        handleClose={handleModalClose}
        selectedStandards={selectedStandards}
        setSelectedStandards={setSelectedStandards}
      />
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        Prep
      </Typography>
      <ReactQuill
        value={newEntries[currentDay].prep}
        onChange={(value) => handleInputChange(currentDay, 'prep', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        ELA Plan
      </Typography>
      <ReactQuill
        value={newEntries[currentDay].elaplan}
        onChange={(value) => handleInputChange(currentDay, 'elaplan', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        Writing is Pog Plan
      </Typography>
      <ReactQuill
        value={newEntries[currentDay].writingispogplan}
        onChange={(value) => handleInputChange(currentDay, 'writingispogplan', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default EditableCard;
