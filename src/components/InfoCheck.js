import logo from "../logo.png";
import "./InfoCheck.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function InfoCheck(props) {
  // States
  const [isCampusSelected, setCampusSelected] = useState(false);

  const onClick = (e) => {
    if (!props.getCampusValue || !props.getDegreeValue || !props.getYearValue) {
      e.preventDefault();
      alert("Please select all items!");
    }
  };

  // Add two more select list when an option is selected.
  const handleChange = () => {
    // Once the SelcetInfo elements have been added, no more elements are added.
    if (!isCampusSelected)
      setCampusSelected(true);
  };

  return (
    <div className="InfoCheck">
      <img src={logo} className="logo" alt="logo" />
      <SelectInfo
        key="selectCampus"
        setCampusValue={props.setCampusValue}
        handleChange={handleChange}
        title="Which Campus Are You Studying At?"
        defaultOption="Select Your Campus"
        data={campusData}
      />
      {isCampusSelected && (
        <>
          <SelectInfo
            key="selectDegree"
            setDegreeValue={props.setDegreeValue}
            handleChange={handleChange}
            title="Which degree are you learning?"
            defaultOption="Select Your Degree"
            data={degreeData}
          />
          <SelectInfo
            key="selectYear"
            setYearValue={props.setYearValue}
            handleChange={handleChange}
            title="From which year do you start learning?"
            defaultOption="Select When You Start"
            data={yearData}
          />

          <Link
            key="link__confirm"
            className="link__confirm"
            onClick={(e) => onClick(e)}
            to="/notification"
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
          } else if (props.data === degreeData)
            props.setDegreeValue(event.target.value);
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
