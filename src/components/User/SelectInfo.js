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
          <option key={data[`${props.type}Id`]} value={data[`${props.type}Id`]}>
            {data[`${props.type}Name`]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInfo;