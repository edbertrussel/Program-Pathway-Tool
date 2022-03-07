import React from "react";
import { useContext, useState, useEffect } from "react";
import HttpRequest from "../../HttpRequest";
import ToCamelCase from "../Admin/util/ToCamelCase";
const AdminContext = React.createContext();
function AdminContextProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState("Campus"); //user selected tab (use in TabComponent) default to Campus
  const [itemList, setItemList] = useState([]); //list of item to displayed in TabContent
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState([]); //list of data for filterComponent
  const [isManagePressed, setIsManagePressed] = useState(false); //determine whether manage button was pressed
  const [deleteMessageShowed, setDeleteMessageShowed] = useState();
  useEffect(() => {
    //request the data whenever the tab changed

    setIsLoading(true);
    //request data for itemList to display in TabContent
    requestItemList();
    //request data for filter component
    HttpRequest({
      method: "GET",
      url: `/api/${selectedTab.toLowerCase()}/filterOptions`,
    })
      .then((res) => {
        let list = res.data.result;
        //add isChecked attribute for checkbox purpose
        list = list.map((item) => {
          const { name, options } = item;
          return {
            name: name,
            options: options.map((opt) => {
              return {
                name: opt,
                isChecked: false,
              };
            }),
          };
        });
        setFilterOption(list);
      })
      .catch((err) => {
        console.log(err);
        setFilterOption([]);
      });
  }, [selectedTab]);

  async function requestItemList(paramObj = {}) {
    //make http request for itemList(campus/course/degree)

    try {
      setIsLoading(true);
      let {
        data: { result },
      } = await HttpRequest({
        method: "GET",
        url: `/api/${selectedTab.toLowerCase()}`, //eg Campus->campus
        params: {
          ...paramObj,
        },
      });
      result = result.map((item) => {
        return { ...item, isChecked: false }; //add isChecked value for the checkbox purpose
      });
      setItemList(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function onFilterClicked() {
    //create an object to append on the request query params
    let filterChoice = {};
    filterOption.forEach((option) => {
      const { name } = option;
      filterChoice[ToCamelCase(name)] = option.options
        .filter((opt) => {
          return opt.isChecked === true;
        })
        .map((opt) => opt.name);
    });

    requestItemList(filterChoice); //call the request function with parameter obj
  }

  function onSearch(query) {
    //event handler to be passed to the SearchBar for searching
    //request for searching the data
    requestItemList({
      search: query,
    });
  }
  function onFilterChecked(name, optionName) {
    //trigegr when user click on checkbox
    setFilterOption((PrevState) => {
      const newState = PrevState.map((filter) => {
        if (filter.name === name) {
          //when the name match, proceed to reset isChecked
          return {
            name: name,
            options: filter.options.map((opt) => {
              if (opt.name === optionName)
                return { ...opt, isChecked: !opt.isChecked };
              //reset the isChecked value
              else return { ...opt };
            }),
          };
        } else {
          return { ...filter };
        }
      });
      return newState;
    });
  }
  function onDeleteChecked(index) {
    //Manage checkbox in TabContent
    //for each item in itemList(campus/degree/course)
    setItemList((prevList) => {
      return prevList.map((item, ListIndex) => {
        return ListIndex === index
          ? { ...item, isChecked: !item.isChecked }
          : { ...item };
      });
    });
  }
  async function onDeleteClicked() {
    try {
      //when user confirm delete the item
      //use in MessageBox btn2EventHandler in ToolBar
      const selectedList = itemList
        .filter((item) => {
          return item.isChecked;
        })
        .map((item) => item[`${selectedTab}_ID`]);
      const paramObj = {
        [`${selectedTab.toLowerCase()}Ids`]: selectedList,
      };
      const response = await HttpRequest({
        method: "DELETE",
        url: `/api/${selectedTab.toLowerCase()}`, //eg Campus->campus
        params: {
          ...paramObj,
        },
      });
      window.alert(response.data.status); //alert the user whether if the process succeed

      requestItemList(); //request again to refresh the itemlist
    } catch (error) {
      window.alert(error.message);
      console.log(error);
    } finally {
      setDeleteMessageShowed(false); //close delete messagebox
    }
  }
  function showDeleteMessage() {
    const isItemChose = (item) => item.isChecked;
    if (itemList.findIndex(isItemChose) === -1) {
      //if user did not choose any item to be deleted, alert them
      window.alert("Please select item to be deleted");
    } else {
      setDeleteMessageShowed(true);
    }
  }
  function closeDeleteMessage() {
    setDeleteMessageShowed(false);
  }
  return (
    <AdminContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        itemList,
        setItemList,
        isLoading,
        filterOption,
        isManagePressed,
        deleteMessageShowed,
        showDeleteMessage,
        closeDeleteMessage,
        setIsManagePressed,
        onFilterClicked,
        onSearch,
        onFilterChecked,
        onDeleteChecked,
        onDeleteClicked,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
const useAdminContext = () => useContext(AdminContext);
export { useAdminContext, AdminContextProvider };