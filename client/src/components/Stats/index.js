import React, { useState, Fragment, useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./styles.css";

function Stats() {

    const { email, loggedIn } = useContext(UserContext);

  return (
    <div className="card stat-card">


    </div>
  );
}

export default Stats;
