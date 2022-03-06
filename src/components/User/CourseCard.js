import { useUserContext } from "../Context/UserContext.js";
import React from "react";
import { useDrag } from "react-dnd";

function CourseCard({ courseId, courseName }) {
  const { onDrag, isHover, setIsHover } = useUserContext();
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
      className={`${isHover ? "CourseCard-name" : "CourseCard"}`}
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