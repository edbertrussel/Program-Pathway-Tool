import HttpRequest from "../../HttpRequest";
import { useAdminContext } from "../Context/AdminContext";

function FilterComponent() {
  const { filterOption, onFilterClicked, onFilterChecked } = useAdminContext();

  return (
    <div className="filter-component">
      <h1 className="filter-text">Filter</h1>
      {filterOption.map((opt) => {
        const { name, options } = opt;

        return (
          <div key={name}>
            <h2>{name}</h2>
            {options.map((item, index) => {
              return (
                <div key={item.name} className="filter-option">
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={item.isChecked}
                    onChange={(e) => {
                      onFilterChecked(name, item.name);
                    }}
                  ></input>
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
        );
      })}

      <button className="btn-blue filter-btn" onClick={onFilterClicked}>
        Apply Changes
      </button>
    </div>
  );
}
export default FilterComponent;
