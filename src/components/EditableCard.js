import React, { useRef, useState } from 'react';
import { Typography, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import StandardsModal from './StandardsModal'; // Ensure the correct path

const EditableCard = ({ currentDay, newEntries, handleInputChange, handleSaveEntry }) => {
  const objectiveRef = useRef(null);
  const prepRef = useRef(null);
  const planRef = useRef(null);
  const reflectionRef = useRef(null);

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
        Objective
      </Typography>
      <ReactQuill
        ref={objectiveRef}
        value={newEntries[currentDay].objective}
        onChange={(value) => handleInputChange(currentDay, 'objective', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        Prep
      </Typography>
      <ReactQuill
        ref={prepRef}
        value={newEntries[currentDay].prep}
        onChange={(value) => handleInputChange(currentDay, 'prep', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        Plan
      </Typography>
      <ReactQuill
        ref={planRef}
        value={newEntries[currentDay].plan}
        onChange={(value) => handleInputChange(currentDay, 'plan', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }} variant="subtitle1" className="header" gutterBottom>
        Reflection
      </Typography>
      <ReactQuill
        ref={reflectionRef}
        value={newEntries[currentDay].reflection}
        onChange={(value) => handleInputChange(currentDay, 'reflection', value)}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default EditableCard;
