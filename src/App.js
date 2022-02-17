import InfoCheck from './components/InfoCheck.js'
import Notification from './components/Notification.js';
import UserMain from './components/UserMain.js';
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  // States
  const [campusValue, setCampusValue] = useState("");
  const [degreeValue, setDegreeValue] = useState("");
  const [yearValue, setYearValue] = useState("");

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
        <Route
          path='/usermain'
          element={
            <UserMain
              getCampusValue={campusValue}
              getDegreeValue={degreeValue}
              getYearValue={yearValue}
            />
          } />
      </Routes>
    </div>
  );
}

export default App;
