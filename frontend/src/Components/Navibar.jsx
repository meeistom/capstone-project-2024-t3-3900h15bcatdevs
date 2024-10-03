import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

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
      <Navbar style={{ backgroundColor: "#7F48A3", color: "#FFF" }}>
        <Container className="d-flex flex-column align-items-start mx-2">
          <Navbar.Brand onClick={goToHome}>Milk Guard</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="flex-row" variant="underline">
            <Nav.Link onClick={goToHome}>Home</Nav.Link>
            <Nav.Link onClick={goToMothers}>View Mothers</Nav.Link>
            <Nav.Link onClick={goToBabies}>View Babies</Nav.Link>
            <Nav.Link onClick={goToSubmitFeed}>Submit Feed</Nav.Link>
            <Nav.Link onClick={goToHistory}>History Log</Nav.Link>
            <Button onClick={goToVerify}>Verify Feed</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
