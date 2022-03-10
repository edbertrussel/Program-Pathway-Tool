import "./AdminHome.css";
import HomeComponent from "../HomeComponent";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import HttpRequest from "../../../HttpRequest";

function AdminHome() {
  
  let navigate = useNavigate();

  useEffect(() => {
    const CheckUserInfo = () => {
      HttpRequest.get("http://localhost:5000/api/admin")
      .then(res => {
        if (res.data.Admin_Name == null) {
          return navigate("/admin/login");
        }
      })
    };

    CheckUserInfo();
  }, []);
 

/*   useEffect(() => {
    checkUserInfo()
    //alert(checkUser)
    if (checkUser == null){
      return navigate("/admin/login")
    }
  }, [checkUser]); */

/*    useEffect(() => {
    axios.get("http://localhost:5000/api/admin")
     
    .then( res => {
      setCheckUser(res.data);
    })

    if (checkUser == null){
      return navigate("/admin/login")
    }
  }, [checkUser]); 
 */
      
  return (
    <>
      <TopBar />
      <HomeComponent />
    </>
  );
}

export default AdminHome;
