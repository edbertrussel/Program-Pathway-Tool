import './SelectCourse.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SelectCourse(props) {
  return (
    <div className="SelectCourse">
      <div className="contentHeader">
        <div className="searchBox">
          <input type="text" className="input__search" placeholder="Search"></input>
          <button className="btn__search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="faMagnifyingGlass"
            />
          </button>
        </div>
        <div className="title">Courses</div>
        <div className='blank'></div>
      </div>

      <div className="coursetable">
        <div className="tableHeader">
          <div className="header__core">Core</div>
          <div className="header__major1">Major 1</div>
          <div className="header__major2">Major 2</div>
        </div>
        <div className="courseBox">
          <div className="box__core">
            <div id="engg1003" className="coursecard" >ENGG 1003</div>
            <div id="seng1050" className="coursecard" >SENG 1050</div>
            <div id="inft2012" className="coursecard" >INFT 2012</div>
            <div id="comp1140" className="coursecard" >COMP 1140</div>
          </div>
          <div className="box__major1">
          </div>
          <div className="box__major2">
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCourse;