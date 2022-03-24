import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DegreeMajor from "../DegreeMajor";
import ManageCourse from "../ManageCourse";
import TopBar from "../TopBar";
import HttpRequest from "../../../HttpRequest";
import validateRedirect from "../util/validateRedirect";
function DegreePage({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDegreeCourseOpen, setIsDegreeCourseOpen] = useState(false);
  const [isDegreeMajorOpen, setIsDegreeMajorOpen] = useState(false);
  const [degreeData, setDegreeData] = useState({
    Degree_ID: "",
    Degree_Name: "",
    Total_Credit: 0,
    Min_Year: 0,
    Max_Year: 0,
    Level: "",
    StudyArea: "",
  });
  useEffect(() => {
    if (type === "edit") {
      HttpRequest({ method: "GET", url: `/api/degree/${id}` })
        .then((res) => {
          setDegreeData(res.data.result);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  function onAdd() {
    HttpRequest({
      method: "POST",
      url: `/api/degree`,
      data: {
        degreeId: degreeData.Degree_ID,
        degreeName: degreeData.Degree_Name,
        totalCredit: degreeData.Total_Credit,
        minYear: degreeData.Min_Year,
        maxYear: degreeData.Max_Year,
        Level: degreeData.Level,
        studyArea: degreeData.StudyArea,
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
      url: `/api/degree`,
      data: {
        degreeId: degreeData.Degree_ID,
        degreeName: degreeData.Degree_Name,
        totalCredit: degreeData.Total_Credit,
        minYear: degreeData.Min_Year,
        maxYear: degreeData.Max_Year,
        Level: degreeData.Level,
        studyArea: degreeData.StudyArea,
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
      <TopBar />
      {isDegreeCourseOpen && (
        <ManageCourse
          id={id}
          Type="degree"
          Name={degreeData.Degree_Name}
          onCanvasClosed={() => {
            setIsDegreeCourseOpen(false);
          }}
        />
      )}
      {isDegreeMajorOpen && (
        <DegreeMajor
          id={id}
          onCanvasClosed={() => {
            setIsDegreeMajorOpen(false);
          }}
          degreeName={degreeData.Degree_Name}
        />
      )}
      <button className="btn-back">
        <Link key="link__back" className="btn-gray" to="/admin/home">
          Back
        </Link>
      </button>
      <div className="form-component">
        <div className="form-control">
          Degree ID:
          <input
            type="text"
            placeholder="e.g. 11497"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, Degree_ID: e.target.value };
              })
            }
            readOnly={type === "edit"}
            value={degreeData.Degree_ID}
          ></input>
        </div>
        <div className="form-control">
          Degree Name:
          <input
            type="text"
            placeholder="e.g. Bachelor of Information Technology"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, Degree_Name: e.target.value };
              })
            }
            value={degreeData.Degree_Name}
          ></input>
        </div>
        <div className="form-control">
          Total Credit:
          <input
            type="number"
            min={0}
            step={10}
            placeholder="e.g. 10"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, Total_Credit: e.target.value };
              })
            }
            value={degreeData.Total_Credit}
          ></input>
        </div>
        <div className="form-control">
          Minimum Year:
          <input
            type="number"
            min={1}
            placeholder="e.g. 2"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, Min_Year: e.target.value };
              })
            }
            value={degreeData.Min_Year}
          ></input>
        </div>
        <div className="form-control">
          Maximum Year:
          <input
            type="number"
            min={1}
            placeholder="e.g. 8"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, Max_Year: e.target.value };
              })
            }
            value={degreeData.Max_Year}
          ></input>
        </div>
        <div className="form-control">
          Level:
          <input
            type="text"
            placeholder="e.g. Undergraduate"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, Level: e.target.value };
              })
            }
            value={degreeData.Level}
          ></input>
        </div>
        <div className="form-control">
          Study Area:
          <input
            type="text"
            placeholder="e.g. Computing, Maths and Technology"
            onChange={(e) =>
              setDegreeData((degree) => {
                return { ...degree, StudyArea: e.target.value };
              })
            }
            value={degreeData.StudyArea}
          ></input>
        </div>
        {type === "edit" && (
          <div className="form-control">
            Manage Degree Course:
            <button
              className="btn-blue"
              onClick={() => setIsDegreeCourseOpen(true)}
            >
              Manage Course
            </button>
          </div>
        )}
        {type === "edit" && (
          <div className="form-control">
            Manage Degree Major:
            <button
              className="btn-blue"
              onClick={() => setIsDegreeMajorOpen(true)}
            >
              Manage Major
            </button>
          </div>
        )}
        {type === "add" ? (
          <button className="btn-gray" onClick={onAdd}>
            Add Major
          </button>
        ) : (
          <button className="btn-gray" onClick={onEdit}>
            Edit
          </button>
        )}
      </div>
    </>
  );
}
export default DegreePage;
