import "./AdminHome.css";
import HomeComponent from "../HomeComponent";
import TopBar from "../TopBar";
import { useEffect } from "react";

function AdminHome() {
  return (
    <>
      <TopBar />
      <HomeComponent />
    </>
  );
}

export default AdminHome;
