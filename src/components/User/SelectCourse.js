import CourseBox from "./CourseBox.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SelectCourse() {
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
            type="core"
          ></CourseBox>
          <CourseBox
            type="major1"
          ></CourseBox>
          <CourseBox
            type="major2"
          ></CourseBox>
        </div>
      </div>
    </div>
  );
}
export default SelectCourse;