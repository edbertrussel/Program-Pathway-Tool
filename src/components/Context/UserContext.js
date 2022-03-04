import CourseCard from "../User/CourseCard";
import React from "react";
import { useContext, useState, useEffect } from "react";
import HttpRequest from "../../HttpRequest";
import axios from "axios";

const UserContext = React.createContext();
function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    campus: '',
    degree: '',
    major: '',
    startYear: '',
  });
  const [campusData, setCampusData] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [majorData, setMajorData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [isCampusSelected, setCampusSelected] = useState(false);
  const [isDegreeSelected, setDegreeSelected] = useState(false);
  const [isMajorSelected, setMajorSelected] = useState(false);
  const [yearCount, setYearCount] = useState([0, 1]);
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

  async function getCampusData() {
    try {
      let {
        data: { result },
      } = await HttpRequest({
        method: "GET",
        url: '/api/campus',
      });
      setCampusData(result.map(obj => obj.Campus_Name));

      const majorAry = majorObj.map(obj => obj.Major_Name)
      setMajorData(majorAry);

      const yearAry = yearObj.map(obj => obj.Year)
      setYearData(yearAry);

    } catch (err) {
      console.log(err);
    }
  };
  async function getDegreeData() {
    try {
      let {
        data: { result },
      } = await HttpRequest({
        method: "GET",
        url: '/api/degree',
      });
      setDegreeData(result.map(obj => obj.Degree_Name));
    } catch (err) {
      console.log(err);
    }
  };
  // async function getMajorData() {
  //   try {
  //     let {
  //       data: { result },
  //     } = await HttpRequest({
  //       method: "GET",
  //       url: '/api/major',
  //     });
  //     setMajorData(result.map(obj => obj.Major_Name));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // async function getYearData() {
  //   try {
  //     let {
  //       data: { result },
  //     } = await HttpRequest({
  //       method: "GET",
  //       url: '/api/year',
  //     });
  //     setYearData(result.map(obj => obj.Year));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // When an option is selected.
  const handleCampusChange = (e) => {
    setUserInfo({ ...userInfo, campus: e.target.value });
    getDegreeData();
    if (!isCampusSelected)
      setCampusSelected(true);
  };
  const handleDegreeChange = (e) => {
    setUserInfo({ ...userInfo, degree: e.target.value });
    if (!isDegreeSelected)
      setDegreeSelected(true);
  };
  const handleMajorChange = (e) => {
    setUserInfo({ ...userInfo, major: e.target.value });
    if (!isMajorSelected)
      setMajorSelected(true);
  };
  const handleYearChange = (e) => {
    setUserInfo({ ...userInfo, startYear: e.target.value });
  };

  // Following 'courseBoxes' state value, render <CourseCard> corresponding box
  const setBoxForCourse = (boxName) => {
    return courseBoxes
      .filter((courseBoxes) => courseBoxes.box === boxName)
      .map((courseBoxes) => (
        <CourseCard
          key={courseBoxes.Course_ID}
          courseName={courseBoxes.Course_ID}
        />
      ))
  }

  const onDrop = (courseId, boxName) => {
    setCourseBoxes((prevBoxes) => {
      return prevBoxes.map((Box) => {
        return courseId === Box.Course_ID
          ? { ...Box, box: boxName }
          : { ...Box };
      });
    });
  };

  const onInfoConfirmClick = (e) => {
    if (userInfo.campus === '' || userInfo.degree === '' || userInfo.major === '' || userInfo.startYear === '') {
      e.preventDefault();
      alert("Please select all items!");
    }
  };

  const onYearAddClick = (e) => {
    // Check maximum year number (if you want 6 years maximum: > 6)
    if (yearCount.length + 1 > 5) {
      e.preventDefault();
      alert("5 years Maximum!");
      return;
    }

    setYearCount(yearCount.concat([yearCount.length]));
  };

  const onYearDeleteClick = (e) => {
    // Check minimum year number
    if (yearCount.length - 1 < 2) {
      e.preventDefault();
      alert("2 years Minimum!");
      return;
    }

    const deletedList = yearCount.filter(
      (idx) => idx < yearCount.length - 1
    );
    setYearCount(deletedList);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        campusData,
        degreeData,
        majorData,
        yearData,
        isCampusSelected,
        isDegreeSelected,
        isMajorSelected,
        yearCount,
        getCampusData,
        handleCampusChange,
        handleDegreeChange,
        handleMajorChange,
        handleYearChange,
        setBoxForCourse,
        onDrop,
        onInfoConfirmClick,
        onYearAddClick,
        onYearDeleteClick,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext);
export { useUserContext, UserContextProvider };

// Test Data
const majorObj = [
  {
    Major_Id: 1,
    Major_Name: "Systems Development",
  },
  {
    Major_Id: 2,
    Major_Name: "Business Technology",
  },
];

const yearObj = [
  {
    Year: "2017",
  },
  {
    Year: "2018",
  },
  {
    Year: "2019",
  },
  {
    Year: "2020",
  },
  {
    Year: "2021",
  },
  {
    Year: "2022",
  },
];