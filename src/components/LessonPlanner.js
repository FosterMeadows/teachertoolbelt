import React, { useState, useEffect, useMemo } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { firestore } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './LessonPlanner.css';
import EditableCard from './EditableCard';
import SavedCard from './SavedCard';

const addLessonEntry = async (day, week, entry) => {
  try {
    const docRef = doc(firestore, 'lesson_planner', `${week}_${day.toLowerCase()}`);
    await setDoc(docRef, entry, { merge: true });
    console.log('Lesson entry added successfully');
  } catch (error) {
    console.error('Error adding lesson entry: ', error);
  }
};

const LessonPlanner = () => {
  const daysOfWeek = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], []);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [entries, setEntries] = useState({});
  const [newEntries, setNewEntries] = useState(initializeNewEntries(daysOfWeek));
  const [isEditing, setIsEditing] = useState(initializeIsEditing(daysOfWeek));

  useEffect(() => {
    daysOfWeek.forEach(day => {
      fetchEntries(day, currentWeek);
    });
  }, [currentWeek, daysOfWeek]);

  const fetchEntries = async (day, week) => {
    const formattedWeek = formatWeek(week);
    const docRef = doc(firestore, 'lesson_planner', `${formattedWeek}_${day.toLowerCase()}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const entryData = docSnap.data();
      setEntries(prevEntries => ({
        ...prevEntries,
        [day]: entryData
      }));
      setNewEntries(prevEntries => ({
        ...prevEntries,
        [day]: entryData
      }));
      setIsEditing(prevEditing => ({
        ...prevEditing,
        [day]: false
      }));
      console.log(`Data found for ${day} in week ${formattedWeek}: `, entryData);
    } else {
      console.log(`No data found for ${day} in week ${formattedWeek}`);
      setEntries(prevEntries => ({
        ...prevEntries,
        [day]: {
          title: '',
          standards: '',
          objective: '',
          prep: '',
          plan: '',
          reflection: ''
        }
      }));
      setNewEntries(prevEntries => ({
        ...prevEntries,
        [day]: {
          title: '',
          standards: '',
          objective: '',
          prep: '',
          plan: '',
          reflection: ''
        }
      }));
      setIsEditing(prevEditing => ({
        ...prevEditing,
        [day]: true
      }));
    }
  };

  const handleInputChange = (day, name, value) => {
    setNewEntries({
      ...newEntries,
      [day]: { ...newEntries[day], [name]: value }
    });
  };

  const handleSaveEntry = async (day) => {
    const newEntry = newEntries[day];
    await addLessonEntry(day.toLowerCase(), formatWeek(currentWeek), newEntry);
    setEntries({
      ...entries,
      [day]: newEntry
    });
    setIsEditing({
      ...isEditing,
      [day]: false
    });
  };

  const handleEditEntry = (day) => {
    setIsEditing({
      ...isEditing,
      [day]: true
    });
  };

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, 1));
    clearEntries();
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, -1));
    clearEntries();
  };

  const clearEntries = () => {
    setEntries({});
    setNewEntries(initializeNewEntries(daysOfWeek));
    setIsEditing(initializeIsEditing(daysOfWeek));
  };

  const dayStyles = {
    Monday: { backgroundColor: '#BBDEFB' },    // Light Blue
    Tuesday: { backgroundColor: '#90CAF9' },   // Lighter Blue
    Wednesday: { backgroundColor: '#64B5F6' }, // Even Lighter Blue
    Thursday: { backgroundColor: '#42A5F5' },  // Soft Blue
    Friday: { backgroundColor: '#2196F3' }     // Material Blue
  };

  return (
    <div className="lesson-planner-container">
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid item xs={2}>
          <Button onClick={handlePrevWeek} className="week-nav-button" fullWidth>
            <Typography variant="h6" className="week-label" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Previous Week
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '5%' }}>
          <Typography variant="h6" className="week-label" style={{ fontFamily: 'Space Grotesk, sans-serif', textAlign: 'center', fontSize: 'xx-large', marginBottom: '20px' }}>
            Week of {formatWeek(currentWeek)}
          </Typography>
          {daysOfWeek.map((day, index) => (
            <Accordion key={day}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`${day}-content`}
                id={`${day}-header`}
                style={dayStyles[day]}
              >
                <Typography style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'xx-large' }}>
                  {day} : {formatDay(currentWeek, index)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card className="day-card" style={{ width: '100%' }}>
                  <CardContent>
                    {isEditing[day] ? (
                      <EditableCard
                        currentDay={day}
                        newEntries={newEntries}
                        handleInputChange={handleInputChange}
                        handleSaveEntry={handleSaveEntry}
                      />
                    ) : (
                      <SavedCard
                        currentDay={day}
                        entries={entries}
                        handleEditEntry={handleEditEntry}
                      />
                    )}
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleNextWeek} className="week-nav-button" fullWidth>
            <Typography variant="h6" className="week-label" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Next Week
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const initializeNewEntries = (daysOfWeek) => {
  return daysOfWeek.reduce((acc, day) => {
    acc[day] = {
      title: '',
      standards: '',
      objective: '',
      prep: '',
      plan: '',
      reflection: ''
    };
    return acc;
  }, {});
};

const initializeIsEditing = (daysOfWeek) => {
  return daysOfWeek.reduce((acc, day) => {
    acc[day] = true; // Start in edit mode
    return acc;
  }, {});
};

const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // Assuming week starts on Monday
  return new Date(currentDate.setDate(startOfWeek));
};

const addWeeks = (date, weeks) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
};

const formatWeek = (date) => {
  return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
};

const formatDay = (startOfWeek, dayIndex) => {
  const date = new Date(startOfWeek);
  date.setDate(date.getDate() + dayIndex);
  const options = { month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default LessonPlanner;
