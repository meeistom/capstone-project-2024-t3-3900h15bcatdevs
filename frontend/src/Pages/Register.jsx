import { React, useState} from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { Navibar } from "../Components/Navibar";
import { Button, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


export { Register };

function Register() {
  const navigate = useNavigate();
  
  const title = "What would you like to register?";
  const [checked, setChecked] = useState([false, false, false]);

  const handleToggle = (index) => {
    const updatedCheckedState = checked.map((item, idx) =>
      idx === index ? !item : item // Toggle the checkbox at the specified index
    );
    setChecked(updatedCheckedState);
  };

  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="register-title">
            <h1>{"Register"}</h1>
        </div>
        <div className="register-selection-container">
          <div className='title'>
              <h2>{title}</h2>
          </div>
          <div className='checkbox-container'>
            <ToggleButton // Mother Checkbox
              className={checked[0] ? 'check' : 'uncheck'}
              id="toggle-check"
              type="checkbox"
              checked={checked[0]}
              value="1"
              onClick={() => handleToggle(0)}
              >
              {checked[0] ? (
                <FontAwesomeIcon icon={faCheckSquare} />
              ) : (
                <FontAwesomeIcon icon={faSquare} />
              )}
              <span style={{ marginLeft: '10px' }}>Mother</span>
            </ToggleButton>
            <ToggleButton // Baby Checkbox
              className={checked[1] ? 'check' : 'uncheck'}
              id="toggle-check"
              type="checkbox"
              checked={checked[1]}
              value="1"
              onClick={() => handleToggle(1)}
              >
              {checked[1] ? (
                <FontAwesomeIcon icon={faCheckSquare} />
              ) : (
                <FontAwesomeIcon icon={faSquare} />
              )}
              <span style={{ marginLeft: '10px' }}>Baby</span>
            </ToggleButton>
          </div>
          <div className='checkbox-container'>
            <ToggleButton // Mother Checkbox
              className={checked[2] ? 'check' : 'uncheck'}
              id="toggle-check"
              type="checkbox"
              checked={checked[2]}
              value="1"
              onClick={() => handleToggle(2)}
              >
              {checked[2] ? (
                <FontAwesomeIcon icon={faCheckSquare} />
              ) : (
                <FontAwesomeIcon icon={faSquare} />
              )}
              <span style={{ marginLeft: '10px' }}>Milk</span>
            </ToggleButton>
          </div>
        </div>
        <div className='next-button-container'>
          <Button 
            variant="primary"
            size="lg"
            onClick={() => { // Check if at least one is checked
              if (checked[0] || checked[1] || checked[2]) {
                navigate("/register_mother");
              } else {
                alert("Please select at least one option.");
              }
          }}
            >
            <span style={{ marginRight: '10px' }}>Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </section>
    </>
  );
}
