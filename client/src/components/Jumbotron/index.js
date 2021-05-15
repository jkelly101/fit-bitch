import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 200, clear: "both", paddingTop: 80, textAlign: "center", marginTop: "20px" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
