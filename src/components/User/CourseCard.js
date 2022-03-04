import React from "react";
import { useDrag } from "react-dnd";

function CourseCard(props) {
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