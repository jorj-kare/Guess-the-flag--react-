import { Icon } from "@iconify/react";
import "./style.css";

function Footer(props) {
  return (
    <footer>
      <span>
        <Icon icon="gis:search-country" />
        Subregion: {props.subregion}
      </span>
      <span>
        <Icon icon="hugeicons:city-03" />
        Capital: {props.capital}
      </span>
      <span>
        <Icon icon="famicons:people-outline" />
        Population:{" "}
        {props.population?.toLocaleString("en", {
          useGrouping: true,
        })}
      </span>
      <span>
        <Icon icon="ix:language" />
        Languages:{" "}
        {props.languages &&
          Object.values(props.languages).slice(",").join(", ")}
      </span>
    </footer>
  );
}
export default Footer;
