import logo from "../logo.png";
import "./InfoCheck.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function InfoCheck(props) {
  // States
  const [isCampusSelected, setCampusSelected] = useState(false);
  const [isDegreeSelected, setDegreeSelected] = useState(false);
  const [isMajorSelected, setMajorSelected] = useState(false);

  const onClick = (e) => {
    if (!props.getCampusValue || !props.getDegreeValue || !props.getMajorValue || !props.getYearValue) {
      e.preventDefault();
      alert("Please select all items!");
    }
  };

  // Add select list when an option is selected.
  const handleCampusChange = () => {
    if (!isCampusSelected)
      setCampusSelected(true);
  };

  const handleDegreeChange = () => {
    if (!isDegreeSelected)
      setDegreeSelected(true);
  };

  const handleMajorChange = () => {
    if (!isMajorSelected)
      setMajorSelected(true);
  };

  return (
    <div className="InfoCheck">
      <img src={logo} className="logo" alt="logo" />
      <SelectInfo
        key="selectCampus"
        setCampusValue={props.setCampusValue}
        handleChange={handleCampusChange}
        title="Which Campus Are You Studying At?"
        defaultOption="Select Your Campus"
        data={campusData}
      />
      {isCampusSelected && (
        <>
          <SelectInfo
            key="selectDegree"
            setDegreeValue={props.setDegreeValue}
            handleChange={handleDegreeChange}
            title="Which degree are you learning?"
            defaultOption="Select Your Degree"
            data={degreeData}
          />
        </>
      )}
      {isDegreeSelected && (
        <>
          <SelectInfo
            key="selectMajor"
            setYearValue={props.setMajorValue}
            handleChange={handleMajorChange}
            title="Which major are you in?"
            defaultOption="Select Your Major"
            data={majorData}
          />
        </>
      )}
      {isMajorSelected && (
        <>
          <SelectInfo
            key="selectYear"
            setYearValue={props.setYearValue}
            handleChange={handleDegreeChange}
            title="From which year did you start learning?"
            defaultOption="Select When You Start"
            data={yearData}
          />

          <Link
            key="link__confirm"
            className="link__confirm"
            onClick={(e) => onClick(e)}
            to="/usermain"
          >
            Confirm
          </Link>
        </>
      )}
    </div>
  );
}

function SelectInfo(props) {
  return (
    <div className="SelectInfo">
      <p className="askCampus">{props.title}</p>
      <select
        className="selectBar"
        onChange={(event) => {
          if (props.data === campusData) {
            props.setCampusValue(event.target.value);
          }
          else if (props.data === degreeData) {
            props.setDegreeValue(event.target.value);
          }
          else props.setYearValue(event.target.value);

          props.handleChange();
        }}
      >
        <option value={""}>{props.defaultOption}</option>
        {props.data.map((data) => (
          <option key={data.name} value={data.name}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
}

//---------Test Data--------------------------------------------------
const campusData = [
  {
    name: "Singapore",
  },
];

const degreeData = [
  {
    name: "Bachelor of Business",
  },
  {
    name: "Bachelor of Commerce",
  },
  {
    name: "Bachelor of Electrical and Electronic Engineering (Honours)",
  },
  {
    name: "Bachelor of Environmental and Occupational Health and Safety (Singapore)",
  },
  {
    name: "Bachelor of Mechanical Engineering (Honours)",
  },
  {
    name: "Bachelor of Information Technology",
  },
];

const majorData = [
  {
    name: "Systems Development",
  },
  {
    name: "Business Technology",
  },
];

const yearData = [
  {
    name: "2017",
  },
  {
    name: "2018",
  },
  {
    name: "2019",
  },
  {
    name: "2020",
  },
  {
    name: "2021",
  },
  {
    name: "2022",
  },
];

export default InfoCheck;
