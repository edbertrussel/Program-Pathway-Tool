import CourseCard from "../User/CourseCard";
import React from "react";
import { useContext, useState } from "react";
import axios from "axios";

const UserContext = React.createContext();
function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    campus: '',
    degree: '',
    major1: '',
    major2: '',
    startYear: '',
  });
  const [isErrorMsgSelected, setIsErrorMsgSelected] = useState(false);
  const [isCampusSelected, setIsCampusSelected] = useState(false);
  const [isDegreeSelected, setIsDegreeSelected] = useState(false);
  const [isMajor1Selected, setIsMajor1Selected] = useState(false);
  const [campusData, setCampusData] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [major1Data, setMajor1Data] = useState([]);
  const [major2Data, setMajor2Data] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearCount, setYearCount] = useState([0, 1]);
  const [courseBoxes, setCourseBoxes] = useState([]);
  const [DragAvailablity, setAvailability] = useState(null);
  const [isErrOrWarn, setIsErrOrWarn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [warning, setWarning] = useState(null);
  const [maxYear, setMaxYear] = useState(5);
  const [totalCredit, setTotalCredit] = useState(0);
  const [currentCredit, setCurrentCredit] = useState(0);

  // -----For <InfoCheck> Pages-------------------------------------------------------
  async function getInfoData(url, type) {
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

  async function getCampusData() {
    setCampusData(
      await getInfoData("http://localhost:5000/api/campus", "Campus")
    );
  }

  // When an option is selected.
  async function handleCampusChange(e) {
    setUserInfo({ ...userInfo, campus: e.target.value });
    setDegreeData(
      await getInfoData(
        `http://localhost:5000/api/campus/${e.target.value}/degree`,
        "Degree"
      )
    );
    setIsCampusSelected(true);
  };
  async function handleDegreeChange(e) {
    setUserInfo({ ...userInfo, degree: e.target.value });
    setMajor1Data(
      await getInfoData(
        `http://localhost:5000/api/degree/${e.target.value}/major`,
        "Major"
      )
    );
    setIsDegreeSelected(true);
  };
  function handleMajor1Change(e) {
    setUserInfo({ ...userInfo, major1: e.target.value });

    //Option that is selected in major1 does not appear on major2 list
    setMajor2Data(major1Data.filter(arr => arr.MajorId.toString() !== e.target.value));
    setYearData(yearObj);
    setIsMajor1Selected(true);
  };
  function handleMajor2Change(e) {
    setUserInfo({ ...userInfo, major2: e.target.value });
  };
  function handleYearChange(e) {
    setUserInfo({ ...userInfo, startYear: e.target.value });
  };

  // Check all required options are selected
  function onInfoConfirmClick(e) {
    if (
      userInfo.campus === '' ||
      userInfo.degree === '' ||
      userInfo.major1 === '' ||
      userInfo.startYear === ''
    ) {
      e.preventDefault();
      setIsErrorMsgSelected(true);
    }
  };

  // -----For <UserMain> Pages-------------------------------------------------------
  // Get course data according to the selected option
  async function getCourseCardData(paramObj = {}) {
    const degreeRes = await axios({
      method: "GET",
      url: `http://localhost:5000/api/degree/${userInfo.degree}`,
    });

    const { Max_Year, Total_Credit } = degreeRes.data.result;
    setMaxYear(Max_Year);
    setTotalCredit(Total_Credit);
    let courseIDList = [];
    const degreeCourseRes = await axios({
      method: "GET",
      url: `http://localhost:5000/api/degree/${userInfo.degree}/course`,
    });
    const major1CourseRes = await axios({
      method: "GET",
      url: `http://localhost:5000/api/major/${userInfo.major1}/course`,
    });
    const major2CourseRes =
      userInfo.major2 === ''
        ? null
        : await axios({
          method: "GET",
          url: `http://localhost:5000/api/major/${userInfo.major2}/course`,
        });
    const major2Courses = major2CourseRes
      ? [
        ...major2CourseRes.data.result.map((course) => ({
          courseId: course.Course_ID,
          courseName: course.Course_Name,
          box: "box__major2",
          type: "major2",
          unit: course.Unit,
          requiredUnit: course.Required_Unit,
          assumedKnowledge: course.Assumed_Knowledge,
          availability: course.Availability,
        })),
      ]
      : [];
    courseIDList = [
      ...courseIDList,
      ...degreeCourseRes.data.result.map((course) => ({
        courseId: course.Course_ID,
        courseName: course.Course_Name,
        box: "box__core",
        type: "core",
        unit: course.Unit,
        requiredUnit: course.Required_Unit,
        assumedKnowledge: course.Assumed_Knowledge,
        availability: course.Availability,
      })),
      ...major1CourseRes.data.result.map((course) => ({
        courseId: course.Course_ID,
        courseName: course.Course_Name,
        box: "box__major1",
        type: "major1",
        unit: course.Unit,
        requiredUnit: course.Required_Unit,
        assumedKnowledge: course.Assumed_Knowledge,
        availability: course.Availability,
      })),
      ...major2Courses,
    ];
    console.log(courseIDList);
    setCourseBoxes(courseIDList);
  };

  // Calculate current credit amount 
  function calCredit() {
    setCurrentCredit(
      courseBoxes.reduce((prevVal, curVal) => {
        if (curVal.box.substr(0, 3) !== "box")
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0)
    );
  };

  function onYearAddClick(e) {
    setErrorMsg("");

    // Check maximum year number (if you want 6 years maximum: > 6)
    if (yearCount.length + 1 > maxYear) {
      e.preventDefault();
      setErrorMsg(maxYear + " years Maximum!");
      setIsErrOrWarn(true);
      return;
    }

    setYearCount(yearCount.concat([yearCount.length]));
  };

  function onYearDeleteClick(e) {
    setErrorMsg("");

    // Check minimum year number
    if (yearCount.length - 1 < 2) {
      e.preventDefault();
      setErrorMsg("2 years Minimum!");
      setIsErrOrWarn(true);
      return;
    }

    const deletedList = yearCount.filter(
      (idx) => idx < yearCount.length - 1
    );
    setYearCount(deletedList);
  };

  // When go back to <InfoCheck> page, reset user info, error message and warning
  function onBackClick() {
    setUserInfo({
      campus: '',
      degree: '',
      major1: '',
      major2: '',
      startYear: '',
    });
    setErrorMsg("");
    setWarning(null);
    setIsErrOrWarn(false);
    setIsErrorMsgSelected(false);
  }

  // Following 'courseBoxes' state value, render <CourseCard> corresponding box
  function setBoxForCourse(boxName) {
    return courseBoxes
      .filter((courseBoxes) => courseBoxes.box === boxName)
      .map((courseBoxes) => (
        <CourseCard
          key={courseBoxes.courseId}
          courseId={courseBoxes.courseId}
          courseName={courseBoxes.courseName}
          setCourseBoxes={setCourseBoxes}
          getCourseBoxes={courseBoxes}
          onDrag={onDrag}
          onDragOver={onDragOver}
        />
      ));
  }
  function onDrag(courseId) {
    const { availability } = courseBoxes.find(
      (course) => course.courseId === courseId
    );

    setAvailability(availability);
  };
  function onDragOver() {
    setAvailability(null);
  };

  const onDrop = (dropId, boxName) => {
    setIsErrOrWarn(false);
    setWarning(null);
    setErrorMsg(null);
    setCourseBoxes((prevBoxes) => {
      const dropYear = parseInt(boxName.substr(0, 4)); //get the year from boxName eg 2018_tri1 -> 2018
      const dropSemester = parseInt(boxName.substr(-1)); //eg 2018_tri1 -> 1
      if (boxName.substr(boxName.length - 4, 3) !== "tri") {
        //if user aint drop in dropBox, return the courseCard to its original box
        return prevBoxes.map((Box) => {
          return dropId === Box.courseId
            ? { ...Box, box: `box__${Box.type}` }
            : { ...Box };
        });
      }
      if (prevBoxes.filter((course) => course.box === boxName).length > 3) {
        //restrict to at most 4 courses in one semester
        setErrorMsg("You can only have at most 4 courses in one semester");
        setIsErrOrWarn(true);
        return [...prevBoxes];
      }
      if (dropId.substr(-1) === "A") {
        // for course that the last character is A or B, meaning it is consequtive course
        const partBCourse = prevBoxes.find(
          //get the obj of part B course to know its current postion
          (course) =>
            course.courseId === `${dropId.substr(0, dropId.length - 1)}B`
        );
        const { box, courseId } = partBCourse;
        const PartBCourseYear = box.substr(0, 4);
        const PartBCourseSem = box.substr(-1);
        if (
          (box.substr(box.length - 4, 3) === "tri" && //
            parseInt(PartBCourseYear) !== dropYear &&
            parseInt(PartBCourseYear) !== dropYear + 1) ||
          (parseInt(PartBCourseYear) === dropYear &&
            parseInt(PartBCourseSem) !== dropSemester + 1) ||
          (parseInt(PartBCourseYear) === dropYear + 1 &&
            parseInt(PartBCourseSem) !== 1)
        ) {
          setErrorMsg(
            `${dropId} and ${courseId} must be completed in consecutive terms`
          );
          setIsErrOrWarn(true);
          return [...prevBoxes];
        }
      }
      if (dropId.substr(-1) === "B") {
        const partACourse = prevBoxes.find(
          (course) =>
            course.courseId === `${dropId.substr(0, dropId.length - 1)}A` //get part A course instance
        );
        const { box, courseId } = partACourse;
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
            `${courseId} and ${dropId} must be completed in consecutive terms`
          );
          setIsErrOrWarn(true);
          return [...prevBoxes];
        }
      }
      const totalUnit = prevBoxes.reduce((prevVal, curVal) => {
        //calculate the total unit that
        if (
          parseInt(curVal.box.substr(0, 4)) < dropYear ||
          (parseInt(curVal.box.substr(0, 4)) === dropYear &&
            parseInt(curVal.box.substr(-1)) < dropSemester)
        )
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0);
      console.log(totalUnit);
      const { requiredUnit, assumedKnowledge, availability } = prevBoxes.find(
        (box) => box.courseId === dropId
      );

      if (totalUnit < requiredUnit) {
        setErrorMsg(
          `${dropId} require you to complete ${requiredUnit} units before enrolled`
        );
        setIsErrOrWarn(true);

        return [...prevBoxes];
      }
      //We assume that the course is offered on every semester
      //if the year > current year AND there is no availability data found from database for the specific year
      const currentYear = new Date().getFullYear();
      if (
        availability.findIndex(
          (ava) => ava.year === dropYear && ava.semester === dropSemester
        ) === -1 &&
        dropYear <= currentYear
      ) {
        setErrorMsg(
          `${dropId} is not offered in ${dropYear} Tri ${dropSemester}`
        );
        setIsErrOrWarn(true);
        return [...prevBoxes];
      }
      if (
        //display all assume knowledge
        assumedKnowledge.length !== 1 ||
        assumedKnowledge[0].Alternative1 ||
        assumedKnowledge[0].Alternative2
      ) {
        let message = `For ${dropId}, Please make sure you have completed the following courses before enrolled`;
        setWarning({ message, data: assumedKnowledge });
        setIsErrOrWarn(true);
      }

      return prevBoxes.map((Box) => {
        return dropId === Box.courseId ? { ...Box, box: boxName } : { ...Box };
      });
    });
    onDragOver();
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        campusData,
        degreeData,
        major1Data,
        major2Data,
        yearData,
        yearCount,
        courseBoxes,
        DragAvailablity,
        isErrorMsgSelected,
        isCampusSelected,
        isDegreeSelected,
        isMajor1Selected,
        isErrOrWarn,
        errorMsg,
        warning,
        totalCredit,
        currentCredit,
        getCampusData,
        handleCampusChange,
        handleDegreeChange,
        handleMajor1Change,
        handleMajor2Change,
        handleYearChange,
        onInfoConfirmClick,
        getCourseCardData,
        calCredit,
        onYearAddClick,
        onYearDeleteClick,
        onBackClick,
        setBoxForCourse,
        onDrag,
        onDrop,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext);
export { useUserContext, UserContextProvider };

// Test Data

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