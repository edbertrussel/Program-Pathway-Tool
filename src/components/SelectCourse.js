import "./SelectCourse.css";
import React from "react";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SelectCourse(props) {
  return (
    <div className="SelectCourse">
      <div className="contentHeader">
        <div className="searchBox">
          <input
            type="text"
            className="input__search"
            placeholder="Search"
          ></input>
          <button className="btn__search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="faMagnifyingGlass"
            />
          </button>
        </div>
        <div className="title">Courses</div>
        <div className="blank"></div>
      </div>

      <div className="coursetable">
        <div className="tableHeader">
          <div className="header__core">Core</div>
          <div className="header__major1">Major 1</div>
          <div className="header__major2">Major 2</div>
        </div>
        <div className="courseBox">
          <CourseBox
            setBoxForCourse={props.setBoxForCourse}
            type="core"
            onDrop={props.onDrop}
          ></CourseBox>
          <CourseBox
            setBoxForCourse={props.setBoxForCourse}
            type="major1"
            onDrop={props.onDrop}
          ></CourseBox>
          <CourseBox
            type="major2"
            setBoxForCourse={props.setBoxForCourse}
            onDrop={props.onDrop}
          ></CourseBox>
        </div>
      </div>
    </div>
  );
}

function CourseBox({ type, onDrop, setBoxForCourse }) {
  
  const [, drop] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.name, `box__${type}`),
  }));

  return (
    <div ref={drop} className={`box__${type}`}>
      {setBoxForCourse(`box__${type}`)}
    </div>
  );
}
export default SelectCourse;
