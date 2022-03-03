import InfoCheck from "./components/InfoCheck.js";
import UserMain from "./components/UserMain.js";
import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  // States
  const [campusValue, setCampusValue] = useState("");
  const [degreeValue, setDegreeValue] = useState("");
  const [major1Value, setMajor1Value] = useState("");
  const [major2Value, setMajor2Value] = useState("");
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
              setMajor1Value={setMajor1Value}
              setMajor2Value={setMajor2Value}
              getCampusValue={campusValue}
              getDegreeValue={degreeValue}
              getMajor1Value={major1Value}
              getMajor2Value={major2Value}
              getYearValue={yearValue}
            />
          }
        />
        <Route
          path="/usermain"
          element={
            <UserMain
              getCampusValue="SG001"
              getDegreeValue="11497"
              getMajor1Value={major1Value}
              getMajor2Value={major2Value}
              getYearValue="2019"
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
