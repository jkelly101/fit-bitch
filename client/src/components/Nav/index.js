import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import LoginForm from "../LoginForm";
import "./nav.css";
import Modal from 'react-bootstrap/Modal';

function Nav() {

  const [loginExpanded, setLoginExpanded] = useState(false);
  const { email, loggedIn } = useContext(UserContext);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <a className="navbar-brand" href="/">
          Fit-Bitch
      </a>
      {(() => {
        if (loggedIn) {
          return (
            <div className="navbar-div">
              <p className="logged-in-text ">
                Logged in as {email}{" "}
              </p>
              <p className="logged-in-text logout-text">
                <Link className="btn btn-warning logout-btn" to="/logout" onClick={() => setLoginExpanded(false)}>
                  Logout
                </Link>{" "}
              </p>
            </div>
          );
        } else {
          if (!loginExpanded) {
            return <button className="btn btn-sm btn-success" onClick={handleShow} >Login</button>;
          } else {
            return (
              <Fragment>
                <LoginForm className="top-menu-login" />
                <button onClick={() => setLoginExpanded(false)}>X</button>
              </Fragment>
            );
          }
        }
      })()}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm className="top-menu-login"/>
        </Modal.Body>
      </Modal>
    </nav>
  );
}

export default Nav;
