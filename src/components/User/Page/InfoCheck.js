import { useUserContext } from "../../Context/UserContext.js";
import SelectInfo from "../SelectInfo.js"
import logo from "../../../logo.png"
import "./InfoCheck.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function InfoCheck() {
  const {
    getCampusData,
    campusData,
    degreeData,
    majorData,
    yearData,
    handleCampusChange,
    handleDegreeChange,
    handleMajor1Change,
    handleMajor2Change,
    handleYearChange,
    onInfoConfirmClick
  } = useUserContext();

  useEffect(() => {
    getCampusData();
  }, []);

  return (
    <div className="InfoCheck">
      <img src={logo} className="logo" alt="logo" />
      <SelectInfo
        key="selectCampus"
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
            handleChange={(e) => handleMajor1Change(e)}
            title="Which major are you in?"
            defaultOption="Select Your Major"
            data={majorData}
            type="Major"
          />
          <SelectInfo
            key="selectMajor2"
            handleChange={(e) => handleMajor2Change(e)}
            title="Major 2 (if any)?"
            defaultOption="Select Your Major2"
            data={majorData}
            type="Major"
          />
        </>
      )}
      {majorData.length !== 0 && (
        <>
          <SelectInfo
            key="selectYear"
            handleChange={(e) => handleYearChange(e)}
            title="From which year did you start learning?"
            defaultOption="Select When You Start"
            data={yearData}
            type="Year"
          />

          <Link
            key="link__confirm"
            className="link__confirm"
            onClick={(e) => onInfoConfirmClick(e)}
            to="/usermain"
          >
            Confirm
          </Link>
        </>
      )}
    </div>
  );
}

export default InfoCheck;
