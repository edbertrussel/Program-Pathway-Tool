import './SelectCourse.css'
import React from 'react';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SelectCourse(props) {
  const [, drop] = useDrop(() => ({
    accept: 'course',
  }))

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
          <div ref={drop} className="box__core">
            {props.setBoxForCourse("box__core")}
          </div>
          <div ref={drop} className="box__major1">
            {props.setBoxForCourse("box__major1")}
          </div>
          <div ref={drop} className="box__major2">
            {props.setBoxForCourse("box__major2")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCourse;