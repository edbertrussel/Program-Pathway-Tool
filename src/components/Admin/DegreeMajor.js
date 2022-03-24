import { useEffect, useState } from "react";
import HttpRequest from "../../HttpRequest";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import validateRedirect from "./util/validateRedirect";
function DegreeMajor({ onCanvasClosed, degreeName, id }) {
  const navigate = useNavigate();
  const [majorList, setMajorList] = useState([]);
  const [majorData, setMajorData] = useState([]);
  const [majorChosen, setMajorChosen] = useState("");
  useEffect(() => {
    HttpRequest({ method: "GET", url: `/api/degree/${id}/major` })
      .then((res) => {
        setMajorList(res.data.result);
      })
      .catch((err) => console.log(err));
    HttpRequest({ method: "GET", url: `/api/major` }).then((res) => {
      setMajorData(
        res.data.result.map((major) => ({
          id: major.Major_ID,
          name: major.Major_Name,
        }))
      );
    });
  }, []);
  function handleChange(e) {
    setMajorChosen(e.target.value);
  }
  async function onAdd() {
    if (majorChosen !== "") {
      try {
        const res = await HttpRequest({
          method: "POST",
          url: `/api/degree/${id}/major`,
          data: {
            majorId: majorChosen,
          },
        });
        if (res.data.status === "success") {
          const response = await HttpRequest({
            method: "GET",
            url: `/api/degree/${id}/major`,
          });

          setMajorList(response.data.result);
        }
      } catch (error) {
        alert(validateRedirect(error.response.status));
        if (error.response.status === 403) navigate("/admin/login");
      }
    }
  }
  async function onDelete(majorId) {
    try {
      const res = await HttpRequest({
        method: "DELETE",
        url: `/api/degree/${id}/major`,
        params: { majorId: majorId },
      });
      if (res.data.status === "success") {
        const response = await HttpRequest({
          method: "GET",
          url: `/api/degree/${id}/major`,
        });

        setMajorList(response.data.result);
      }
    } catch (error) {
      alert(validateRedirect(error.response.status));
      if (error.response.status === 403) navigate("/admin/login");
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

        <h3>Majors in {degreeName}</h3>
        <table className="item-table">
          <thead>
            <tr>
              <th>Major ID</th>
              <th>Major Name</th>
            </tr>
          </thead>
          <tbody>
            {majorList.map((major) => {
              return (
                <tr key={major.Major_ID}>
                  <td>{major.Major_ID}</td>
                  <td>{major.Major_Name}</td>
                  <td>
                    <button
                      className="btn-red"
                      onClick={() => onDelete(major.Major_ID)}
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
                  list={majorData}
                  itemType="Major"
                  handleChange={handleChange}
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
export default DegreeMajor;
