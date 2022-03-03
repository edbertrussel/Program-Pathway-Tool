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
  // const [, drag] = useDrag(() => ({
  //   type: 'course',
  //   item: { name: props.courseName, },
  //   end: (monitor) => {
  //     const dropResult = monitor.getDropResult();
  //     console.log(dropResult);
  //     // changeCardBox(dropResult.boxName);
  //   }
  // }))

  return (
    <div
      ref={drag}
      className="CourseCard"
      onDrag={() => {
        props.onDrag(props.courseName);
      }}
      onDragEnd={() => {
        props.onDragOver();
      }}
    >
      {props.courseName}
    </div>
  );
}

export default CourseCard;
