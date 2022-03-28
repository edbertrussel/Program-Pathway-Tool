import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HttpRequest from "../../../../HttpRequest";
import CampusDegree from "../../CampusDegree";

import TopBar from "../../TopBar";
import validateRedirect from "../../util/validateRedirect";
import "./ManagePage.css";
function CampusPage({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [campusData, setCampusData] = useState({
    Campus_ID: "",
    Campus_Name: "",
    Location: "",
  });

  function onCanvasClosed() {
    setIsCanvasOpen(false);
  }
  useEffect(() => {
    if (type === "edit") {
      HttpRequest({ method: "GET", url: `/api/campus/${id}` })
        .then((res) => {
          setCampusData(res.data.result);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  function onAdd() {
    HttpRequest({
      method: "POST",
      url: `/api/campus`,
      data: {
        campusId: campusData.Campus_ID,
        campusName: campusData.Campus_Name,
        Location: campusData.Location,
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
      url: `/api/campus`,
      data: {
        campusId: campusData.Campus_ID,
        campusName: campusData.Campus_Name,
        Location: campusData.Location,
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
        <CampusDegree
          id={id}
          onCanvasClosed={onCanvasClosed}
          campusName={campusData.Campus_Name}
        />
      )}
      <TopBar />
      <div className="manage-form">
        <div className="manage-form-title">
          {type === "add" ? (
            <>
              Add Campus
            </>
          ) : (
            <>
              Edit Campus
            </>
          )}
        </div>
        <div className="form-component">
          <div className="form-control">
            Campus ID:
            <input
              type="text"
              placeholder="e.g. SG001"
              onChange={(e) => {
                setCampusData((campus) => {
                  return { ...campus, Campus_ID: e.target.value };
                });
              }}
              readOnly={type === "edit"}
              value={campusData.Campus_ID}
            ></input>
          </div>
          <div className="form-control">
            Campus Name:
            <input
              type="text"
              placeholder="e.g. PSB Academy"
              onChange={(e) =>
                setCampusData((campus) => {
                  return { ...campus, Campus_Name: e.target.value };
                })
              }
              value={campusData.Campus_Name}
            ></input>
          </div>
          <div className="form-control">
            Location:
            <input
              type="text"
              placeholder="e.g. Australia/Singapore"
              onChange={(e) =>
                setCampusData((campus) => {
                  return { ...campus, Location: e.target.value };
                })
              }
              value={campusData.Location}
            ></input>
          </div>
          {type === "edit" && (
            <div className="form-control">
              Manage Degree availability:
              <button className="btn-internal-gray" onClick={() => setIsCanvasOpen(true)}>
                Manage Availability
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

export default CampusPage;
