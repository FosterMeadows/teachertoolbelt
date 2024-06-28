import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import { firestore } from '../firebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import './LessonPlanner.css';

const addLessonEntry = async (day, entry) => {
  try {
    const docRef = doc(firestore, 'lesson_planner', day);
    await setDoc(docRef, entry, { merge: true });
    console.log('Lesson entry added successfully');
  } catch (error) {
    console.error('Error adding lesson entry: ', error);
  }
};

const LessonPlanner = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [entries, setEntries] = useState({});
  const [newEntries, setNewEntries] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        title: '',
        standards: '',
        objective: '',
        prep: '',
        plan: '',
        reflection: ''
      };
      return acc;
    }, {})
  );
  const [isEditing, setIsEditing] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = true; // Start in edit mode
      return acc;
    }, {})
  );

  const fetchEntries = async (day) => {
    const docRef = doc(firestore, 'lesson_planner', day.toLowerCase());
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
    }
  };

  useEffect(() => {
    daysOfWeek.forEach(day => {
      fetchEntries(day);
    });
  }, []);

  const handleInputChange = (day, e) => {
    setNewEntries({
      ...newEntries,
      [day]: { ...newEntries[day], [e.target.name]: e.target.value }
    });
  };

  const handleSaveEntry = async (day) => {
    const newEntry = newEntries[day];
    await addLessonEntry(day.toLowerCase(), newEntry);
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

  return (
    <div className="lesson-planner-container">
      <Grid container spacing={2}>
        {daysOfWeek.map(day => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={day}>
            <Card className="day-card">
              <CardContent>
                <Typography variant="h6">{day}</Typography>
                {isEditing[day] ? (
                  <div>
                    <TextField
                      name="title"
                      label="Title"
                      value={newEntries[day].title}
                      onChange={(e) => handleInputChange(day, e)}
                      fullWidth
                    />
                    <TextField
                      name="standards"
                      label="Standards"
                      value={newEntries[day].standards}
                      onChange={(e) => handleInputChange(day, e)}
                      fullWidth
                    />
                    <TextField
                      name="objective"
                      label="Objective"
                      value={newEntries[day].objective}
                      onChange={(e) => handleInputChange(day, e)}
                      fullWidth
                    />
                    <TextField
                      name="prep"
                      label="Prep"
                      value={newEntries[day].prep}
                      onChange={(e) => handleInputChange(day, e)}
                      fullWidth
                    />
                    <TextField
                      name="plan"
                      label="Plan"
                      value={newEntries[day].plan}
                      onChange={(e) => handleInputChange(day, e)}
                      fullWidth
                    />
                    <TextField
                      name="reflection"
                      label="Reflection"
                      value={newEntries[day].reflection}
                      onChange={(e) => handleInputChange(day, e)}
                      fullWidth
                    />
                    <Button onClick={() => handleSaveEntry(day)}>Save</Button>
                  </div>
                ) : (
                  <div onClick={() => handleEditEntry(day)}>
                    <Typography variant="h5">{entries[day]?.title}</Typography>
                    <Typography>Standards: {entries[day]?.standards}</Typography>
                    <Typography>Objective: {entries[day]?.objective}</Typography>
                    <Typography>Prep: {entries[day]?.prep}</Typography>
                    <Typography>Plan: {entries[day]?.plan}</Typography>
                    <Typography>Reflection: {entries[day]?.reflection}</Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LessonPlanner;
