import { useEffect, useRef, useState } from "react";
import HttpRequest from "../../HttpRequest";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import validateRedirect from "./util/validateRedirect";
const majorCourseTypes = ["Compulsory", "Directed"];
const degreeCourseTypes = ["Core", "Electives"];
function ManageCourse({ Name, id, onCanvasClosed, Type }) {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [courseChosen, setCourseChosen] = useState("");
  const [typeChosen, setTypeChosen] = useState(
    Type === "major" ? majorCourseTypes[0] : degreeCourseTypes[0]
  );
  useEffect(() => {
    console.log(Type);
    HttpRequest({ method: "GET", url: `/api/${Type}/${id}/course` })
      .then((res) => {
        setCourseList(res.data.result);
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
  function handleChange(e) {
    setCourseChosen(e.target.value);
  }
  async function onDelete(courseId) {
    try {
      const res = await HttpRequest({
        method: "DELETE",
        url: `/api/${Type}/${id}/course`,
        params: { courseId: courseId },
      });
      if (res.data.status === "success") {
        const response = await HttpRequest({
          method: "GET",
          url: `/api/${Type}/${id}/course`,
        });

        setCourseList(response.data.result);
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
    }
  }
  async function addMajorCourse() {
    if (courseChosen !== "") {
      try {
        const res = await HttpRequest({
          method: "POST",
          url: `/api/${Type}/${id}/course`,
          data: {
            courseId: courseChosen,
            type: typeChosen,
          },
        });
        if (res.data.status === "success") {
          const response = await HttpRequest({
            method: "GET",
            url: `/api/${Type}/${id}/course`,
          });

          setCourseList(response.data.result);
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

        <h3>Course available in {Name}</h3>
        <table className="item-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Course Type</th>
            </tr>
          </thead>
          <tbody>
            {courseList.map((course) => {
              return (
                <tr key={course.Course_ID}>
                  <td>{course.Course_ID}</td>
                  <td>{course.Course_Name}</td>
                  <td>{course.Type}</td>
                  <td>
                    <button
                      className="btn-red"
                      onClick={() => onDelete(course.Course_ID)}
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
                  handleChange={handleChange}
                />
              </td>
              <td>
                <select
                  value={typeChosen}
                  onChange={(e) => setTypeChosen(e.target.value)}
                >
                  {Type === "major"
                    ? majorCourseTypes.map((type) => {
                        return (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        );
                      })
                    : degreeCourseTypes.map((type) => {
                        return (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        );
                      })}
                </select>
              </td>
              <td>
                <button className="btn-blue" onClick={addMajorCourse}>
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
export default ManageCourse;
