import { useAdminContext } from "../Context/AdminContext";
import TabContent from "./TabContent";
const tabs = ["Campus", "Degree", "Major", "Course"];
function TabComponent() {
  const { selectedTab, isLoading, itemList, setSelectedTab } =
    useAdminContext();
  return (
    <div className="tab-component">
      <div className="tabs">
        {tabs.map((tab, index) => {
          const cssClass = tab === selectedTab ? "tab tab-selected" : "tab";
          return (
            <div
              key={tab + index}
              className={cssClass}
              onClick={() => { 
                setSelectedTab(tab);
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      {
        //loading icon
        isLoading && <div className="loader"></div>
      }
      {
        //show no result message when the item list does not load with any data
        selectedTab && itemList.length === 0 ? (
          <div className="error">No record found for the search result</div>
        ) : null
      }
      <TabContent Type={selectedTab} itemList={itemList} />
    </div>
  );
}
export default TabComponent;
