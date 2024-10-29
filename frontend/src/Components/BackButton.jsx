import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { BackButton };

function BackButton({ id, onClick, children }) {
  return (
    <Button id={id} variant="outline-secondary" size="lg" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <span className="ms-2">{children}</span>
    </Button>
  );
}
