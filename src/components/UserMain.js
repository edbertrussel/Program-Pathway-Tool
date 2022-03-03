import logo from "../logo.png";
import "./UserMain.css";
import SelectCourse from "./SelectCourse";
import CourseCard from "./CourseCard";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function UserMain(props) {
  const [yearNumber, setYearNumber] = useState([0, 1]);
  const [courseBoxes, setCourseBoxes] = useState([]);

  const [DragAvailablity, setAvailability] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [warning, setWarning] = useState(null);
  const [maxYear, setMaxYear] = useState(5);
  const [totalCredit, setTotalCredit] = useState(0);
  const [currentCredit, setCurrentCredit] = useState(0);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/api/degree/${props.getDegreeValue}`,
    }).then((res) => {
      const { Max_Year, Total_Credit } = res.data.result;
      setMaxYear(Max_Year);
      setTotalCredit(Total_Credit);
    });
    axios({
      method: "GET",
      url: `http://localhost:5000/api/degree/${props.getDegreeValue}/course`,
    }).then((res) => {
      const courseIDList = res.data.result.map((course) => ({
        Course_ID: course.Course_ID,
        box: "box__core",
        type: "core",
        unit: course.Unit,
        requiredUnit: course.Required_Unit,
        assumedKnowledge: course.Assumed_Knowledge,
        availability: course.Availability,
      }));

      setCourseBoxes(courseIDList);
    });
  }, []);
  useEffect(() => {
    setCurrentCredit(
      courseBoxes.reduce((prevVal, curVal) => {
        if (curVal.box.substr(0, 3) !== "box")
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0)
    );
  }, [courseBoxes]);
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
          onDrag={onDrag}
          onDragOver={onDragOver}
        />
      ));
  };
  const onDrag = (courseId) => {
    const { availability } = courseBoxes.find(
      (course) => course.Course_ID === courseId
    );

    setAvailability(availability);
  };
  const onDragOver = () => {
    setAvailability(null);
  };

  const onDrop = (courseId, boxName) => {
    setWarning(null);
    setErrorMsg(null);
    setCourseBoxes((prevBoxes) => {
      const dropYear = parseInt(boxName.substr(0, 4));
      const dropSemester = parseInt(boxName.substr(-1));
      if (boxName.substr(boxName.length - 4, 3) !== "tri") {
        return prevBoxes.map((Box) => {
          return courseId === Box.Course_ID
            ? { ...Box, box: `box__${Box.type}` }
            : { ...Box };
        });
      }
      if (prevBoxes.filter((course) => course.box === boxName).length > 3) {
        setErrorMsg("You can only have at most 4 courses in one semester");
        return [...prevBoxes];
      }
      if (courseId.substr(-1) === "A") {
        const partBCourse = prevBoxes.find(
          (course) =>
            course.Course_ID === `${courseId.substr(0, courseId.length - 1)}B`
        );
        const { box, Course_ID } = partBCourse;
        const PartBCourseYear = box.substr(0, 4);
        const PartBCourseSem = box.substr(-1);
        if (
          (box.substr(box.length - 4, 3) === "tri" &&
            parseInt(PartBCourseYear) !== dropYear &&
            parseInt(PartBCourseYear) !== dropYear + 1) ||
          (parseInt(PartBCourseYear) === dropYear &&
            parseInt(PartBCourseSem) !== dropSemester + 1) ||
          (parseInt(PartBCourseYear) === dropYear + 1 &&
            parseInt(PartBCourseSem) !== 1)
        ) {
          setErrorMsg(
            `${Course_ID} and ${courseId} must be completed in consecutive terms`
          );
          return [...prevBoxes];
        }
      }
      if (courseId.substr(-1) === "B") {
        const partACourse = prevBoxes.find(
          (course) =>
            course.Course_ID === `${courseId.substr(0, courseId.length - 1)}A`
        );
        const { box, Course_ID } = partACourse;
        const PartACourseYear = box.substr(0, 4);
        const PartACourseSem = box.substr(-1);

        if (
          box.substr(box.length - 4, 3) !== "tri" ||
          (parseInt(PartACourseYear) !== dropYear &&
            parseInt(PartACourseYear) !== dropYear - 1) ||
          (parseInt(PartACourseYear) === dropYear &&
            parseInt(PartACourseSem) !== dropSemester - 1) ||
          (parseInt(PartACourseYear) === dropYear - 1 &&
            parseInt(PartACourseSem) !== 3)
        ) {
          setErrorMsg(
            `${Course_ID} and ${courseId} must be completed in consecutive terms`
          );
          return [...prevBoxes];
        }
      }
      const totalUnit = prevBoxes.reduce((prevVal, curVal) => {
        if (
          curVal.box.substr(0, 4) < dropYear ||
          (curVal.box.substr(0, 4) === dropYear &&
            curVal.box.substr(-1) < dropSemester)
        )
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0);
      const { requiredUnit, assumedKnowledge, availability } = prevBoxes.find(
        (box) => box.Course_ID === courseId
      );

      if (totalUnit < requiredUnit) {
        setErrorMsg(
          `${courseId} require you to complete ${requiredUnit} units before enrolled`
        );

        return [...prevBoxes];
      }
      const currentYear = new Date().getFullYear();
      if (
        availability.findIndex(
          (ava) => ava.year === dropYear && ava.semester === dropSemester
        ) === -1 &&
        dropYear <= currentYear
      ) {
        setErrorMsg(
          `${courseId} is not offered in ${dropYear} Tri ${dropSemester}`
        );
        return [...prevBoxes];
      }
      if (
        assumedKnowledge.length !== 1 ||
        assumedKnowledge[0].Alternative1 ||
        assumedKnowledge[0].Alternative2
      ) {
        let message = `For ${courseId},Please make sure you have completed the following courses before enrolled`;
        setWarning({ message, data: assumedKnowledge });
      }

      return prevBoxes.map((Box) => {
        return courseId === Box.Course_ID
          ? { ...Box, box: boxName }
          : { ...Box };
      });
    });
    onDragOver();
  };
  const startYear = parseInt(props.getYearValue);

  const onAddClick = (e) => {
    console.log(courseBoxes);
    // Check maximum year number (if you want 6 years maximum: > 6)
    if (yearNumber.length + 1 > maxYear) {
      e.preventDefault();
      alert(maxYear + " years Maximum!");
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
        {
          <div className="total-credit">
            <h1></h1>
            Current Credit: {currentCredit} / {totalCredit}
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
                    {`${AK.Alternative1} ${
                      AK.Alternative2 ? "or " + AK.Alternative2 : ""
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

              {yearNumber.map((i) => {
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
                      getYearValue={startYear + i}
                      setBoxForCourse={setBoxForCourse}
                      onDrop={onDrop}
                      availability={yearAvailability}
                    />
                  </>
                );
              })}

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
  //const year = props.getYearValue.toString();

  const [{ isOver }, drop__tri1] = useDrop(() => ({
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
      <div
        ref={drop__tri1}
        key={props.getYearValue + "__tri1"}
        className={`box ${
          props.availability === null
            ? ""
            : props.availability.length === 0
            ? "box-allowed"
            : props.availability.findIndex((avail) => avail.semester === 1) > -1
            ? "box-allowed"
            : ""
        }`}
      >
        {props.setBoxForCourse(props.getYearValue + "__tri1")}
      </div>
      <div
        ref={drop__tri2}
        key={props.getYearValue + "__tri2"}
        className={`box ${
          props.availability === null
            ? ""
            : props.availability.length === 0
            ? "box-allowed"
            : props.availability.findIndex((avail) => avail.semester === 2) > -1
            ? "box-allowed"
            : ""
        }`}
      >
        {props.setBoxForCourse(props.getYearValue + "__tri2")}
      </div>
      <div
        ref={drop__tri3}
        key={props.getYearValue + "__tri3"}
        className={`box ${
          props.availability === null
            ? ""
            : props.availability.length === 0
            ? "box-allowed"
            : props.availability.findIndex((avail) => avail.semester === 3) > -1
            ? "box-allowed"
            : ""
        }`}
      >
        {props.setBoxForCourse(props.getYearValue + "__tri3")}
      </div>
    </div>
  );
}

export default UserMain;
