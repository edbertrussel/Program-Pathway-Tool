import { useUserContext } from "../Context/UserContext.js";
import { useDrop } from "react-dnd";

function CourseBox({ type }) {
  const { onDrop, setBoxForCourse } = useUserContext();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.id, `box__${type}`),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`box__${type}`}>
      {setBoxForCourse(`box__${type}`)}
    </div>
  );
}
export default CourseBox;
