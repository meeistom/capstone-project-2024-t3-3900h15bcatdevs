import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

import { Navibar } from "../../Components/Navibar";
import { MotherRegistration } from "./MotherRegistration";
import { BabyRegistration } from "./BabyRegistration";
import { MilkRegistration } from "./MilkRegistration";
import { ConfirmDetails } from "./ConfirmDetails";
import { PreviewGeneratedLabel } from "./PreviewGeneratedLabel";
import { PrintLabel } from "./PrintLabel";
import { Button, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export { Register };

function Register() {
  const [currentPage, setCurrentPage] = useState(null);
  const [registerStarted, setRegisterStarted] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
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
    const allSelectedPages = [];

    if (checked.momPage) allSelectedPages.push(<MotherRegistration />);
    if (checked.babyPage) allSelectedPages.push(<BabyRegistration />);
    if (checked.milkPage) allSelectedPages.push(<MilkRegistration />);

    const finalPages = [
      <ConfirmDetails />,
      <PreviewGeneratedLabel />,
      <PrintLabel />,
    ];

    const combinedPages = allSelectedPages.concat(finalPages);

    setSelectedPages(combinedPages);

    if (combinedPages.length > 3) {
      setRegisterStarted(true);
      setCurrentPage(0);
    }
  };

  return (
    <>
      <Navibar />
      <section id="Register">
        <div className="register-page-container">
          <div className="register-title">
            <h1>Register</h1>
          </div>

          {!registerStarted && (
            <>
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
              </div>
              <div className="nav-button-container">
                <div className="back-button-container"></div>
                <div className="next-button-container">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={startRegistration}
                  >
                    <span style={{ marginRight: "10px" }}>Next</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Navigation buttons */}
          {/* TODO: Make nav buttons */}
          {registerStarted && currentPage !== null && (
            <>
              <div>{selectedPages[currentPage]}</div>
              <div className="nav-button-container">
                <div className="back-button-container">
                  {currentPage > 0 && (
                    <Button
                      variant="outline-secondary"
                      size="lg"
                      onClick={prevPageToVisit}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span style={{ marginLeft: "10px" }}>Back</span>
                    </Button>
                  )}
                </div>
                <div className="next-button-container">
                  {currentPage < selectedPages.length - 1 && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={nextPageToVisit}
                    >
                      <span style={{ marginRight: "10px" }}>Next</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  )}
                  {/* Create return home button on last page */}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
