import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { firestore } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './LessonPlanner.css';
import EditableCard from './EditableCard';
import SavedCard from './SavedCard';
import { startOfWeek, addWeeks, format, addDays } from 'date-fns';
import { useAuth } from '../AuthProvider';

const MY_EMAIL = 'foster.meadows@gmail.com'; // Replace with your actual email


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const emptyEntry = {
  standards: [],
  prep: '',
  elaplan: '',
  writingispogplan: '',
  core: '', // Added 'core' field
};

const addLessonEntry = async (day, week, entry) => {
  try {
    const docRef = doc(firestore, 'lesson_planner', `${week}_${day}`);
    await setDoc(docRef, entry, { merge: true });
    console.log('Lesson entry added successfully');
  } catch (error) {
    console.error('Error adding lesson entry: ', error);
    throw error;
  }
};



  const LessonPlanner = () => {
    const { user } = useAuth();
    const isOwner = user && user.email === MY_EMAIL;


  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [entries, setEntries] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedWeek = formatWeek(currentWeek);
        const fetchPromises = daysOfWeek.map(async (day) => {
          const docRef = doc(
            firestore,
            'lesson_planner',
            `${formattedWeek}_${day.toLowerCase()}`
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Parse standards if stored as a string
            if (data.standards && typeof data.standards === 'string') {
              const standardsArray = data.standards.split('\n').map((standardText) => {
                const [number, text] = standardText.split(': ', 2);
                return { id: number.trim(), number: number.trim(), text: text.trim() };
              });
              data.standards = standardsArray;
            }
            return { day, data, isEditing: false };
          } else {
            return { day, data: { ...emptyEntry }, isEditing: true };
          }
        });
        const results = await Promise.all(fetchPromises);
        const newEntries = results.reduce(
          (acc, { day, data }) => ({ ...acc, [day]: data }),
          {}
        );
        const newIsEditing = results.reduce(
          (acc, { day }) => ({ ...acc, [day]: isOwner ? false : false }),
          {}
        );
        setEntries(newEntries);
        setIsEditing(newIsEditing);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError('Failed to load entries.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllEntries();
  }, [currentWeek, user]);

  const handleInputChange = (day, name, value) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [day]: {
        ...prevEntries[day],
        [name]: value,
      },
    }));
  };

  const handleSaveEntry = async (day) => {
    const entry = entries[day];
    try {
      // Serialize standards to a string before saving
      const entryToSave = {
        ...entry,
        standards: entry.standards
          .map((standard) => `${standard.number}: ${standard.text}`)
          .join('\n'),
      };
      await addLessonEntry(day.toLowerCase(), formatWeek(currentWeek), entryToSave);
      setIsEditing((prev) => ({ ...prev, [day]: false }));
    } catch (err) {
      console.error('Error saving entry:', err);
      setError('Failed to save entry.');
    }
  };

  const handleEditEntry = (day) => {
    if (isOwner) {
      setIsEditing((prev) => ({ ...prev, [day]: true }));
    }
  };
  

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, 1));
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, -1));
  };

  const dayStyles = {
    Monday: { backgroundColor: '#BBDEFB' },    // Light Blue
    Tuesday: { backgroundColor: '#90CAF9' },   // Lighter Blue
    Wednesday: { backgroundColor: '#64B5F6' }, // Even Lighter Blue
    Thursday: { backgroundColor: '#42A5F5' },  // Soft Blue
    Friday: { backgroundColor: '#2196F3' }     // Material Blue
  };

  if (loading) {
    return (
      <div className="lesson-planner-container">
        <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lesson-planner-container">
        <Typography
          variant="h6"
          style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}
        >
          Error: {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="lesson-planner-container">
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid item xs={2}>
          <Button onClick={handlePrevWeek} className="week-nav-button" fullWidth>
            <Typography
              variant="h6"
              className="week-label"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Previous Week
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '5%' }}>
          <Typography
            variant="h6"
            className="week-label"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              textAlign: 'center',
              fontSize: 'xx-large',
              marginBottom: '20px',
            }}
          >
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
                <Typography
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'xx-large',
                  }}
                >
                  {day} : {formatDay(currentWeek, index)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card className="day-card" style={{ width: '100%' }}>
                  <CardContent>
                    {isEditing[day] ? (
                      <EditableCard
                        currentDay={day}
                        entry={entries[day]}
                        handleInputChange={handleInputChange}
                        handleSaveEntry={handleSaveEntry}
                      />
                    ) : (
                      <SavedCard
  currentDay={day}
  entry={entries[day]}
  handleEditEntry={handleEditEntry}
  user={user} // Pass the user prop
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
            <Typography
              variant="h6"
              className="week-label"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Next Week
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const getCurrentWeek = () => {
  return startOfWeek(new Date(), { weekStartsOn: 1 }); // Week starts on Monday
};

const formatWeek = (date) => {
  return format(date, 'yyyy-MM-dd'); // Format as 'YYYY-MM-DD'
};

const formatDay = (startOfWeek, dayIndex) => {
  const date = addDays(startOfWeek, dayIndex);
  return format(date, 'MMM dd');
};

export default LessonPlanner;
