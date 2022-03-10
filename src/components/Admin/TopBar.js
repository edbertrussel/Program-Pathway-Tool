import logo from "../../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import HttpRequest from "../../HttpRequest";



function TopBar() {

  const  [redirect, setRedirect] = useState(false)
  let navigate = useNavigate();

  const Logout = (e) => {
    e.preventDefault();

    HttpRequest.post("http://localhost:5000/api/admin/logout")
    .then( res => {
       //alert(res.data.status);
       setRedirect(true);
    }) 
  }; 

  useEffect(() => {
    if (redirect){
      return navigate("/admin/login")
    }
  }, [redirect]);

  return (
    <div className="top-bar">
      <img src={logo} className="logo"></img>
      <button className="btn-gray" onClick={Logout}>
        <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
        <span style={{ marginLeft: "10px" }}>Logout</span>
      </button>
    </div>
  );
}
export default TopBar;
