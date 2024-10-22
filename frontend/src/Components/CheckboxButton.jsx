import React from "react";
import { ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { CheckboxButton };

function CheckboxButton({ isChecked, onChange, name, children }) {
  console.log(isChecked, name, onChange);
  return (
    <>
      <ToggleButton
        type="checkbox"
        className={isChecked ? "check" : "uncheck"}
        checked={isChecked}
        name={name}
        value={name}
        onChange={onChange}
      >
        {isChecked ? (
          <FontAwesomeIcon icon={faCheckSquare} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
        <p className="check-btn-child" style={{ marginLeft: "10px" }}>
          {children}
        </p>
      </ToggleButton>
    </>
  );
}
