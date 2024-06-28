// src/components/GradeCalculator.js
import React, { useState } from "react";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxWidth: 600,
  width: '100%',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
}));

function GradeCalculator() {
  const [totalPoints, setTotalPoints] = useState("");
  const [grades, setGrades] = useState([]);

  const handleChange = (event) => {
    setTotalPoints(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (totalPoints) {
      calculateGrades(totalPoints);
    }
  };

  const calculateGrades = (points) => {
    const gradesArray = [];
    for (let i = points; i >= 0; i--) {
      gradesArray.push({ pointsEarned: i, totalPoints: points, percentage: ((i / points) * 100).toFixed(2) });
    }
    setGrades(gradesArray);
  };

  return (
    <Container>
      <h2>Grade Calculator</h2>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Total Points"
          type="number"
          value={totalPoints}
          onChange={handleChange}
          required
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate Grades
        </Button>
      </Form>
      {grades.length > 0 && (
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '33%' }}>Points Earned</TableCell>
                <TableCell style={{ width: '33%' }}>Total Points</TableCell>
                <TableCell style={{ width: '33%' }}>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((grade, index) => (
                <TableRow key={index}>
                  <StyledTableCell>{grade.pointsEarned}</StyledTableCell>
                  <StyledTableCell>{grade.totalPoints}</StyledTableCell>
                  <StyledTableCell>{grade.percentage}%</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </Container>
  );
}

export default GradeCalculator;
