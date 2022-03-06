import React, { useState } from "react";
import "./CourseCard.css";
import { useDrag } from "react-dnd";

function CourseCard(props) {
  const [isHover, setIsHover] = useState(false);
  const changeCardBox = (boxName) => {
    const tmpCourseBoxes = props.getCourseBoxes;
    tmpCourseBoxes.box = boxName;
    props.setCourseBoxes(tmpCourseBoxes);
  };
  const [{ isDragging }, drag] = useDrag({
    type: "course",
    item: {
      id: props.courseId,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={` ${isHover ? "CourseCard-name" : "CourseCard"}`}
      onDrag={() => {
        props.onDrag(props.courseId);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      title={props.courseName}
    >
      {isHover ? props.courseName : props.courseId}
    </div>
  );
}

export default CourseCard;
