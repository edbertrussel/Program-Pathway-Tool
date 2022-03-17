import "./AdminHome.css";
import HomeComponent from "../HomeComponent";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
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

  return (
    <>
      <TopBar />
      <HomeComponent />
    </>
  );
}

export default AdminHome;
