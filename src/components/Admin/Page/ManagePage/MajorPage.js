import ManageCourse from "../../ManageCourse";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HttpRequest from "../../../../HttpRequest";
import validateRedirect from "../../util/validateRedirect";
import TopBar from "../../TopBar";
function MajorPage({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [majorData, setMajorData] = useState({
    Major_Name: "",
    Total_Unit: 0,
  });
  useEffect(() => {
    if (type === "edit") {
      HttpRequest({ method: "GET", url: `/api/major/${id}` })
        .then((res) => {
          setMajorData(res.data.result);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  function onCanvasClosed() {
    setIsCanvasOpen(false);
  }
  function onAdd() {
    HttpRequest({
      method: "POST",
      url: `/api/major`,
      data: {
        majorName: majorData.Major_Name,
        totalUnit: majorData.Total_Unit,
      },
    })
      .then((res) => {
        if (res.data.status === "success") {
          alert("Success");
          navigate("/admin/home");
        }
      })
      .catch((error) => {
        alert(validateRedirect(error.response.status));
        if (error.response.status === 403) navigate("/admin/login");
      });
  }
  function onEdit() {
    HttpRequest({
      method: "PUT",
      url: `/api/major`,
      data: {
        majorId: id,
        majorName: majorData.Major_Name,
        totalUnit: majorData.Total_Unit,
      },
    })
      .then((res) => {
        if (res.data.status === "success") {
          alert("Success");
          navigate("/admin/home");
        }
      })
      .catch((error) => {
        alert(validateRedirect(error.response.status));
        if (error.response.status === 403) navigate("/admin/login");
      });
  }
  return (
    <>
      {isCanvasOpen && (
        <ManageCourse
          id={id}
          onCanvasClosed={onCanvasClosed}
          Name={majorData.Major_Name}
          Type={"major"}
        />
      )}
      <TopBar />

      <div className="manage-form">
        <div className="manage-form-title">
          {type === "add" ? (
            <>
              Add Major
            </>
          ) : (
            <>
              Edit Major
            </>
          )}
        </div>
        <div className="form-component">
          <div className="form-control">
            Major Name:
            <input
              type="text"
              placeholder="e.g. System Development"
              onChange={(e) =>
                setMajorData((major) => {
                  return { ...major, Major_Name: e.target.value };
                })
              }
              value={majorData.Major_Name}
            ></input>
          </div>
          <div className="form-control">
            Total Unit:
            <input
              type="number"
              min={0}
              step={10}
              placeholder="e.g. 10"
              onChange={(e) =>
                setMajorData((campus) => {
                  return { ...campus, Total_Unit: e.target.value };
                })
              }
              value={majorData.Total_Unit}
            ></input>
          </div>
          {type === "edit" && (
            <div className="form-control">
              Manage Major Course:
              <button className="btn-internal-gray" onClick={() => setIsCanvasOpen(true)}>
                Manage Course
              </button>
            </div>
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
              Add Major
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
export default MajorPage;
