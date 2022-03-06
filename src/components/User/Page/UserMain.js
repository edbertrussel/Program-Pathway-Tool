import { useUserContext } from "../../Context/UserContext.js";
import logo from "../../../logo.png"
import "./UserMain.css";
import SelectCourse from "../SelectCourse.js";
import DropBox from "../DropBox.js";
import React, { useEffect, useState } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UserMain() {
  const {
    userInfo,
    yearCount,
    courseBoxes,
    DragAvailablity,
    errorMsg,
    warning,
    totalCredit,
    currentCredit,
    getCourseCardData,
    calCredit,
    onYearAddClick,
    onYearDeleteClick,
    onBackClick
  } = useUserContext();
  const startYear = parseInt(userInfo.startYear);

  useEffect(() => {
    getCourseCardData();
  }, []);

  useEffect(() => {
    calCredit();
  }, [courseBoxes]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="UserMain">
        <header>
          <img src={logo} className="logo" alt="logo" />
        </header>
        {
          <div className="total-credit">
            <h1></h1>
            Current Credit: {currentCredit} / {totalCredit} units
          </div>
        }
        {errorMsg && (
          <div className="error-msg">
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ paddingRight: "5px" }}
            ></FontAwesomeIcon>
            {errorMsg}
          </div>
        )}
        {warning && (
          <div className="warning-msg">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ paddingRight: "5px" }}
            ></FontAwesomeIcon>
            {warning.message}
            <ul>
              {warning.data.map((AK) => {
                return (
                  <li>
                    {`${AK.Alternative1} ${AK.Alternative2 ? "or " + AK.Alternative2 : ""
                      }`}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="content">
          <div className="mainContent">
            <div className="droptable">
              <div className="tableHeader">
                <div className="header__year">Year</div>
                <div className="header__tri">Trimester 1</div>
                <div className="header__tri">Trimester 2</div>
                <div className="header__tri">Trimester 3</div>
              </div>

              {yearCount.map((i) => {
                const year = new Date().getFullYear();
                const yearAvailability = !DragAvailablity
                  ? null
                  : DragAvailablity.filter(
                    (availability) => availability.year === startYear + i
                  ).length !== 0 || startYear + i > year
                    ? DragAvailablity.filter(
                      (availability) => availability.year === startYear + i
                    )
                    : null;

                return (
                  <>
                    <DropBox
                      key={startYear + i}
                      year={startYear + i}
                      availability={yearAvailability}
                    />
                  </>
                );
              })}

              <div className="handleYear">
                <div className="blank"></div>
                <button className="btn__addYear" onClick={(e) => onYearAddClick(e)}>
                  ADD YEAR
                </button>
                <div className="deleteYear">
                  <button
                    className="btn__deleteyear"
                    onClick={(e) => onYearDeleteClick(e)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size="lg"
                      className="iconTrashCan"
                    />
                  </button>
                </div>
              </div>

              <div className="buttons">
                <div className="blank"></div>
                <Link
                  key="link__back"
                  className="link__back"
                  to="/"
                  onClick={() => onBackClick()}
                >
                  Back
                </Link>
                <button className="btn__showpath">Show My Path</button>
              </div>
            </div>

            <SelectCourse />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default UserMain;