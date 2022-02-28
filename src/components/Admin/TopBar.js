import logo from "../../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
function TopBar() {
  return (
    <div className="top-bar">
      <img src={logo} className="logo"></img>
      <button className="btn-gray">
        <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
        <span style={{ marginLeft: "10px" }}>Logout</span>
      </button>
    </div>
  );
}
export default TopBar;
