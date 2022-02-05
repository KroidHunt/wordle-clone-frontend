const style = {
  background: "#ffffff",
  textAlign: "center",
  borderRadius: "2px",
  padding: "0.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  width: "fit-content",
  margin: "auto",
  marginBottom: "10px",
  marginTop: "0",
};

const Popup = ({ message, children }) => {
  return <div style={style}>{message || children}</div>;
};

export default Popup;
