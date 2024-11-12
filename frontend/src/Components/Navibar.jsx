import React from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse} from "@fortawesome/free-solid-svg-icons";
import { faPersonDress } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import "../index.css";

export { Navibar };

function Navibar() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToMothers = () => {
    navigate("/view_mothers");
  };

  const goToMilks = () => {
    navigate("/view_milks");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToHistory = () => {
    navigate("/history_log");
  };

  const goToVerify = () => {
    navigate("/verify_feed");
  };

  return (
    <>
      <Navbar className="navbar" sticky="top">
        <Container className="d-flex flex-column align-items-start mx-2">
          <Navbar.Brand data-testid="nav-mg" onClick={goToHome}>
            Milk Guard
          </Navbar.Brand>
          <Nav className="flex-row" variant="underline">
            <Nav.Link data-testid="nav-home" onClick={goToHome}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </Nav.Link>
            <Nav.Link data-testid="nav-mothers" onClick={goToMothers}>
              <FontAwesomeIcon icon={faPersonDress} /> View Mothers
            </Nav.Link>
            <Nav.Link data-testid="nav-milks" onClick={goToMilks}>
              <FontAwesomeIcon icon={faPrescriptionBottle} /> View Milks
            </Nav.Link>
            <Nav.Link data-testid="nav-register" onClick={goToRegister}>
              <FontAwesomeIcon icon={faPaperPlane} /> Register
            </Nav.Link>
            <Nav.Link data-testid="nav-history" onClick={goToHistory}>
              <FontAwesomeIcon icon={faClockRotateLeft} /> History Log
            </Nav.Link>
            <Button data-testid="nav-verify" onClick={goToVerify}>
              <FontAwesomeIcon icon={faCircleCheck} /> Verify Feed
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
