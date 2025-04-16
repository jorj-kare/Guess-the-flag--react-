import "./style.css";
function Counter(props) {
  return (
    <div className="counter-box">
      <span>{props.title}</span>
      <div className={`counter ${props.className} `}>{props.children}</div>
    </div>
  );
}

export default Counter;
