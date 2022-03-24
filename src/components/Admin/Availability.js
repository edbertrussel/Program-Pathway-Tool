import { useEffect, useRef, useState } from "react";
import HttpRequest from "../../HttpRequest";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import validateRedirect from "./util/validateRedirect";
function Availability({ onCanvasClosed, courseName, id }) {
  const navigate = useNavigate();
  const [campusList, setCampusList] = useState([]);
  const [campusChosen, setCampusChosen] = useState("");
  const [availabilityList, setAvailabilityList] = useState([]);
  const yearRef = useRef(null);
  const semRef = useRef(null);
  useEffect(() => {
    HttpRequest({ method: "GET", url: "/api/campus" }).then((res) => {
      setCampusList(
        res.data.result.map((campus) => ({
          id: campus.Campus_ID,
          name: campus.Campus_Name,
        }))
      );
    });
  }, []);
  useEffect(() => {
    if (campusChosen !== "") refreshAvailability();
  }, [campusChosen]);
  async function refreshAvailability() {
    try {
      const res = await HttpRequest({
        method: "GET",
        url: `/api/course/${id}/Availability`,
        params: {
          campusId: campusChosen,
        },
      });
      setAvailabilityList(res.data.result);
    } catch (error) {}
  }
  async function onDelete(avaId) {
    try {
      const res = await HttpRequest({
        method: "DELETE",
        url: `/api/course/${id}/Availability`,
        params: {
          id: avaId,
        },
      });
      if (res.data.status === "success") {
        const res = await HttpRequest({
          method: "GET",
          url: `/api/course/${id}/Availability`,
          params: {
            campusId: campusChosen,
          },
        });
        setAvailabilityList(res.data.result);
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
    }
  }
  async function onAdd(e) {
    e.preventDefault();
    const sem = semRef.current.value;
    const year = yearRef.current.value;
    if (sem > 0 && sem < 4) {
      try {
        const res = await HttpRequest({
          method: "POST",
          url: `/api/course/${id}/Availability`,
          data: {
            campusId: campusChosen,
            year: year,
            semester: sem,
          },
        });
        if (res.data.status === "success") {
          const res = await HttpRequest({
            method: "GET",
            url: `/api/course/${id}/Availability`,
            params: {
              campusId: campusChosen,
            },
          });
          setAvailabilityList(res.data.result);
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
        <div className="campus-dropdown">
          <DropDown
            list={campusList}
            itemType="campus"
            handleChange={(e) => {
              setCampusChosen(e.target.value);
              refreshAvailability(e.target.value);
            }}
          />
        </div>
        {campusChosen !== "" && (
          <>
            <h3>Course Availability for {courseName}</h3>
            <table className="item-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {availabilityList.map((ava) => {
                  return (
                    <tr key={ava.Availability_ID}>
                      <td>{ava.Available_Year}</td>
                      <td>{ava.Semester}</td>
                      <td>
                        <button
                          className="btn-red"
                          onClick={() => onDelete(ava.Availability_ID)}
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
                    <input
                      type="number"
                      min={2000}
                      defaultValue={2022}
                      placeholder="Year"
                      ref={yearRef}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      max={3}
                      placeholder="Sem"
                      defaultValue={1}
                      ref={semRef}
                    ></input>
                  </td>
                  <td>
                    <button className="btn-blue" onClick={onAdd}>
                      Add
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
export default Availability;
