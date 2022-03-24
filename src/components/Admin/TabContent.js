import { useAdminContext } from "../Context/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TabContent() {
  const { selectedTab: Type, itemList, isManagePressed } = useAdminContext();
  const { onDeleteChecked } = useAdminContext();
  const navigate = useNavigate();
  return (
    <div className="tab-content">
      {itemList.map((item, index) => {
        return (
          <div key={index} className="tab-content-item">
            <div>{item[`${Type}_ID`]}</div>
            <div>{item[`${Type}_Name`]}</div>
            {isManagePressed && (
              <div className="tab-content-btn-grp">
                <div
                  className="btn-edit"
                  onClick={() => {
                    navigate(
                      `/admin/${Type.toLowerCase()}/${item[`${Type}_ID`]}/edit`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => {
                    onDeleteChecked(index);
                  }}
                ></input>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default TabContent;
