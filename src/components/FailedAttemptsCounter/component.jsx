import "./style.css";
function FailedAttemptsCounter(props) {
  return (
    <div className="counter-box counter--fails">
      <span>Fails:</span>
      <div
        className={`counter  ${
          props.isAnswer == "wrong" ? props.isAnswer : ""
        }`}>
        {props.failedAttempts}
      </div>
    </div>
  );
}
export default FailedAttemptsCounter;
