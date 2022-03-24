import { useEffect } from "react";
import HttpRequest from "../../HttpRequest";

function DropDown({ list, itemType, handleChange }) {
  return (
    <select onChange={handleChange} className="dropdown-list">
      <option value="">Select {itemType}</option>
      {list.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}
export default DropDown;
