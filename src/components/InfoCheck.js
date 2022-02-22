import logo from "../logo.png";
import "./InfoCheck.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function InfoCheck(props) {
  // States
  const [isCampusSelected, setCampusSelected] = useState(false);
  const [isDegreeSelected, setDegreeSelected] = useState(false);
  const [isMajorSelected, setMajorSelected] = useState(false);
  const [campusData, setCampusData] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [majorData, setMajorData] = useState([]);
  const [yearData, setYearData] = useState([]);


  async function getData() {
    try {
      const response__campus = await axios.get('http://localhost:5000/api/campus');
      const campusObj = response__campus.data.result;
      const campusAry = campusObj.map(obj => obj.Campus_Name)
      setCampusData(campusAry);

      const response__degree = await axios.get('http://localhost:5000/api/degree');
      const degreeObj = response__degree.data.result;
      const degreeAry = degreeObj.map(obj => obj.Degree_Name)
      setDegreeData(degreeAry);

      const majorAry = majorObj.map(obj => obj.Major_Name)
      setMajorData(majorAry);

      const yearAry = yearObj.map(obj => obj.Year)
      setYearData(yearAry);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onClick = (e) => {
    if (!props.getCampusValue || !props.getDegreeValue || !props.getMajorValue || !props.getYearValue) {
      e.preventDefault();
      alert("Please select all items!");
    }
  };

  // Add select list when an option is selected.
  const handleCampusChange = (e) => {
    props.setCampusValue(e.target.value);

    if (!isCampusSelected)
      setCampusSelected(true);
  };

  const handleDegreeChange = (e) => {
    props.setDegreeValue(e.target.value);

    if (!isDegreeSelected)
      setDegreeSelected(true);
  };

  const handleMajorChange = (e) => {
    props.setMajorValue(e.target.value);

    if (!isMajorSelected)
      setMajorSelected(true);
  };

  const handleYearChange = (e) => {
    props.setYearValue(e.target.value);
  };

  return (
    <div className="InfoCheck">
      <img src={logo} className="logo" alt="logo" />
      <SelectInfo
        key="selectCampus"
        setCampusValue={props.setCampusValue}
        handleChange={(e) => handleCampusChange(e)}
        title="Which Campus Are You Studying At?"
        defaultOption="Select Your Campus"
        data={campusData}
      />
      {isCampusSelected && (
        <>
          <SelectInfo
            key="selectDegree"
            setDegreeValue={props.setDegreeValue}
            handleChange={(e) => handleDegreeChange(e)}
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
            handleChange={(e) => handleMajorChange(e)}
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
            handleChange={(e) => handleYearChange(e)}
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
        onChange={(e) => props.handleChange(e)}
      >
        <option value={""}>{props.defaultOption}</option>
        {props.data.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}

//---------Test Data--------------------------------------------------

const majorObj = [
  {
    Major_Id: 1,
    Major_Name: "Systems Development",
  },
  {
    Major_Id: 2,
    Major_Name: "Business Technology",
  },
];

const yearObj = [
  {
    Year: "2017",
  },
  {
    Year: "2018",
  },
  {
    Year: "2019",
  },
  {
    Year: "2020",
  },
  {
    Year: "2021",
  },
  {
    Year: "2022",
  },
];

export default InfoCheck;
