import { React, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

import { Navibar } from "../../Components/Navibar";
import { CheckboxButton } from "../../Components/CheckboxButton";
import { MotherRegistration } from "./MotherRegistration";
import { BabyRegistration } from "./BabyRegistration";
import { MilkRegistration } from "./MilkRegistration";
import { ConfirmDetails } from "./ConfirmDetails";
import { PreviewGeneratedLabel } from "./PreviewGeneratedLabel";
import { NextButton } from "../../Components/NextButton";
import { BackButton } from "../../Components/BackButton";
import { Button } from "react-bootstrap";

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

  const URL = "http://127.0.0.1:5001";

  const imageRef = useRef(null);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const nextPageToVisit = () => {
    if (selectedPages[currentPage] == "babyPage" && !babyPageIsValid()) return;
    if (selectedPages[currentPage] == "momPage" && !momPageIsValid()) return;
    if (selectedPages[currentPage] == "milkPage" && !milkPageIsValid()) return;
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const prevPageToVisit = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  // Registration Type - Mother, Baby, Milk
  const [checked, setChecked] = useState({
    momPage: false,
    babyPage: false,
    milkPage: false,
  });

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
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

    if (pages.length <= 1) return;

    pages.push("confirm", "preview");

    setSelectedPages(pages);
    setRegisterStarted(true);
    setCurrentPage(1);
  };

  const printImage = () => {
    if (imageRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `<img src="${imageRef.current.src}" alt="sticker" style="max-width: 100%;" />`
      );
      printWindow.document.close();
      printWindow.print();
    }
  };

  const babyPageIsValid = () => {
    if (babyMRN === "" || babyFirstName === "" || babyLastName === "") {
      return false;
    }
    return true;
  };

  const momPageIsValid = () => {
    if (momMRN === "" || momFirstName === "" || momLastName === "") {
      return false;
    }
    return true;
  };

  const milkPageIsValid = () => {
    if (expiryDate === "" || expressDate === "") {
      return false;
    }
    return true;
  };

  const submitMomInfo = () => {
    const momInfo = {
      mrn: momMRN,
      first_name: momFirstName,
      last_name: momLastName,
    };

    const url = `${URL}/add_mother`;
    axios
      .post(url, momInfo)
      .then((res) => {
        console.log(`Mom details added: ${momInfo}`);
      })
      .catch((e) => {
        console.error("Unable to post mom info", e);
      });
  };

  const submitBabyInfo = () => {
    const babyInfo = {
      mrn: babyMRN,
      first_name: babyFirstName,
      last_name: babyLastName,
      mother_mrn: momMRN,
    };

    const url = `${URL}/add_baby`;
    axios
      .post(url, babyInfo)
      .then((res) => {
        console.log(`Baby details added: ${babyInfo}`);
      })
      .catch((e) => {
        console.error("Unable to post baby info", e);
      });
  };

  const submitMilkInfo = () => {
    const milkInfo = {
      uid: "0000",
      milkType: milkType,
      express_time: expressDate,
      expiration_time: expiryDate,
      storage_type: storageType,
      storage_location: storageType,
      volume_ml: 100,
      owner_mrn: momMRN,
      extra_notes: notes,
    };

    const url = `${URL}/add_milk`;
    axios
      .post(url, milkInfo)
      .then((response) => {
        console.log("Bottle details added:");
      })
      .catch((error) => {
        console.error("Error posting bottle details:", error);
      });
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
        // if (checked.momPage) submitMomInfo();
        // if (checked.babyPage) submitBabyInfo();
        // if (checked.milkPage) submitMilkInfo();
        setRenderedPage(
          <PreviewGeneratedLabel
            setImageRef={(ref) => (imageRef.current = ref.current)}
          />
        );
        break;
    }
  }, useEffectDependencies);

  return (
    <>
      <Navibar />
      <section id="Register">
        <div className="register-page-container d-flex flex-column align-items-center h-100">
          <div className="register-title text-center">
            <h1>Register</h1>
          </div>

          {!registerStarted && (
            <>
              <div className="register-selection-container d-flex flex-column justify-content-between align-items-center">
                <div className="title fs-3 text-center position-relative">
                  <h2>{"What would you like to register?"}</h2>
                </div>
                <div className="checkbox-container d-flex fs-1 justify-content-center">
                  <CheckboxButton
                    id="toggle-check-mom"
                    name="momPage"
                    isChecked={checked.momPage}
                    onChange={handleCheckboxChange}
                  >
                    Mother
                  </CheckboxButton>
                  <CheckboxButton
                    id="toggle-check-baby"
                    name="babyPage"
                    isChecked={checked.babyPage}
                    onChange={handleCheckboxChange}
                  >
                    Baby
                  </CheckboxButton>
                </div>
                <div className="checkbox-container">
                  <CheckboxButton
                    id="toggle-check-milk"
                    name="milkPage"
                    isChecked={checked.milkPage}
                    onChange={handleCheckboxChange}
                  >
                    Milk
                  </CheckboxButton>
                </div>
              </div>
              <div className="nav-button-container">
                <div className="back-button-container justify-content-start"></div>
                <div className="next-button-container justify-content-end">
                  <NextButton id="start-rgstr-btn" onClick={startRegistration}>
                    Next
                  </NextButton>
                </div>
              </div>
            </>
          )}

          {/* Navigation buttons */}
          {registerStarted && currentPage !== null && (
            <>
              <div className="rendered-page">{renderedPage}</div>
              <div className="nav-button-container">
                <div className="back-button-container justify-content-start">
                  {currentPage > 0 && (
                    <BackButton id="back-btn" onClick={prevPageToVisit}>
                      Back
                    </BackButton>
                  )}
                </div>
                <div className="next-button-container d-flex justify-content-end">
                  {currentPage < selectedPages.length - 1 && (
                    <NextButton id="next-btn" onClick={nextPageToVisit}>
                      Next
                    </NextButton>
                  )}
                  {currentPage === selectedPages.length - 1 && (
                    <>
                      <Button
                        name="rgstr-print-label"
                        variant="outline-primary"
                        size="lg"
                        onClick={printImage}
                      >
                        Print Label
                      </Button>
                      <Button
                        name="return-home"
                        variant="primary"
                        size="lg"
                        onClick={goToHome}
                      >
                        Return Home
                      </Button>
                    </>
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
