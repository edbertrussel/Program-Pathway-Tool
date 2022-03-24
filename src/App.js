import { UserContextProvider } from "./components/Context/UserContext.js";
import { AdminContextProvider } from "./components/Context/AdminContext.js";
import InfoCheck from "./components/User/Page/InfoCheck.js";
import UserMain from "./components/User/Page/UserMain.js";
import AdminLogin from "./components/Admin/Page/AdminLogin.js";
import AdminHome from "./components/Admin/Page/AdminHome.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddCampus from "./components/Admin/Page/CampusPage.js";
import CampusPage from "./components/Admin/Page/CampusPage.js";
import MajorPage from "./components/Admin/Page/MajorPage.js";
import DegreePage from "./components/Admin/Page/DegreePage.js";
import CoursePage from "./components/Admin/Page/CoursePage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <UserContextProvider>
              <InfoCheck />
            </UserContextProvider>
          }
        />
        <Route
          path="/usermain"
          element={
            <UserContextProvider>
              <UserMain />
            </UserContextProvider>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route
          path="/admin/home"
          element={
            <AdminContextProvider>
              <AdminHome />
            </AdminContextProvider>
          }
        ></Route>
        <Route
          path="/admin/campus/:id/edit"
          element={<CampusPage type="edit" />}
        ></Route>
        <Route
          path="/admin/campus/add"
          element={<CampusPage type="add" />}
        ></Route>
        <Route
          path="/admin/major/:id/edit"
          element={<MajorPage type="edit" />}
        ></Route>
        <Route
          path="/admin/major/add"
          element={<MajorPage type="add" />}
        ></Route>
        <Route
          path="/admin/degree/add"
          element={<DegreePage type="add" />}
        ></Route>
        <Route
          path="/admin/degree/:id/edit"
          element={<DegreePage type="edit" />}
        ></Route>
        <Route
          path="/admin/course/:id/edit"
          element={<CoursePage type="edit" />}
        ></Route>
        <Route
          path="/admin/course/add"
          element={<CoursePage type="add" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
