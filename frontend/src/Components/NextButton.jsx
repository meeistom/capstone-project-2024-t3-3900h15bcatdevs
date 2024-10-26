import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { NextButton };

function NextButton({ onClick, children }) {
  return (
    <Button variant="primary" size="lg" onClick={onClick}>
      <span className="me-2">{children}</span>
      <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  );
}
