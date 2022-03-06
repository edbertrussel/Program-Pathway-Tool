import { useUserContext } from "../Context/UserContext";
import { useDrop } from "react-dnd"

function DropBox({ year, availability }) {
  const { onDrop, setBoxForCourse } = useUserContext();

  const [, drop__tri1] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.id, `${year}__tri1`),
  }));

  const [, drop__tri2] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.id, `${year}__tri2`),
  }));

  const [, drop__tri3] = useDrop(() => ({
    accept: "course",
    drop: (item) => onDrop(item.id, `${year}__tri3`),
  }));

  return (
    <div className="DropBox">
      <div className="box__year">{year}</div>
      <div
        ref={drop__tri1}
        key={year + "__tri1"}
        className={`box ${availability === null
          ? ""
          : availability.length === 0
            ? "box-allowed"
            : availability.findIndex((avail) => avail.semester === 1) > -1
              ? "box-allowed"
              : ""
          }`}
      >
        {setBoxForCourse(year + "__tri1")}
      </div>
      <div
        ref={drop__tri2}
        key={year + "__tri2"}
        className={`box ${availability === null
          ? ""
          : availability.length === 0
            ? "box-allowed"
            : availability.findIndex((avail) => avail.semester === 2) > -1
              ? "box-allowed"
              : ""
          }`}
      >
        {setBoxForCourse(year + "__tri2")}
      </div>
      <div
        ref={drop__tri3}
        key={year + "__tri3"}
        className={`box ${availability === null
          ? ""
          : availability.length === 0
            ? "box-allowed"
            : availability.findIndex((avail) => avail.semester === 3) > -1
              ? "box-allowed"
              : ""
          }`}
      >
        {setBoxForCourse(year + "__tri3")}
      </div>
    </div>
  );
}

export default DropBox;