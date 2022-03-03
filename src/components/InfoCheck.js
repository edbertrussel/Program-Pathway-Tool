import logo from "../logo.png";
import "./InfoCheck.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function InfoCheck(props) {
  // States

  const [campusData, setCampusData] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [majorData, setMajorData] = useState([]);
  const [yearData, setYearData] = useState([]);

  async function getData(url, type) {
    try {
      const response = await axios.get(url);
      let resultList = response.data.result;
      resultList = resultList.map((obj) => ({
        [`${type}Id`]: obj[`${type}_ID`],
        [`${type}Name`]: obj[`${type}_Name`],
      }));
      return resultList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    async function loadCampusList() {
      setCampusData(
        await getData("http://localhost:5000/api/campus", "Campus")
      );
    }
    loadCampusList();
  }, []);

  const onClick = (e) => {
    if (
      !props.getCampusValue ||
      !props.getDegreeValue ||
      !props.getMajor1Value ||
      !props.getYearValue
    ) {
      e.preventDefault();
      alert("Please select all items!");
    }
  };

  // Add select list when an option is selected.
  const handleCampusChange = async (e) => {
    props.setCampusValue(e.target.value);
    console.log(e.target.value);

    setDegreeData(
      await getData(
        `http://localhost:5000/api/campus/${e.target.value}/degree`,
        "Degree"
      )
    );
  };

  const handleDegreeChange = (e) => {
    props.setDegreeValue(e.target.value);

    setMajorData(majorObj);
  };

  const handleMajor1Change = (e) => {
    props.setMajor1Value(e.target.value);

    setYearData(yearObj);
  };
  const handleMajor2Change = (e) => {
    props.setMajor2Value(e.target.value);
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
        type="Campus"
      />
      {degreeData.length !== 0 && (
        <>
          <SelectInfo
            key="selectDegree"
            setDegreeValue={props.setDegreeValue}
            handleChange={(e) => handleDegreeChange(e)}
            title="Which degree are you learning?"
            defaultOption="Select Your Degree"
            data={degreeData}
            type="Degree"
          />
        </>
      )}
      {majorData.length !== 0 && (
        <>
          <SelectInfo
            key="selectMajor1"
            setYearValue={props.setMajorValue}
            handleChange={(e) => handleMajor1Change(e)}
            title="Which major are you in?"
            defaultOption="Select Your Major"
            data={majorData}
            type="Major"
          />
          <SelectInfo
            key="selectMajor2"
            setYearValue={props.setMajorValue}
            handleChange={(e) => handleMajor2Change(e)}
            title="Major 2 (if any)"
            defaultOption="Select Your Major 2"
            data={majorData}
            type="Major"
          />
        </>
      )}
      {majorData.length !== 0 && (
        <>
          <SelectInfo
            key="selectYear"
            setYearValue={props.setYearValue}
            handleChange={(e) => handleYearChange(e)}
            title="From which year did you start learning?"
            defaultOption="Select When You Start"
            data={yearData}
            type="Year"
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
      <select className="selectBar" onChange={(e) => props.handleChange(e)}>
        <option value={""}>{props.defaultOption}</option>
        {props.data.map((data) => (
          <option key={data[`${props.type}Id`]} value={data[`${props.type}Id`]}>
            {data[`${props.type}Name`]}
          </option>
        ))}
      </select>
    </div>
  );
}

//---------Test Data--------------------------------------------------

const majorObj = [
  {
    MajorId: 1,
    MajorName: "Systems Development",
  },
  {
    MajorId: 2,
    MajorName: "Business Technology",
  },
];

const yearObj = [
  {
    YearId: "2017",
    YearName: "2017",
  },
  {
    YearId: "2018",
    YearName: "2018",
  },
  {
    YearId: "2019",
    YearName: "2019",
  },
  {
    YearId: "2020",
    YearName: "2020",
  },
  {
    YearId: "2021",
    YearName: "2021",
  },
  {
    YearId: "2022",
    YearName: "2022",
  },
];

export default InfoCheck;
