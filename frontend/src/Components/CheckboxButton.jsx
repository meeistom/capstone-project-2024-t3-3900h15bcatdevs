import React from "react";
import { ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { CheckboxButton };

function CheckboxButton({ id, name, isChecked, onChange, children }) {
  return (
    <ToggleButton
      id={id}
      type="checkbox"
      name={name}
      className={isChecked ? "check" : "uncheck"}
      checked={isChecked}
      onChange={onChange}
    >
      {isChecked ? (
        <FontAwesomeIcon icon={faCheckSquare} />
      ) : (
        <FontAwesomeIcon icon={faSquare} />
      )}
      <span className="ms-1">{children}</span>
    </ToggleButton>
  );
}
