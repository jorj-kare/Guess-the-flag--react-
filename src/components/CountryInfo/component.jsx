import { Icon } from "@iconify/react";
import "./style.css";
export default function CountryInfo(props) {
  return (
    <span className="country-info">
      <Icon icon={props.icon} />
      {props.children}
    </span>
  );
}
