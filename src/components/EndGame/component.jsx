import { Icon } from "@iconify/react";
import "./style.css";
function EndGame(props) {
  return (
    <div className="end-game">
      <button
        className="close-window"
        onClick={() => props.goBackToContinents()}>
        <Icon icon="solar:close-circle-bold" />
      </button>
      <span className="continent">
        <Icon icon="uiw:global" />
        Continent: {props.continent}
      </span>
      <span className="total-countries">
        <Icon icon="gis:search-country" />
        Total countries: {props.totalCountries}
      </span>
      <span className="failed-attempts">
        <Icon icon="icon-park-outline:message-failed" />
        Failed attempts: {props.failedAttempts}
      </span>
    </div>
  );
}
export default EndGame;
