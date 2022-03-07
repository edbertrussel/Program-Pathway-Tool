import { UserContextProvider } from "./components/Context/UserContext.js";
import { AdminContextProvider } from "./components/Context/AdminContext.js";
import InfoCheck from "./components/User/Page/InfoCheck.js";
import UserMain from "./components/User/Page/UserMain.js";
import AdminLogin from "./components/Admin/Page/AdminLogin.js";
import AdminHome from "./components/Admin/Page/AdminHome.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";

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
        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          }
        ></Route>
        <Route
          path="/admin/home"
          element={
            <AdminContextProvider>
              <AdminHome />
            </AdminContextProvider>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
