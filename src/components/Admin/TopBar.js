import logo from "../../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="top-bar">
      <Link
        key="link__home"
        className="link__home"
        to="/"
      >
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <button className="btn-gray">
        <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
        <span style={{ marginLeft: "10px" }}>Logout</span>
      </button>
    </div>
  );
}
export default TopBar;
