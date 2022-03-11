import CourseBox from "./CourseBox.js";

function SelectCourse() {
  return (
    <div className="SelectCourse">
      <div className="tableHeader">
        <div className="header__core">Core course</div>
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
  );
}
export default SelectCourse;