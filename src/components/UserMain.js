import logo from "../logo.png";
import "./UserMain.css";
import SelectCourse from "./SelectCourse";
import CourseCard from "./CourseCard";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function UserMain(props) {
  const [yearNumber, setYearNumber] = useState([0, 1]);
  const [courseBoxes, setCourseBoxes] = useState([
    {
      Course_ID: "SENG1050",
      box: "box__core",
    },
    {
      Course_ID: "COMP1140",
      box: "box__core",
    },
    {
      Course_ID: "SENG2130",
      box: "box__core",
    },
    {
      Course_ID: "COMP1010",
      box: "2018__tri1",
    },
  ]);

  // Following 'courseBoxes' state value, render <CourseCard> corresponding box
  const setBoxForCourse = (boxName) => {
    return courseBoxes
      .filter((courseBoxes) => courseBoxes.box === boxName)
      .map((courseBoxes) => (
        <CourseCard
          key={courseBoxes.Course_ID}
          courseName={courseBoxes.Course_ID}
          setCourseBoxes={setCourseBoxes}
          getCourseBoxes={courseBoxes}
        />
      ));
  };

  const onDrop = (courseId, boxName) => {
    setCourseBoxes((prevBoxes) => {
      return prevBoxes.map((Box) => {
        return courseId === Box.Course_ID
          ? { ...Box, box: boxName }
          : { ...Box };
      });
    });
  };

  const startYear = parseInt(props.getYearValue);

  const onAddClick = (e) => {
    // Check maximum year number (if you want 6 years maximum: > 6)
    if (yearNumber.length + 1 > 5) {
      e.preventDefault();
      alert("5 years Maximum!");
      return;
    }

    setYearNumber(yearNumber.concat([yearNumber.length]));
  };

  const onDeleteClick = (e) => {
    // Check minimum year number
    if (yearNumber.length - 1 < 2) {
      e.preventDefault();
      alert("2 years Minimum!");
      return;
    }

    const deletedList = yearNumber.filter(
      (index) => index < yearNumber.length - 1
    );
    setYearNumber(deletedList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="UserMain">
        <header>
          <img src={logo} className="logo" alt="logo" />
        </header>
        <div className="content">
          <div className="mainContent">
            <div className="droptable">
              <div className="tableHeader">
                <div className="header__year">Year</div>
                <div className="header__tri">Trimester 1</div>
                <div className="header__tri">Trimester 2</div>
                <div className="header__tri">Trimester 3</div>
              </div>

              {yearNumber.map((i) => (
                <>
                  <DropBox
                    key={startYear + i}
                    getYearValue={startYear + i}
                    setBoxForCourse={setBoxForCourse}
                    onDrop={onDrop}
                  />
                </>
              ))}

              <div className="handleYear">
                <div className="blank"></div>
                <button className="btn__addYear" onClick={(e) => onAddClick(e)}>
                  ADD YEAR
                </button>
                <div className="deleteYear">
                  <button
                    className="btn__deleteyear"
                    onClick={(e) => onDeleteClick(e)}
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
                <Link key="link__back" className="link__back" to="/">
                  Back
                </Link>
                <button className="btn__showpath">Show My Path</button>
              </div>
            </div>

            <SelectCourse setBoxForCourse={setBoxForCourse} onDrop={onDrop} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

function DropBox(props) {
  
  const [, drop__tri1] = useDrop(() => ({
    accept: "course",
    drop: (item) => props.onDrop(item.name, props.getYearValue + "__tri1"),
  }));

  const [, drop__tri2] = useDrop(() => ({
    accept: "course",
    drop: (item) => props.onDrop(item.name, props.getYearValue + "__tri2"),
  }));

  const [, drop__tri3] = useDrop(() => ({
    accept: "course",
    drop: (item) => props.onDrop(item.name, props.getYearValue + "__tri3"),
  }));

  return (
    <div className="DropBox">
      <div className="box__year">{props.getYearValue}</div>
      <div ref={drop__tri1} key={props.getYearValue + "__tri1"} className="box">
        {props.setBoxForCourse(props.getYearValue + "__tri1")}
      </div>
      <div ref={drop__tri2} key={props.getYearValue + "__tri2"} className="box">
        {props.setBoxForCourse(props.getYearValue + "__tri2")}
      </div>
      <div ref={drop__tri3} key={props.getYearValue + "__tri3"} className="box">
        {props.setBoxForCourse(props.getYearValue + "__tri3")}
      </div>
    </div>
  );
}

export default UserMain;
