import { useEffect, useState } from "react";
import HttpRequest from "../../HttpRequest";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import validateRedirect from "./util/validateRedirect";
import { useNavigate } from "react-router-dom";
function AssumedKnowledge({ onCanvasClosed, courseName, id }) {
  const navigate = useNavigate();
  const [AKList, setAKList] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [course1Chosen, setCourse1Chosen] = useState("");
  const [course2Chosen, setCourse2Chosen] = useState("");
  useEffect(() => {
    HttpRequest({ method: "GET", url: `/api/course/${id}/AssumedKnowledge` })
      .then((res) => {
        setAKList(res.data.AssumedKnowledge);
      })
      .catch((err) => console.log(err));
    HttpRequest({ method: "GET", url: `/api/course` }).then((res) => {
      setCourseData(
        res.data.result.map((course) => ({
          id: course.Course_ID,
          name: course.Course_Name,
        }))
      );
    });
  }, []);
  async function onDelete(AKId) {
    try {
      const res = await HttpRequest({
        method: "DELETE",
        url: `/api/course/${id}/AssumedKnowledge`,
        params: { id: AKId },
      });
      if (res.data.status === "success") {
        const response = await HttpRequest({
          method: "GET",
          url: `/api/course/${id}/AssumedKnowledge`,
        });

        setAKList(response.data.AssumedKnowledge);
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
    }
  }
  async function onAdd() {
    if (course1Chosen !== "") {
      try {
        const res = await HttpRequest({
          method: "POST",
          url: `/api/course/${id}/AssumedKnowledge`,
          params: { courseId: id },
          data: {
            alternative1: course1Chosen,
            alternative2: course2Chosen === "" ? null : course2Chosen,
          },
        });
        if (res.data.status === "success") {
          const response = await HttpRequest({
            method: "GET",
            url: `/api/course/${id}/AssumedKnowledge`,
          });

          setAKList(response.data.AssumedKnowledge);
        }
      } catch (error) {
        alert(validateRedirect(error.response.status));
        if (error.response.status === 403) navigate("/admin/login");
      }
    }
  }
  return (
    <div className="black-background">
      <div className="manage-component">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="x-mark"
          onClick={onCanvasClosed}
        />

        <h3>Assumed Knowledge for "{courseName}"</h3>
        <table className="item-table">
          <thead>
            <tr>
              <th>Alternative 1</th>
              <th>Alternative 2</th>
            </tr>
          </thead>
          <tbody>
            {AKList.map((ak) => {
              return (
                <tr key={ak.AssumedKnowledge_ID}>
                  <td>{ak.Alternative1}</td>
                  <td>{!ak.Alternative2 ? "null" : ak.Alternative2}</td>
                  <td>
                    <button
                      className="btn-red"
                      onClick={() => onDelete(ak.AssumedKnowledge_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <DropDown
                  list={courseData}
                  itemType="Course"
                  handleChange={(e) => setCourse1Chosen(e.target.value)}
                />
              </td>
              <td>
                <DropDown
                  list={courseData}
                  itemType="Course"
                  handleChange={(e) => setCourse2Chosen(e.target.value)}
                />
              </td>
              <td>
                <button className="btn-blue" onClick={onAdd}>
                  Add
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
export default AssumedKnowledge;
