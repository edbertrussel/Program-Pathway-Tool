function SelectInfo(props) {
  return (
    <div className="SelectInfo">
      <p className="askCampus">{props.title}</p>
      <select
        className="selectBar"
        onChange={(e) => props.handleChange(e)}
      >
        <option value={""}>{props.defaultOption}</option>
        {props.data.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInfo;