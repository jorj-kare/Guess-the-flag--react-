import "./style.css";
function CountryToBeFound(props) {
  return (
    <h1 className={`country-to-be-found  ${props.isAnswer}`}>
      {props.countryToBeFound?.name.common}
    </h1>
  );
}
export default CountryToBeFound;
