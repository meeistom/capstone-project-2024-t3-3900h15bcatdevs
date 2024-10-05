import React from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPersonDress } from "@fortawesome/free-solid-svg-icons";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
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

  const goToBabies = () => {
    navigate("/view_babies");
  };

  const goToSubmitFeed = () => {
    navigate("/submit_feed");
  };

  const goToHistory = () => {
    navigate("/history_log");
  };

  const goToVerify = () => {
    navigate("/verify_feed");
  };

  return (
    <>
      <Navbar className="navbar">
        <Container className="d-flex flex-column align-items-start mx-2">
          <Navbar.Brand onClick={goToHome}>Milk Guard</Navbar.Brand>
          <Nav className="flex-row" variant="underline">
            <Nav.Link onClick={goToHome}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </Nav.Link>
            <Nav.Link onClick={goToMothers}>
              <FontAwesomeIcon icon={faPersonDress} /> View Mothers
            </Nav.Link>
            <Nav.Link onClick={goToBabies}>
              <FontAwesomeIcon icon={faBaby} /> View Babies
            </Nav.Link>
            <Nav.Link onClick={goToSubmitFeed}>
              <FontAwesomeIcon icon={faPaperPlane} /> Submit Feed
            </Nav.Link>
            <Nav.Link onClick={goToHistory}>
              <FontAwesomeIcon icon={faClockRotateLeft} /> History Log
            </Nav.Link>
            <Button onClick={goToVerify}>
              <FontAwesomeIcon icon={faCircleCheck} /> Verify Feed
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
