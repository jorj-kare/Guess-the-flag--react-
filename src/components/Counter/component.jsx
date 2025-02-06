import "./style.css";
function Counter(props) {
  return (
    <div className="counter-box counter--found">
      <span>Found:</span>
      <div
        className={`counter  ${
          props.isAnswer == "correct" ? props.isAnswer : ""
        }`}>
        {props?.countryCounter}/{props?.totalCountries}
      </div>
    </div>
  );
}

export default Counter;
