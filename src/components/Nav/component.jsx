import "./style.css";
function Nav(props) {
  return (
    <nav className="nav">
      <a className="nav__anchor" href="#ds">
        Flag
      </a>
      <a className="nav__anchor" href="#d">
        Capital
      </a>
      <a className="nav__anchor" href="#s">
        Country
      </a>
    </nav>
  );
}
export default Nav;
