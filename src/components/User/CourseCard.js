import { useUserContext } from "../Context/UserContext.js";
import React, { useState } from "react";
import { useDrag } from "react-dnd";

function CourseCard({ courseId, courseName, isCompulsory }) {
  const { onDrag } = useUserContext();
  const [isHover, setIsHover] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "course",
    item: {
      id: courseId,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`${isHover ? "CourseCard-name" : "CourseCard"} ${
        isCompulsory ? "course-compulsory" : ""
      }`}
      onDrag={() => {
        onDrag(courseId);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      title={courseName}
    >
      {isHover ? courseName : courseId}
    </div>
  );
}

export default CourseCard;
