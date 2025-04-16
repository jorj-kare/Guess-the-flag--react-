import "./style.css";
import CountryInfo from "../CountryInfo/component";

function Footer(props) {
  return (
    <footer>
      <CountryInfo icon={"gis:search-country"}>
        Subregion: {props.subregion}
      </CountryInfo>
      <CountryInfo icon={"hugeicons:city-03"}>
        Capital: {props.capital}
      </CountryInfo>
      <CountryInfo icon={"famicons:people-outline"}>
        Population:{" "}
        {props.population?.toLocaleString("en", { useGrouping: true })}
      </CountryInfo>
      <CountryInfo icon={"ix:language"}>
        Languages:{" "}
        {props.languages &&
          Object.values(props.languages).slice(",").join(", ")}
      </CountryInfo>
    </footer>
  );
}
export default Footer;
