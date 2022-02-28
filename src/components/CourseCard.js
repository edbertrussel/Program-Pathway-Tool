import React from "react";
import "./CourseCard.css";
import { useDrag } from "react-dnd";

function CourseCard(props) {
  const changeCardBox = (boxName) => {
    const tmpCourseBoxes = props.getCourseBoxes;
    tmpCourseBoxes.box = boxName;
    props.setCourseBoxes(tmpCourseBoxes);
  };

  const [{ isDragging }, drag] = useDrag({
    type: "course",
    item: {
      name: props.courseName,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="CourseCard">
      {props.courseName}
    </div>
  );
}

export default CourseCard;
