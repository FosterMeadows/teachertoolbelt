import React from 'react';
import { Typography, Chip, Box, Tooltip } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const SavedCard = ({ currentDay, entry, handleEditEntry }) => {
  const standards = entry?.standards || [];

  return (
    <div onClick={() => handleEditEntry(currentDay)}>
      {/* Standards Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center vertically
          marginBottom: '4px',
          minHeight: '100px', // Adjust height as needed
        }}
      >
        <Typography variant="subtitle1" className="header">
          Standards
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center', // Center items vertically within the row
            marginTop: '10px',
          }}
        >
          {standards.map((standard) => (
            <Box key={standard.id} sx={{ margin: '5px' }}>
              <Tooltip
                title={
                  <Typography
                    sx={{ fontSize: '1rem', textAlign: 'left' }} // Align text to the left
                  >
                    {standard.number}: {standard.text}
                  </Typography>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      maxWidth: '600px', // Increase the max-width
                      fontSize: '1rem', // Increase the font size
                    },
                  },
                }}
                placement="top-start" // Align tooltip to the left edge
              >
                <Chip
                  label={standard.number}
                  color="primary"
                  variant="outlined"
                  sx={{ cursor: 'pointer' }} // Change cursor to pointer
                />
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Prep */}
      <Typography variant="subtitle1" className="header" gutterBottom>
        Prep
      </Typography>
      <ReactQuill
        value={entry?.prep || ''}
        readOnly={true}
        theme="bubble"
        modules={{ toolbar: false }}
        style={{ marginBottom: '10px' }}
      />
      {/* ELA Plan */}
      <Typography variant="subtitle1" className="header" gutterBottom>
        ELA Plan
      </Typography>
      <ReactQuill
        value={entry?.elaplan || ''}
        readOnly={true}
        theme="bubble"
        modules={{ toolbar: false }}
        style={{ marginBottom: '10px' }}
      />
      {/* Writing is Pog Plan */}
      <Typography variant="subtitle1" className="header" gutterBottom>
        Writing is Pog Plan
      </Typography>
      <ReactQuill
        value={entry?.writingispogplan || ''}
        readOnly={true}
        theme="bubble"
        modules={{ toolbar: false }}
        style={{ marginBottom: '10px' }}
      />
      {/* CORE */}
      <Typography variant="subtitle1" className="header" gutterBottom>
        CORE
      </Typography>
      <ReactQuill
        value={entry?.core || ''}
        readOnly={true}
        theme="bubble"
        modules={{ toolbar: false }}
        style={{ marginBottom: '10px' }}
      />
    </div>
  );
};

export default SavedCard;
