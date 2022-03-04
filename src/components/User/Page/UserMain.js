import { useUserContext } from "../../Context/UserContext.js";
import logo from "../../../logo.png"
import "./UserMain.css";
import SelectCourse from "../SelectCourse.js";
import DropBox from "../DropBox.js";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrop } from 'react-dnd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function UserMain() {
  const { userInfo, yearCount, setBoxForCourse, onYearAddClick, onYearDeleteClick } = useUserContext();

  const startYear = parseInt(userInfo.startYear);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="UserMain">
        <header>
          <img src={logo} className="logo" alt="logo" />
        </header>
        <div className="content">
          <div className="mainContent">
            <div className="droptable">
              <div className="tableHeader">
                <div className="header__year">Year</div>
                <div className="header__tri">Trimester 1</div>
                <div className="header__tri">Trimester 2</div>
                <div className="header__tri">Trimester 3</div>
              </div>

              {yearCount.map((i) => (
                <>
                  <DropBox
                    key={startYear + i}
                    getYearValue={startYear + i}
                    setBoxForCourse={setBoxForCourse}
                  />
                </>
              ))}

              <div className="handleYear">
                <div className="blank"></div>
                <button className="btn__addYear" onClick={(e) => onYearAddClick(e)}>
                  ADD YEAR
                </button>
                <div className="deleteYear">
                  <button
                    className="btn__deleteyear"
                    onClick={(e) => onYearDeleteClick(e)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size="lg"
                      className="iconTrashCan"
                    />
                  </button>
                </div>
              </div>

              <div className="buttons">
                <div className="blank"></div>
                <Link key="link__back" className="link__back" to="/">
                  Back
                </Link>
                <button className="btn__showpath">Show My Path</button>
              </div>
            </div>

            <SelectCourse />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default UserMain;