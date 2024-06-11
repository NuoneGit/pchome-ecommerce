import { Spinner } from "react-bootstrap";


//this is buffering component to show when loading
const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};

export default Loader;
