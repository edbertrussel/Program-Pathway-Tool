import { useUserContext } from "../Context/UserContext";
import { useDrop } from "react-dnd"

function DropBox(props) {
  const { onDrop } = useUserContext();

  const [, drop__tri1] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.name, props.getYearValue + "__tri1"),
  }));

  const [, drop__tri2] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.name, props.getYearValue + "__tri2"),
  }));

  const [, drop__tri3] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.name, props.getYearValue + "__tri3"),
  }));

  return (
    <div className="DropBox">
      <div className="box__year">{props.getYearValue}</div>
      <div ref={drop__tri1} key={props.getYearValue + "__tri1"} className="box">
        {props.setBoxForCourse(props.getYearValue + "__tri1")}
      </div>
      <div ref={drop__tri2} key={props.getYearValue + "__tri2"} className="box">
        {props.setBoxForCourse(props.getYearValue + "__tri2")}
      </div>
      <div ref={drop__tri3} key={props.getYearValue + "__tri3"} className="box">
        {props.setBoxForCourse(props.getYearValue + "__tri3")}
      </div>
    </div>
  );
}

export default DropBox;