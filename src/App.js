import InfoCheck from './components/InfoCheck.js'
import Notification from './components/Notification.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  // States
  const [campusValue, setCampusValue] = useState("null");
  const [degreeValue, setDegreeValue] = useState("null");
  const [yearValue, setYearValue] = useState("null");

  // To check State value
  useEffect(() => {
    console.log(campusValue);
    console.log(degreeValue);
    console.log(yearValue);
  })

  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={
            <InfoCheck
              setCampusValue={setCampusValue}
              setDegreeValue={setDegreeValue}
              setYearValue={setYearValue}
              getCampusValue={campusValue}
              getDegreeValue={degreeValue}
              getYearValue={yearValue}
            />} />
        <Route
          path='/notification'
          element={
            <Notification />
          } />
        <Route path='/' />
      </Routes>
    </div>
  );
}

export default App;
