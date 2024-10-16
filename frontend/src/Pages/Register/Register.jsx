import { React, useEffect, useState } from "react";
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
  const [momMRN, setMomMRN] = useState("");
  const [momFirstName, setMomFirstName] = useState("");
  const [momLastName, setMomLastName] = useState("");
  const [renderedPage, setRenderedPage] = useState(null);
  const [babyMRN, setBabyMRN] = useState("");
  const [babyFirstName, setBabyFirstName] = useState("");
  const [babyLastName, setBabyLastName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expressDate, setExpressDate] = useState("");
  const [notes, setNotes] = useState("");
  const [milkType, setMilkType] = useState("ehm");
  const [storageType, setStorageType] = useState("fridge");

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const nextPageToVisit = () => {
    console.log(`Next Page: ${currentPage + 1}`);
    console.log(selectedPages[currentPage]);
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const prevPageToVisit = () => {
    console.log(`Prev Page: ${currentPage - 1}`);
    console.log(selectedPages[currentPage]);
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
    setChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const startRegistration = () => {
    const pages = ["prePage"];

    if (checked.momPage) pages.push("momPage");
    if (checked.babyPage) pages.push("babyPage");
    if (checked.milkPage) pages.push("milkPage");
    pages.push("confirm", "preview", "print");

    setSelectedPages(pages);
    setRegisterStarted(true);
    setCurrentPage(1);
  };

  const useEffectDependencies = [
    selectedPages,
    currentPage,
    momMRN,
    momFirstName,
    momLastName,
    babyMRN,
    babyFirstName,
    babyLastName,
    expiryDate,
    expressDate,
    notes,
    milkType,
    storageType,
  ];

  useEffect(() => {
    switch (selectedPages[currentPage]) {
      case "prePage":
        setRegisterStarted(false);
        break;
      case "momPage":
        setRenderedPage(
          <MotherRegistration
            momMRN={momMRN}
            setMomMRN={setMomMRN}
            momFirstName={momFirstName}
            setMomFirstName={setMomFirstName}
            momLastName={momLastName}
            setMomLastName={setMomLastName}
          />
        );
        break;
      case "babyPage":
        setRenderedPage(
          <BabyRegistration
            babyMRN={babyMRN}
            setBabyMRN={setBabyMRN}
            babyFirstName={babyFirstName}
            setBabyFirstName={setBabyFirstName}
            babyLastName={babyLastName}
            setBabyLastName={setBabyLastName}
          />
        );
        break;
      case "milkPage":
        setRenderedPage(
          <MilkRegistration
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            expressDate={expressDate}
            setExpressDate={setExpressDate}
            notes={notes}
            setNotes={setNotes}
            milkType={milkType}
            setMilkType={setMilkType}
            storageType={storageType}
            setStorageType={setStorageType}
          />
        );
        break;
      case "confirm":
        setRenderedPage(
          <ConfirmDetails
            momMRN={momMRN}
            momFirstName={momFirstName}
            momLastName={momLastName}
            babyMRN={babyMRN}
            babyFirstName={babyFirstName}
            babyLastName={babyLastName}
            exiryDate={expiryDate}
            expressDate={expressDate}
            notes={notes}
            milkType={milkType}
            storageType={storageType}
            checked={checked}
          />
        );
        break;
      case "preview":
        // Would submit details to backend at this point
        setRenderedPage(<PreviewGeneratedLabel />);
        break;
      case "print":
        setRenderedPage(<PrintLabel />);
        break;
    }
  }, useEffectDependencies);

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
              <div className="rendered-page">{renderedPage}</div>
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
                  {currentPage === selectedPages.length - 1 && (
                    <Button variant="primary" size="lg" onClick={goToHome}>
                      <span>Return Home</span>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
