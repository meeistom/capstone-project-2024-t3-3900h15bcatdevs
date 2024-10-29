import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import { useNavigate } from "react-router-dom";
import scanner from "../Assets/scanner.png";
import confirmCheck from "../Assets/confirm-check.png"
import axios from "axios";

export { VerifyFeed };

function VerifyFeed() {
  const navigate = useNavigate();
  const scannerInputRef = useRef(null);

  const [milkCheck, setMilkCheck] = useState(<span className={"empty-check"}></span>);
  const [babyCheck, setBabyCheck] = useState(<span className={"empty-check"}></span>);
  const [milkBarcode, setMilkBarcode] = useState("");
  const [babyBarcode, setBabyBarcode] = useState("");

  const [promptMessage, setPromptMessage] = useState("Please scan the barcode on the baby or milk.");
  const [promptType, setPromptType] = useState("scan");
  let promptPage;

  const [alertMessage, setAlertMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [display, setDisplay] = useState("none")

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const checkBarcode = async (barcode) => {
    const url = `http://localhost:5001/verify?barcode=${barcode}`
    try {
      const response = await axios.get(url);
      console.log("barcode check response", response.data);
      const barcodeInfo = response.data;
      
      // If baby barcode is scanned, save barcode
      if (barcodeInfo.collection == "babies") {
        setBabyBarcode(barcode);
        if (milkBarcode == "") {
          setBabyCheck(<img className="img" src={confirmCheck}></img>);
        } else {
          // check for match
          await checkMatch(milkBarcode, barcode);
        }

      // If milk barcode is scanned, check if expired, else save barcode
      } else if (barcodeInfo.collection == "milk_entries") {
        if (barcodeInfo.expired == true) {
          openAlert(`Milk ${barcode} expired at ${barcodeInfo.expiration_time}.`)
        } else {
          setMilkBarcode(barcode);
          if (babyBarcode == "") {
            setMilkCheck(<img className="img" src={confirmCheck}></img>);
            setPromptMessage("Please scan the barcode on the baby.");
          } else {
            await checkMatch(barcode, babyBarcode)
          }
        }

      // If a mother barcode is scanned raise error
      } else {
        openAlert("Mother barcode scanned. Please scan a valid milk or baby barcode.")
      }

      return response.data;
    } catch (error) {
      // If barcode not found in system raise error
      console.log(error)
      openAlert("Barcode not found.")
      return error.status;
    }
  }

  const checkMatch = async (milk_barcode, baby_barcode) => {
    const url = `http://localhost:5001/verify_feed?milk_uid=${milk_barcode}&baby_mrn=${baby_barcode}`
    try {
      const response = await axios.get(url);
      console.log("verification check response", response.data);

      // If milk and baby match, go to confirmation
      setMilkCheck(<img className="img" src={confirmCheck}></img>);
      setBabyCheck(<img className="img" src={confirmCheck}></img>);
      setPromptType("confirmation");
      
    } catch (error) {
      // If mismatch
      if (error.status == 400) {
        const milkOwner = error.response.data.milk_owner_baby_name
        const scannedBaby = error.response.data.mismatch_baby_name
        openAlert(`Mismatch. The scanned milk belongs to ${milkOwner} but the scanned baby is ${scannedBaby}.`)
      } else {
        // If 404 error, ie invalid barcode or expired milk
        openAlert(error.message.error);
      }
    }
  }

  const handleInput = async () => {
    const scannedValue = scannerInputRef.current.value;
    if (scannedValue.length >= 4) {
      // Sets scanner input to empty again
      document.getElementById("scanner-input").value = ""

      // Checks if scanned barcode is valid, verifies match
      await checkBarcode(scannedValue);
    };
  };

  const goToHome = () => {
    navigate("/");
  };

  const closeAlert = () => {
    setFilter("");
    setDisplay("none");
  };

  const openAlert = (message) => {
    setAlertMessage(message);
    setFilter("blur(2px)");
    setDisplay("");
  };

  switch (promptType) {
    case "scan":
      promptPage = (
        <>
          <div className="subtitle">{promptMessage}</div>
          <img className="img" src={scanner}></img>
          <div className="text">Waiting for scan...</div>
          <input
            type="text"
            id="scanner-input"
            className="scanner-input"
            ref={scannerInputRef}
            onChange={handleInput}
          ></input>
        </>
      );
      break;
    case "confirmation":
      promptPage = (
        <>
          <div>
            <div className="subtitle">Verification Complete!</div>
            <div className="text" style={{ marginTop: "10px" }}>
              Feed has been recorded.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary home-button"
            name="return-home"
            onClick={goToHome}
          >
            Return Home
          </button>
        </>
      );
      break;
  }

  return (
    <>
      <section id="Home">
        <Navibar />
        <div id="verify-alert" className="alert-container">
          <div
            className="alert alert-danger alert-popup alert-dismissable fade show"
            style={{ display }}
          >
            <h4 className="alert-heading">Error</h4>
            <button
              type="button"
              name="close-alert"
              className="btn-close alert-close"
              onClick={closeAlert}
            ></button>
            <hr></hr>
            <div className="text">{alertMessage}</div>
          </div>
        </div>
        <div className="verification-page" style={{ filter }}>
          <div className="title">Verify Feed</div>
          <div className="checkbox-container">
            <div className="checkbox">
              <div>{babyCheck}</div>
              <div className="text">Baby</div>
            </div>
            <div className="checkbox">
              <div>{milkCheck}</div>
              <div className="text">Bottle</div>
            </div>
          </div>
          <div className="prompt-container">{promptPage}</div>
        </div>
      </section>
    </>
  );
}
