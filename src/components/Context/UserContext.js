import CourseCard from "../User/CourseCard";
import React from "react";
import { useContext, useState } from "react";
import axios from "axios";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

const UserContext = React.createContext();
function UserContextProvider({ children }) {
  // const [userInfo, setUserInfo] = useState({
  //   campus: "SG001",
  //   degree: "",
  //   major1: "",
  //   major2: "",
  //   startYear: "2017",
  // });
  const [userInfo, setUserInfo] = useState({
    campus: "",
    degree: "",
    major1: "",
    major2: "",
    startYear: "",
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
  const [totalMajor1Credit, setMajor1TotalCredit] = useState(0);
  const [currentMajor1Credit, setCurrentMajor1Credit] = useState(0);
  const [totalMajor2Credit, setMajor2TotalCredit] = useState(0);
  const [currentMajor2Credit, setCurrentMajor2Credit] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isLoadingPath, setIsLoadingPath] = useState(false);
  const [isPathCompleted, setIsPathCompleted] = useState(false);
  const [isUnitSufficient, setIsUnitSufficient] = useState(true);
  const [isExportAs, setIsExportAs] = useState(false);

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
  }
  async function handleDegreeChange(e) {
    setUserInfo({ ...userInfo, degree: e.target.value });
    setMajor1Data(
      await getInfoData(
        `http://localhost:5000/api/degree/${e.target.value}/major`,
        "Major"
      )
    );
    setIsDegreeSelected(true);
  }
  function handleMajor1Change(e) {
    setUserInfo({ ...userInfo, major1: e.target.value });

    //Option that is selected in major1 does not appear on major2 list
    setMajor2Data(
      major1Data.filter((arr) => arr.MajorId.toString() !== e.target.value)
    );
    setYearData(yearObj);
    setIsMajor1Selected(true);
  }
  function handleMajor2Change(e) {
    setUserInfo({ ...userInfo, major2: e.target.value });
  }
  function handleYearChange(e) {
    setUserInfo({ ...userInfo, startYear: e.target.value });
  }

  // Check all required options are selected
  function onInfoConfirmClick(e) {
    if (
      userInfo.campus === "" ||
      userInfo.degree === "" ||
      userInfo.major1 === "" ||
      userInfo.startYear === ""
    ) {
      e.preventDefault();
      setIsErrorMsgSelected(true);
    }
  }

  // -----For <UserMain> Pages-------------------------------------------------------
  // Get course data according to the selected option
  async function getCourseCardData(paramObj = {}) {
    try {
      const degreeRes = await axios({
        method: "GET",
        url: `http://localhost:5000/api/degree/${userInfo.degree}`,
      });
      const major1Res = await axios({
        method: "GET",
        url: `http://localhost:5000/api/major/${userInfo.major1}`,
      });
      const major2Res = await axios({
        method: "GET",
        url: `http://localhost:5000/api/major/${userInfo.major2}`,
      });
      const { Max_Year, Total_Credit } = degreeRes.data.result;
      console.log(major1Res);
      setMaxYear(Max_Year);
      setTotalCredit(Total_Credit);
      setMajor1TotalCredit(major1Res.data.result.Total_Unit);
      setMajor2TotalCredit(major2Res.data.result.Total_Unit);
      let courseIDList = [];
      const degreeCourseRes = await axios({
        method: "GET",
        url: `http://localhost:5000/api/degree/${userInfo.degree}/course`,
        params: {
          campusId: userInfo.campus,
        },
      });

      const major1CourseRes = await axios({
        method: "GET",
        url: `http://localhost:5000/api/major/${userInfo.major1}/course`,
        params: {
          campusId: userInfo.campus,
        },
      });
      const major2CourseRes =
        userInfo.major2 === ""
          ? null
          : await axios({
              method: "GET",
              url: `http://localhost:5000/api/major/${userInfo.major2}/course`,
              params: {
                campusId: userInfo.campus,
              },
            });
      const major2Courses = major2CourseRes
        ? processCourseList(major2CourseRes.data.result, "major2")
        : [];

      courseIDList = [
        ...courseIDList,
        ...processCourseList(degreeCourseRes.data.result, "core"),
        ...processCourseList(major1CourseRes.data.result, "major1"),
        ...major2Courses,
      ];
      const courseUnit = courseIDList.reduce((prev, cur) => {
        return prev + cur.unit;
      }, 0);
      console.log(Total_Credit);
      setIsUnitSufficient(courseUnit >= Total_Credit ? true : false);
      setCourseBoxes(courseIDList);
    } catch (error) {
      setIsUnitSufficient(false);
    }
  }
  function processCourseList(courseList, type) {
    return courseList.map((course) => {
      return {
        courseId: course.Course_ID,
        courseName: course.Course_Name,
        isCompulsory: course.Type === "Core" || course.Type === "Compulsory",
        box: "box__" + type,
        type: type,
        unit: course.Unit,
        requiredUnit: course.Required_Unit,
        assumedKnowledge: course.Assumed_Knowledge,
        availability: course.Availability,
      };
    });
  }
  // Calculate current credit amount
  function calCredit() {
    setCurrentCredit(
      courseBoxes.reduce((prevVal, curVal) => {
        if (curVal.box.substr(0, 3) !== "box")
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0)
    );
    setCurrentMajor1Credit(
      courseBoxes.reduce((prevVal, curVal) => {
        if (curVal.box.substr(0, 3) !== "box" && curVal.type === "major1")
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0)
    );
    setCurrentMajor2Credit(
      courseBoxes.reduce((prevVal, curVal) => {
        if (curVal.box.substr(0, 3) !== "box" && curVal.type === "major2")
          return (prevVal = prevVal + curVal.unit);
        else return prevVal;
      }, 0)
    );
  }

  function onYearAddClick(e) {
    setErrorMsg("");
    setWarning(null);
    setIsErrOrWarn(false);

    // Check maximum year number (if you want 6 years maximum: > 6)
    if (yearCount.length + 1 > maxYear) {
      e.preventDefault();
      setErrorMsg(maxYear + " years Maximum!");
      setIsErrOrWarn(true);
      return;
    }

    setYearCount(yearCount.concat([yearCount.length]));
  }

  function onYearDeleteClick(e) {
    setErrorMsg("");
    setWarning(null);
    setIsErrOrWarn(false);

    // Check minimum year number
    if (yearCount.length - 1 < 2) {
      e.preventDefault();
      setErrorMsg("2 years Minimum!");
      setIsErrOrWarn(true);
      return;
    }

    const deletedList = yearCount.filter((idx) => idx < yearCount.length - 1);
    setYearCount(deletedList);
  }

  // When go back to <InfoCheck> page, reset user info, error message and warning
  function onBackClick() {
    setUserInfo({
      campus: "",
      degree: "",
      major1: "",
      major2: "",
      startYear: "",
    });
    setYearCount([0, 1]);
    setErrorMsg("");
    setWarning(null);
    setIsErrOrWarn(false);
    setIsErrorMsgSelected(false);
  }

  function handleClearPath() {
    setCourseBoxes((prevBoxes) => {
      return prevBoxes.map((course) => {
        return {
          ...course,
          box: `box__${course.type}`,
        };
      });
    });
    setErrorMsg("");
    setWarning(null);
    setIsErrOrWarn(false);
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
          isCompulsory={courseBoxes.isCompulsory}
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
  }
  function onDragOver() {
    setAvailability(null);
  }

  function onDrop(dropId, boxName) {
    setWarning(null);
    setErrorMsg(null);
    setIsErrOrWarn(false);

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

      const {
        box,
        unit,
        type,
        isCompulsory,
        requiredUnit,
        assumedKnowledge,
        availability,
      } = prevBoxes.find((box) => box.courseId === dropId);

      if (totalUnit < requiredUnit) {
        setErrorMsg(
          `${dropId} require you to complete ${requiredUnit} units before enrolled`
        );
        setIsErrOrWarn(true);

        return [...prevBoxes];
      }
      if (!isCompulsory) {
        if (
          type === "major1" &&
          box.substr(0, 3) === "box" &&
          currentMajor1Credit + unit + getUnit(prevBoxes, type, false, true) >
            totalMajor1Credit
        ) {
          setErrorMsg(`You have reach maximum directed course for major 1`);
          setIsErrOrWarn(true);
          return [...prevBoxes];
        }
        if (
          type === "major2" &&
          box.substr(0, 3) === "box" &&
          currentMajor2Credit + unit + getUnit(prevBoxes, type, false, true) >
            totalMajor2Credit
        ) {
          setErrorMsg(`You have reach maximum directed course for major 2`);
          setIsErrOrWarn(true);
          return [...prevBoxes];
        }

        if (
          type === "core" &&
          box.substr(0, 3) === "box" &&
          totalMajor1Credit +
            totalMajor2Credit +
            getCoreUnit(prevBoxes) +
            unit >
            totalCredit
        ) {
          setErrorMsg(`You have reach maximum elective course for your degree`);
          setIsErrOrWarn(true);
          return [...prevBoxes];
        }
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
  }
  function getUnit(courseList, type, isCompleted, isCompulsory) {
    const totalUnit = courseList.reduce((prevVal, curVal) => {
      const checkIdCompleted = isCompleted
        ? curVal.box.substr(0, 3) !== "box"
        : curVal.box.substr(0, 3) === "box";
      if (
        checkIdCompleted &&
        curVal.type === type &&
        curVal.isCompulsory === isCompulsory
      )
        return (prevVal = prevVal + curVal.unit);
      else return prevVal;
    }, 0);
    return totalUnit;
  }
  function getCoreUnit(courseList) {
    return courseList.reduce((prevVal, curVal) => {
      if (curVal.type === "core" && curVal.isCompulsory)
        return (prevVal = prevVal + curVal.unit);
      else return prevVal;
    }, 0);
  }
  function generatePath() {
    setIsLoadingPath(true);
    let { year, semester } = getNextYearAndSem(courseBoxes);
    if (!year && !semester) {
      year = parseInt(userInfo.startYear);
      semester = parseInt(1);
    }
    let courseList = courseBoxes;
    let credit = currentCredit,
      target = totalCredit;
    let major1Credit = currentMajor1Credit,
      targetMajor1Credit = totalMajor1Credit;
    let major2Credit = currentMajor2Credit,
      targetMajor2Credit = totalMajor2Credit;
    //handle all multi-sequence course that have part A and part B which need to complete in consecutive term
    const assumedKnowledgeList = courseList.reduce((prev, cur) => {
      return prev.concat(cur.assumedKnowledge);
    }, []);
    courseList.sort((first, second) => {
      return second.isCompulsory - first.isCompulsory;
    });
    courseList.forEach((course) => {
      if (
        course.courseId.substr(-1) === "A" &&
        course.box.substr(0, 3) !== "box"
      ) {
        //if there is any part A course which have been dragged to the dropbox,
        //check if part B course is also dragged
        const partB = courseList.find(
          (c) =>
            c.courseId ===
              `${course.courseId.substr(0, course.courseId.length - 1)}B` &&
            c.box.substr(0, 3) === "box"
        );
        let nextSemester =
          parseInt(course.box.substr(-1)) === 3
            ? 1
            : parseInt(course.box.substr(-1)) + 1;
        let nextYear =
          nextSemester === 1
            ? parseInt(course.box.substr(0, 4)) + 1
            : parseInt(course.box.substr(0, 4));
        //check if part B course is still not dragged and the next semester is full
        if (
          partB &&
          courseList.filter((c) => c.box === `${nextYear}__tri${nextSemester}`)
            .length === 4
        ) {
          console.log("partB back to list");
          //if the next semester is full
          //send the part A course back to the box__core
          courseList = courseList.map((c) => {
            if (c.courseId === course.courseId)
              return { ...c, box: `box__${c.type}` };
            return c;
          });
        } else if (partB) {
          console.log("part B to next sem");
          //if nextsemester is not full,
          //put the part B course into it
          courseList = courseList.map((c) => {
            if (
              c.courseId ===
              `${course.courseId.substr(0, course.courseId.length - 1)}B`
            ) {
              credit += c.unit;
              return { ...c, box: `${nextYear}__tri${nextSemester}` };
            }

            return c;
          });
        }
      }
    });
    //started to fill the courses from where the user left
    while (credit < target) {
      //get the num of course for the next semester
      let numOfCourse = courseList.filter(
        (c) =>
          parseInt(c.box.substr(0, 4)) === year &&
          parseInt(c.box.substr(-1)) === semester
      ).length;
      courseList = courseList.map((course) => {
        const {
          courseId,
          box,
          availability,
          requiredUnit,
          unit,
          assumedKnowledge,
        } = course;
        const isAssumedKnowledge =
          assumedKnowledgeList.findIndex(
            (ak) => ak.Alternative1 === courseId || ak.Alternative2 === courseId
          ) > -1;
        if (
          box.substr(0, 3) === "box" &&
          (availability.findIndex(
            (ava) => ava.year === year && ava.semester === semester
          ) > -1 ||
            year > new Date().getFullYear()) &&
          requiredUnit <= credit &&
          numOfCourse < 4 &&
          isAssumedKnowledge &&
          courseId.substr(-1) !== "A"
        ) {
          numOfCourse++;
          credit += unit;
          major1Credit =
            course.type === "major1" ? major1Credit + unit : major1Credit;
          major2Credit =
            course.type === "major2" ? major2Credit + unit : major2Credit;
          return { ...course, box: `${year}__tri${semester}` };
        }
        return course;
      });
      courseList = courseList.map((course) => {
        const {
          courseId,
          box,
          availability,
          requiredUnit,
          unit,
          assumedKnowledge,
        } = course;

        //check if the course is not dragged
        //check if the course is available to fill in the current semester(from where the user left)
        //check if the box already have 4 courses(full)
        //check if the assumedknowledge for the course already completed
        if (
          box.substr(0, 3) === "box" &&
          (availability.findIndex(
            (ava) => ava.year === year && ava.semester === semester
          ) > -1 ||
            year > new Date().getFullYear()) &&
          requiredUnit <= credit &&
          numOfCourse < 4 &&
          checkAssumedKnowledge(courseList, year, semester, assumedKnowledge)
        ) {
          //if the course will cause the credit to be exceeded, dont put it in
          if (credit + unit > target) return course;
          //if it is part A course, put the part B course into next semester as well
          if (courseId.substr(-1) === "A") {
            const partBIndex = courseList.findIndex(
              (c) =>
                c.courseId === `${courseId.substr(0, courseId.length - 1)}B`
            );
            courseList[partBIndex].box = `${
              semester === 3 ? year + 1 : year
            }__tri${semester === 3 ? 1 : semester + 1}`;
            console.log(credit);
            credit = credit + unit + courseList[partBIndex].unit;
            console.log(credit);
            numOfCourse++;

            return {
              ...course,
              box: `${year}__tri${semester}`,
            };
            //check if it is major 1 course
            //check if the major 1 credit exceeded
            //check if the directed course exceeded
          } else if (
            course.type === "major1" &&
            major1Credit < targetMajor1Credit &&
            (course.isCompulsory ||
              major1Credit +
                course.unit +
                getUnit(courseList, "major1", false, true) <=
                targetMajor1Credit)
          ) {
            major1Credit += unit;
            numOfCourse++;
            credit += unit;
            return {
              ...course,
              box: `${year}__tri${semester}`,
            };
          } else if (
            //same as the validation for major 1
            course.type === "major2" &&
            major2Credit < targetMajor2Credit &&
            (course.isCompulsory ||
              major2Credit +
                course.unit +
                getUnit(courseList, "major2", false, true) <=
                targetMajor2Credit)
          ) {
            major2Credit += unit;
            numOfCourse++;
            credit += unit;
            return {
              ...course,
              box: `${year}__tri${semester}`,
            };
          } else if (
            course.type === "core" &&
            (course.isCompulsory ||
              targetMajor1Credit +
                targetMajor2Credit +
                getCoreUnit(courseList) +
                unit <
                target)
          ) {
            numOfCourse++;
            credit += unit;
            return {
              ...course,
              box: `${year}__tri${semester}`,
            };
          }
        }

        return course;
      });
      year = semester === 3 ? year + 1 : year; //proceed to next semester
      semester = semester === 3 ? 1 : semester + 1;
    }
    const { year: finalYear, semester: finalSem } =
      getNextYearAndSem(courseList);
    setTimeout(() => {
      //create a loading with 1 second
      setErrorMsg(null);
      setWarning(null);
      setIsErrOrWarn(false);
      setIsLoadingPath(false);

      setYearCount([
        ...Array(
          finalSem === 1
            ? finalYear - userInfo.startYear
            : finalYear - userInfo.startYear + 1
        ).keys(),
      ]);
      setCourseBoxes(courseList);
    }, 1000);
  }
  function checkAssumedKnowledge(courses, year, sem, assumedKnowledge) {
    //this function is to check if the assumed knowledge have been cleared

    if (
      assumedKnowledge.length === 1 &&
      !assumedKnowledge[0].Alternative1 &&
      !assumedKnowledge[0].Alternative2
    ) {
      return true;
    }
    const passedList = courses.filter((c) => {
      //courses that have been completed
      const isDragged = c.box.substr(0, 3) !== "box";
      const courseYear = parseInt(c.box.substr(0, 4));
      const courseSem = parseInt(c.box.substr(-1));
      return (
        isDragged &&
        (courseYear < year || (courseYear === year && courseSem < sem))
      );
    });
    let isFound = false;
    for (var i = 0; i < assumedKnowledge.length; i++) {
      const { Alternative1, Alternative2 } = assumedKnowledge[i];
      let x;
      for (x = 0; x < passedList.length; x++) {
        if (
          Alternative1 === passedList[x].courseId ||
          Alternative2 === passedList[x].courseId
        )
          break;
      }
      //if the assumedknowledge was cleared,x will be less that the length since it will be break earlier
      if (x === passedList.length) return false;
    }
    return true;
  }
  function getNextYearAndSem(courses) {
    //get the year and semester where the user have dragged until
    const draggedCourses = courses.filter(
      (course) => course.box.substr(0, 3) !== "box"
    );
    let year = 0,
      semester = 0;
    draggedCourses.forEach((course) => {
      const boxYear = parseInt(course.box.substr(0, 4));
      const boxSem = parseInt(course.box.substr(-1));
      if (boxYear > year) {
        year = boxYear;
        semester = boxSem;
      } else if (boxYear === year && boxSem > semester) semester = boxSem;
    });
    if (year > 0 && semester > 0) {
      return {
        year: semester === 3 ? year + 1 : year,
        semester: semester === 3 ? 1 : semester + 1,
      };
    }
    return {};
  }

  function onExportAsClicked() {
    setIsExportAs(true);
  }

  function onExportCancelClicked() {
    setIsExportAs(false);
  }

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
        totalMajor1Credit,
        totalMajor2Credit,
        currentMajor1Credit,
        currentMajor2Credit,
        isHover,
        isLoadingPath,
        isPathCompleted,
        isUnitSufficient,
        isExportAs,
        setIsPathCompleted,
        handleClearPath,
        setIsLoadingPath,
        setIsHover,
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
        generatePath,
        onExportAsClicked,
        onExportCancelClicked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
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
