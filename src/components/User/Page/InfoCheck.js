import { useUserContext } from "../../Context/UserContext.js";
import SelectInfo from "../SelectInfo.js"
import logo from "../../../logo.png"
import "./InfoCheck.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function InfoCheck() {
  const {
    getCampusData,
    campusData,
    degreeData,
    major1Data,
    major2Data,
    yearData,
    isErrorMsgSelected,
    isCampusSelected,
    isDegreeSelected,
    isMajor1Selected,
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
      <CSSTransition in={isErrorMsgSelected} timeout={1000} classNames="fade">
        <div>
          {isErrorMsgSelected && (
            <div className="select-error">
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ paddingRight: "5px" }}
              ></FontAwesomeIcon>
              Please select all items!
            </div>
          )}
        </div>
      </CSSTransition>
      <SelectInfo
        key="selectCampus"
        handleChange={(e) => handleCampusChange(e)}
        title="Which Campus Are You Studying At?"
        defaultOption="Select Your Campus"
        data={campusData}
        type="Campus"
      />
      <CSSTransition in={isCampusSelected} timeout={1000} classNames="fade">
        <div>
          {isCampusSelected && (
            <SelectInfo
              key="selectDegree"
              handleChange={(e) => handleDegreeChange(e)}
              title="Which degree are you learning?"
              defaultOption="Select Your Degree"
              data={degreeData}
              type="Degree"
            />
          )}
        </div>
      </CSSTransition>
      <CSSTransition in={isDegreeSelected} timeout={1000} classNames="fade">
        <div>
          {isDegreeSelected && (
            <SelectInfo
              key="selectMajor1"
              handleChange={(e) => handleMajor1Change(e)}
              title="Which major are you in?"
              defaultOption="Select Your Major"
              data={major1Data}
              type="Major"
            />
          )}
        </div>
      </CSSTransition>
      <CSSTransition in={isMajor1Selected} timeout={1000} classNames="fade">
        <div>
          {isMajor1Selected && (
            <>
              <SelectInfo
                key="selectMajor2"
                handleChange={(e) => handleMajor2Change(e)}
                title="Major 2 (if any)?"
                defaultOption="Select Your Major2"
                data={major2Data}
                type="Major"
              />
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
      </CSSTransition>
    </div >
  );
}

export default InfoCheck;
