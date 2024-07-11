import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const SavedCard = ({ currentDay, entries, handleEditEntry }) => {
  const standards = entries[currentDay]?.standards ? entries[currentDay].standards.split('\n') : [];

  return (
    <div onClick={() => handleEditEntry(currentDay)}>
      <div className="header" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}>Standards</Typography>
      </div>
      <List>
        {standards.map((standard, index) => (
          <ListItem key={index}>
            <ListItemText primary={standard} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'large' }} />
          </ListItem>
        ))}
      </List>
      <div className="header" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}>Objective</Typography>
      </div>
      <Typography
        dangerouslySetInnerHTML={{ __html: entries[currentDay]?.objective }}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'large' }}
      />
      <div className="header" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}>Prep</Typography>
      </div>
      <Typography
        dangerouslySetInnerHTML={{ __html: entries[currentDay]?.prep }}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'large' }}
      />
      <div className="header" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}>Plan</Typography>
      </div>
      <Typography
        dangerouslySetInnerHTML={{ __html: entries[currentDay]?.plan }}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'large' }}
      />
      <div className="header" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20 }}>Reflection</Typography>
      </div>
      <Typography
        dangerouslySetInnerHTML={{ __html: entries[currentDay]?.reflection }}
        style={{ marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'large' }}
      />
    </div>
  );
};

export default SavedCard;
