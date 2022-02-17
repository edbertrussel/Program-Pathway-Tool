import logo from '../logo.png'
import './UserMain.css'
import SelectCourse from './SelectCourse';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';

function UserMain(props) {
  const [yearNumber, setYearNumber] = useState([0, 1]);

  const startYear = parseInt(props.getYearValue);

  const onAddClick = (e) => {
    // Check maximum year number (if you want 6 years maximum: > 6)
    if (yearNumber.length + 1 > 5) {
      e.preventDefault();
      alert("5 years Maximum!");
      return;
    }

    setYearNumber(yearNumber.concat([yearNumber.length]));
  }

  const onDeleteClick = (e) => {
    // Check minimum year number
    if (yearNumber.length - 1 < 2) {
      e.preventDefault();
      alert("2 years Minimum!");
      return;
    }

    const deletedList = yearNumber.filter((index) => index < yearNumber.length - 1)
    setYearNumber(deletedList);
  }

  return (
    <div className='UserMain'>
      <header>
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className='content'>
        <div className='mainContent'>
          <div className='droptable'>
            <div className='tableHeader'>
              <div className="header__year">Year</div>
              <div className="header__tri">Trimester 1</div>
              <div className="header__tri">Trimester 2</div>
              <div className="header__tri">Trimester 3</div>
            </div>

            {yearNumber.map(i =>
              <>
                <DropBox
                  key={startYear + i}
                  getYearValue={startYear + i}
                />
              </>
            )}

            <div className="handleYear">
              <div className='blank'></div>
              <button className="btn__addYear" onClick={(e) => onAddClick(e)}>ADD YEAR</button>
              <div className='deleteYear'>
                <button className="btn__deleteyear" onClick={(e) => onDeleteClick(e)}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size="lg"
                    className="iconTrashCan"
                  />
                </button>
              </div>
            </div>

            <div className="buttons">
              <div className='blank'></div>
              <Link
                key="link__back"
                className="link__back"
                to="/"
              >
                Back
              </Link>
              <button className="btn__showpath">Show My Path</button>
            </div>
          </div>

          <SelectCourse />

        </div>
      </div>
    </div>

  );
}

function DropBox(props) {

  return (
    <div className='DropBox'>
      <div className="box__year">{props.getYearValue}</div>
      <div key={props.getYearValue.toString() + "__tri1"} className="box"></div>
      <div key={props.getYearValue.toString() + "__tri2"} className="box"></div>
      <div key={props.getYearValue.toString() + "__tri3"} className="box"></div>
    </div>
  );
}


export default UserMain;