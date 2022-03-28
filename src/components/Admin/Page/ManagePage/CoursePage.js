import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HttpRequest from "../../../../HttpRequest";
import AssumedKnowledge from "../../AssumedKnowledge";
import Availability from "../../Availability";
import TopBar from "../../TopBar";
import validateRedirect from "../../util/validateRedirect";

function CoursePage({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAKOpen, setIsAKOpen] = useState(false);
  const [isAvaOpen, setIsAvaOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    Course_ID: "",
    Course_Name: "",
    Unit: 0,
    Required_Unit: 0,
  });
  useEffect(() => {
    if (type === "edit") {
      HttpRequest({ method: "GET", url: `/api/course/${id}` }).then((res) => {
        setCourseData(res.data.result);
      });
    }
  }, []);
  async function onAdd() {
    try {
      const res = await HttpRequest({
        method: "POST",
        url: `/api/course`,
        data: {
          courseId: courseData.Course_ID,
          courseName: courseData.Course_Name,
          unit: courseData.Unit,
          requiredUnit: courseData.Required_Unit,
        },
      });
      if (res.data.status === "success") {
        alert("Success");
        navigate("/admin/home");
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
    }
  }
  async function onEdit() {
    try {
      const res = await HttpRequest({
        method: "PUT",
        url: `/api/course`,
        data: {
          courseId: courseData.Course_ID,
          courseName: courseData.Course_Name,
          unit: courseData.Unit,
          requiredUnit: courseData.Required_Unit,
        },
      });
      if (res.data.status === "success") {
        alert("Success");
        navigate("/admin/home");
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
    }
  }
  return (
    <>
      <TopBar />
      {isAKOpen && (
        <AssumedKnowledge
          id={id}
          onCanvasClosed={() => setIsAKOpen(false)}
          courseName={courseData.Course_ID}
        />
      )}
      {isAvaOpen && (
        <Availability
          id={id}
          onCanvasClosed={() => setIsAvaOpen(false)}
          courseName={courseData.Course_ID}
        />
      )}

      <div className="manage-form">
        <div className="manage-form-title">
          {type === "add" ? (
            <>
              Add Course
            </>
          ) : (
            <>
              Edit Course
            </>
          )}
        </div>
        <div className="form-component">
          <div className="form-control">
            Course ID:
            <input
              type="text"
              placeholder="e.g. INFT2012"
              onChange={(e) =>
                setCourseData((course) => {
                  return { ...course, Course_ID: e.target.value };
                })
              }
              readOnly={type === "edit"}
              value={courseData.Course_ID}
            ></input>
          </div>
          <div className="form-control">
            Course Name:
            <input
              type="text"
              placeholder="e.g. Application Programming"
              onChange={(e) =>
                setCourseData((course) => {
                  return { ...course, Course_Name: e.target.value };
                })
              }
              value={courseData.Course_Name}
            ></input>
          </div>
          <div className="form-control">
            Unit:
            <input
              type="number"
              min={0}
              placeholder="e.g. 10"
              onChange={(e) =>
                setCourseData((course) => {
                  return { ...course, Unit: e.target.value };
                })
              }
              value={courseData.Unit}
            ></input>
          </div>
          <div className="form-control">
            Prerequisite Unit:
            <input
              type="number"
              min={0}
              placeholder="e.g. 100"
              onChange={(e) =>
                setCourseData((course) => {
                  return { ...course, Required_Unit: e.target.value };
                })
              }
              value={courseData.Required_Unit}
            ></input>
          </div>
          {type === "edit" && (
            <>
              <div className="form-control">
                Course Availability:
                <button className="btn-internal-gray" onClick={() => setIsAvaOpen(true)}>
                  Manage Availability
                </button>
              </div>
              <div className="form-control">
                Course Assumed Knowledge:
                <button className="btn-internal-gray" onClick={() => setIsAKOpen(true)}>
                  Manage Assumed Knowledge
                </button>
              </div>
            </>
          )}
        </div>
        <div className="form-control-buttons">
          <button className="btn-back">
            <Link key="link__back" className="btn-gray" to="/admin/home">
              Back
            </Link>
          </button>
          {type === "add" ? (
            <button className="btn-blue" onClick={onAdd}>
              Add Campus
            </button>
          ) : (
            <button className="btn-blue" onClick={onEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default CoursePage;
