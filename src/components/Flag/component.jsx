import { useEffect, useState } from "react";
import "./style.css";

function Flag(props) {
  const [disabled, setDisabled] = useState("");
  useEffect(() => {
    setDisabled("");
  }, [props.countryToBeFound]);
  function onClickBtn() {
    props.onFlagClick(props.name);
    props.name != props.countryToBeFound.name.common
      ? setDisabled("disabled")
      : "";
  }

  return (
    <button
      className={`flag ${disabled} ${
        props.isAnswer == "correct"
          ? "fade"
          : props.isAnswer == "wrong"
          ? "freeze"
          : ""
      } ${props.isAnswer}`}
      onClick={() => onClickBtn()}>
      <img className="flag__img" src={props.flag.png} alt="flag image" />
    </button>
  );
}

export default Flag;
