import { useEffect, useState } from "react";
import HttpRequest from "../../HttpRequest";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import validateRedirect from "./util/validateRedirect";
function CampusDegree({ id, onCanvasClosed, campusName }) {
  const navigate = useNavigate();
  const [degreeList, setDegreeList] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [degreeChosen, setDegreeChosen] = useState("");

  useEffect(() => {
    HttpRequest({ method: "GET", url: `/api/campus/${id}/degree` })
      .then((res) => {
        setDegreeList(res.data.result);
      })
      .catch((err) => console.log(err));
    HttpRequest({ method: "GET", url: `/api/degree` }).then((res) => {
      setDegreeData(
        res.data.result.map((degree) => ({
          id: degree.Degree_ID,
          name: degree.Degree_Name,
        }))
      );
    });
  }, []);
  function handleChange(e) {
    setDegreeChosen(e.target.value);
  }
  async function onCampusDegreeDelete(degreeId) {
    try {
      const res = await HttpRequest({
        method: "DELETE",
        url: `/api/campus/${id}/degree`,
        data: { degreeId: degreeId },
      });
      if (res.data.status === "success") {
        const response = await HttpRequest({
          method: "GET",
          url: `/api/campus/${id}/degree`,
        });

        setDegreeList(response.data.result);
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
    }
  }
  async function addCampusDegree() {
    if (degreeChosen !== "") {
      try {
        const res = await HttpRequest({
          method: "POST",
          url: `/api/campus/${id}/degree`,
          data: {
            degreeId: degreeChosen,
          },
        });
        if (res.data.status === "success") {
          const response = await HttpRequest({
            method: "GET",
            url: `/api/campus/${id}/degree`,
          });

          setDegreeList(response.data.result);
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

        <h3>Degree available in {campusName}</h3>
        <table className="item-table">
          <thead>
            <tr>
              <th>Degree ID</th>
              <th>Degree Name</th>
            </tr>
          </thead>
          <tbody>
            {degreeList.map((degree) => {
              return (
                <tr key={degree.Degree_ID}>
                  <td>{degree.Degree_ID}</td>
                  <td>{degree.Degree_Name}</td>
                  <td>
                    <button
                      className="btn-red"
                      onClick={() => onCampusDegreeDelete(degree.Degree_ID)}
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
                  list={degreeData}
                  itemType="Degree"
                  handleChange={handleChange}
                />
              </td>
              <td>
                <button className="btn-blue" onClick={addCampusDegree}>
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
export default CampusDegree;
