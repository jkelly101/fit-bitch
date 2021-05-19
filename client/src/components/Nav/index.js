import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import LoginForm from "../LoginForm";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Nav() {
  const [loginExpanded, setLoginExpanded] = useState(false);
  const { email, loggedIn } = useContext(UserContext);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
          Fit-Bitch
      </a>
      {(() => {
        if (loggedIn) {
          return (
            <p className="logged-in-text">
              Logged in as {email}{" "}
              <Link to="/logout" onClick={() => setLoginExpanded(false)}>
                Logout
              </Link>{" "}
            </p>
          );
        } else {
          if (!loginExpanded) {
            return <button onClick={handleShow} >Login</button>;
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm className="top-menu-login"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}

export default Nav;
