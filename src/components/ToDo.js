import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { firestore } from '../firebaseConfig'; // Ensure the correct path
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import './ToDo.css'; // Import the CSS file

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Load tasks from Firestore on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(firestore, 'tasks');
      const tasksQuery = query(tasksCollection, orderBy('timestamp', 'desc'));
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      const newTask = { text: task, completed: false, timestamp: new Date() };
      const docRef = await addDoc(collection(firestore, 'tasks'), newTask);
      setTasks([{ id: docRef.id, ...newTask }, ...tasks]); // Add new task at the top
      setTask('');
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(firestore, 'tasks', id));
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleTask = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    await updateDoc(doc(firestore, 'tasks', id), { completed: updatedTask.completed });
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '20px' }}>
        To-Do List
      </Typography>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          label="New Task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ marginRight: '10px', width: '400px', height: '56px' }}
          autoComplete="off"
          InputProps={{
            style: {
              height: '56px'
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTask} style={{ height: '56px' }}>
          Add Task
        </Button>
      </div>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} className="task-item">
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <ListItemText
              primary={task.text}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ToDo;
