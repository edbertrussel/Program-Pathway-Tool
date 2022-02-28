<<<<<<< HEAD
import InfoCheck from './components/InfoCheck.js'
import UserMain from './components/UserMain.js';
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
=======
import InfoCheck from "./components/InfoCheck.js";
import Notification from "./components/Notification.js";
import UserMain from "./components/UserMain.js";
import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./components/Admin/Page/AdminHome.js";
import { AdminContextProvider } from "./components/Context/AdminContext.js";
>>>>>>> 8338b20176dfc8d039bebcc90950f6dc5c05dcd0

function App() {
  // States
  const [campusValue, setCampusValue] = useState("");
  const [degreeValue, setDegreeValue] = useState("");
  const [majorValue, setMajorValue] = useState("");
  const [yearValue, setYearValue] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <InfoCheck
              setCampusValue={setCampusValue}
              setDegreeValue={setDegreeValue}
              setYearValue={setYearValue}
              setMajorValue={setMajorValue}
              getCampusValue={campusValue}
              getDegreeValue={degreeValue}
              getMajorValue={majorValue}
              getYearValue={yearValue}
            />
          }
        />
        <Route path="/notification" element={<Notification />} />
        <Route
<<<<<<< HEAD
          path='/usermain'
=======
          path="/usermain"
>>>>>>> 8338b20176dfc8d039bebcc90950f6dc5c05dcd0
          element={
            <UserMain
              getCampusValue={campusValue}
              getDegreeValue={degreeValue}
              getMajorValue={majorValue}
              getYearValue={yearValue}
            />
          }
        />
        <Route
          path="/admin/home"
          element={
            <AdminContextProvider>
              <AdminHome />
            </AdminContextProvider>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
