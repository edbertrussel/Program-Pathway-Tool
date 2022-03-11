import { useUserContext } from "../../Context/UserContext.js";
import logo from "../../../logo.png";
import "./UserMain.css";
import SelectCourse from "../SelectCourse.js";
import DropBox from "../DropBox.js";
import React, { useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function UserMain() {
  const {
    userInfo,
    yearCount,
    courseBoxes,
    DragAvailablity,
    isErrOrWarn,
    errorMsg,
    warning,
    totalCredit,
    currentCredit,
    getCourseCardData,
    calCredit,
    onYearAddClick,
    onYearDeleteClick,
    onBackClick,
    generatePath,
    totalMajor1Credit,
    totalMajor2Credit,
    currentMajor1Credit,
    currentMajor2Credit,
    isLoadingPath,
    handleClearPath,
    isPathCompleted,
    setIsPathCompleted,
  } = useUserContext();
  const startYear = parseInt(userInfo.startYear);

  useEffect(() => {
    getCourseCardData();
  }, []);

  useEffect(() => {
    calCredit();
  }, [courseBoxes]);

  useEffect(() => {
    if (
      totalCredit > 0 &&
      currentCredit === totalCredit &&
      currentMajor1Credit === totalMajor1Credit &&
      currentMajor2Credit === totalMajor2Credit
    ) {
      setIsPathCompleted(true);
    } else setIsPathCompleted(false);
  }, [currentCredit, currentMajor1Credit, currentMajor2Credit]);

  return (
    <DndProvider backend={HTML5Backend}>

      {isLoadingPath && (
        <div className="black-background">
          <div
            className="loader"
            style={{ position: "relative", top: "50%" }}
          ></div>
        </div>
      )}

      <div className="UserMain">
        <header>
          <Link
            key="link__home"
            className="link__home"
            to="/"
            onClick={() => onBackClick()}
          >
            <img src={logo} className="logo" alt="logo" />
          </Link>
          {
            <div className="credit">
              <div className="current-credit">Current Credit:</div>
              <div className="num">
                <div className="current-credit-num">{currentCredit}</div>
                <div className="total-credit">/ {totalCredit} units</div>
              </div>
            </div>
          }
          {
            <div className="credit">
              <div className="current-credit">Major 1 Credit:</div>
              <div className="num">
                <div className="current-credit-num">{currentMajor1Credit}</div>
                <div className="total-credit">/ {totalMajor1Credit} units</div>
              </div>
            </div>
          }
          {
            <div className="credit">
              <div className="current-credit">Major 2 Credit:</div>
              <div className="num">
                <div className="current-credit-num">{currentMajor2Credit}</div>
                <div className="total-credit">/ {totalMajor2Credit} units</div>
              </div>
            </div>
          }
          <div className="color-legend">
            <div className="color-legend-item">
              <div className="color-box-compulsory"></div>
              <div>Core / Compulsory</div>
            </div>
            <div className="color-legend-item">
              <div className="color-box-electives"></div>
              <div>Electives / Directed</div>
            </div>
          </div>
        </header>

        <CSSTransition in={isErrOrWarn} timeout={1000} classNames="fade">
          <div className="error-n-warn">
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
          </div>
        </CSSTransition>

        <div className="content">
          <div className="mainContent">
            <div className="droptable">
              <div className="tableHeader">
                <div className="header__year">Year</div>
                <div className="header__tri">Trimester 1</div>
                <div className="header__tri">Trimester 2</div>
                <div className="header__tri">Trimester 3</div>
              </div>
              <TransitionGroup>
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
                    <CSSTransition
                      key={i}
                      timeout={500}
                      classNames="fade"
                    >
                      <DropBox
                        key={startYear + i}
                        year={startYear + i}
                        availability={yearAvailability}
                      />
                    </CSSTransition>
                  )
                })}
              </TransitionGroup>

              <div className="handleYear">
                <div className="blank"></div>
                <button
                  className="btn__addYear"
                  onClick={(e) => onYearAddClick(e)}
                >
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
                <Link
                  key="link__back"
                  className="link__back"
                  to="/"
                  onClick={() => onBackClick()}
                >
                  Back
                </Link>
                <button className="btn-clear" onClick={handleClearPath}>
                  Clear
                </button>
                <button className="btn__showpath" onClick={generatePath}>
                  Show My Path
                </button>
                {isPathCompleted && (
                  <button className="btn-save">Save As</button>
                )}
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
