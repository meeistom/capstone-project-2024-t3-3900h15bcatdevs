import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { Navibar } from "../Components/Navibar";
import { Button, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export { Register };

function Register() {
  const [currentPage, setCurrentPage] = useState(null);
  const [registerStarted, setRegisterStarted] = useState(false);
  // Page 0: Choose Mother/Baby/Milk to register
  // Page 1: Mother Registration
  // Page 2: Baby Registration
  // Page 3: Milk Registration
  // Page 4: Confirm details
  // Page 5: Preview generated label
  // Page 6: Print label

  const nextPageToVisit = () => {
    console.log(`Next Page: ${currentPage + 1}`);
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const prevPageToVisit = () => {
    console.log(`Prev Page: ${currentPage - 1}`);
    setCurrentPage((currentPage) => currentPage - 1);
  };

  // Registration Type - Mother, Baby, Milk
  const [checked, setChecked] = useState({
    momPage: false,
    babyPage: false,
    milkPage: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.currentTarget;
    console.log(name, checked);
    setChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
    console.log(checked);
  };

  const startRegistration = () => {
    const selectedPages = Object.keys(checked).filter((key) => checked[key]);

    if (selectedPages.length > 0) {
      setRegisterStarted(true);
      setCurrentPage(0);
    }
  };

  const selectedPages = [];

  if (checked.momPage) selectedPages.push(<MotherRegistrationPage />);
  if (checked.babyPage) selectedPages.push(<BabyRegistrationPage />);
  if (checked.milkPage) selectedPages.push(<MilkRegistrationPage />);

  return (
    <>
      <section id="Register">
        <Navibar />
        <div className="register-title">
          <h1>Register</h1>
        </div>

        {!registerStarted && (
          <div className="register-selection-container">
            <div className="title">
              <h2>{"What would you like to register?"}</h2>
            </div>
            <div className="checkbox-container">
              {/* TODO: Create checkbox component */}
              <ToggleButton
                id="toggle-check-mom"
                type="checkbox"
                name="momPage"
                className={checked.momPage ? "check" : "uncheck"}
                checked={checked.momPage}
                onChange={handleCheckboxChange}
              >
                {checked.momPage ? (
                  <FontAwesomeIcon icon={faCheckSquare} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
                <span style={{ marginLeft: "10px" }}>Mother</span>
              </ToggleButton>
              <ToggleButton
                id="toggle-check-baby"
                type="checkbox"
                name="babyPage"
                className={checked.babyPage ? "check" : "uncheck"}
                checked={checked.babyPage}
                onChange={handleCheckboxChange}
              >
                {checked.babyPage ? (
                  <FontAwesomeIcon icon={faCheckSquare} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
                <span style={{ marginLeft: "10px" }}>Baby</span>
              </ToggleButton>
            </div>
            <div className="checkbox-container">
              <ToggleButton
                id="toggle-check-milk"
                type="checkbox"
                name="milkPage"
                className={checked.milkPage ? "check" : "uncheck"}
                checked={checked.milkPage}
                onChange={handleCheckboxChange}
              >
                {checked.milkPage ? (
                  <FontAwesomeIcon icon={faCheckSquare} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
                <span style={{ marginLeft: "10px" }}>Milk</span>
              </ToggleButton>
            </div>
            <div className="footer">
              <Button variant="primary" size="lg" onClick={startRegistration}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {/* TODO: Make nav buttons */}
        {registerStarted && currentPage !== null && (
          <>
            <div>{selectedPages[currentPage]}</div>
            <div className="nav-button-container">
              {currentPage > 0 && (
                <Button variant="primary" size="lg" onClick={prevPageToVisit}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span style={{ marginLeft: "10px" }}>Back</span>
                </Button>
              )}
              {currentPage < selectedPages.length - 1 && (
                <Button variant="primary" size="lg" onClick={nextPageToVisit}>
                  <span style={{ marginRight: "10px" }}>Next</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}

const MotherRegistrationPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className="title">
      <h2>{"Mother Details"}</h2>
    </div>
  </div>
);

const BabyRegistrationPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at baby details stage */}
    <div className="title">
      <h2>{"Baby Details"}</h2>
    </div>
  </div>
);

const MilkRegistrationPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at milk details stage */}
    <div className="title">
      <h2>{"Milk Details"}</h2>
    </div>
  </div>
);

const ConfirmDetailsPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className="title">
      <h2>{"Confirm Details"}</h2>
    </div>
  </div>
);

const PreviewGeneratedLabelPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className="title">
      <h2>{"Preview Details"}</h2>
    </div>
  </div>
);

const PrintLabelPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className="title">
      <h2>{"Print Label"}</h2>
    </div>
  </div>
);
