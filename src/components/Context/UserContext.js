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

  const onInfoConfirmClick = (e) => {
    if (userInfo.campus === '' || userInfo.degree === '' || userInfo.major === '' || userInfo.startYear === '') {
      e.preventDefault();
      alert("Please select all items!");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        getCampusData,
        campusData,
        degreeData,
        majorData,
        yearData,
        isCampusSelected,
        isDegreeSelected,
        isMajorSelected,
        handleCampusChange,
        handleDegreeChange,
        handleMajorChange,
        handleYearChange,
        onInfoConfirmClick,
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