import { Icon } from "@iconify/react";
import "./style.css";
import { europe } from "src/assets/icons";
function ContinentButton(props) {
  return (
    <button
      className="continent-btn"
      onClick={() => props.setContinent(props.name)}>
      {props.name == "africa" ? (
        <Icon icon="game-icons:africa" />
      ) : props.name == "south america" ? (
        <Icon icon="game-icons:south-america" className="south-america" />
      ) : props.name == "oceania" ? (
        <Icon icon="fa6-solid:earth-oceania" />
      ) : props.name == "asia" ? (
        <Icon icon="gis:earth-asia" />
      ) : props.name == "america" ? (
        <Icon icon="gis:earth-america" className="north-america" />
      ) : props.name == "europe" ? (
        <img src={europe} alt="europe countries" className="europe" />
      ) : (
        <Icon icon="gis:globe-earth" className="all" />
      )}
      <span className="continent-btn__title">
        {props.name == "america" ? "north america" : props.name}
      </span>
    </button>
  );
}
export default ContinentButton;
