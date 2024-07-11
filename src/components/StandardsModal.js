import React from 'react';
import { Modal, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import standards from '../data/standards.json'; // Ensure the correct path

const StandardsModal = ({ open, handleClose, selectedStandards, setSelectedStandards }) => {
  const handleCheckboxChange = (event, standard) => {
    const standardText = `${standard.number}: ${standard.text}`;
    if (event.target.checked) {
      setSelectedStandards([...selectedStandards, standardText]);
    } else {
      setSelectedStandards(selectedStandards.filter(s => s !== standardText));
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '20px' }}>
          Select Standards
        </Typography>
        <Box sx={{ overflowY: 'scroll', flexGrow: 1 }}>
          {standards.map((standard, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <FormControlLabel
                control={<Checkbox checked={selectedStandards.includes(`${standard.number}: ${standard.text}`)} onChange={(e) => handleCheckboxChange(e, standard)} />}
                label={`${standard.number}: ${standard.text}`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              />
            </div>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleClose}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
};

export default StandardsModal;
