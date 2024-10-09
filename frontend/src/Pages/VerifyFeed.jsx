import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar} from "../Components/Navibar";
import { useNavigate } from "react-router-dom";
import scanner from "../Assets/scanner.png";
import confirmCheck from "../Assets/confirm-check.png"
import Alert from "react-bootstrap/Button";

export { VerifyFeed };

function VerifyFeed() {
  const scannerInputRef = useRef(null);
  const navigate = useNavigate();
  const [milkCheck, setMilkCheck] = useState(<span className={"empty-check"}></span>);
  const [babyCheck, setBabyCheck] = useState(<span className={"empty-check"}></span>);
  const [promptMessage, setPromptMessage] = useState("Please scan the barcode on the baby or milk.");
  const [promptType, setPromptType] = useState("scan");
  const [alertMessage, setAlertMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [display, setDisplay] = useState("none")
  let promptPage;

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const handleInput = () => {
    const scannedValue = scannerInputRef.current.value;
    if (scannedValue.length == 4) {
      if (scannedValue === "milk") {
        // Will need to check expiry
        setMilkCheck(<img className="img" src={confirmCheck}></img>)
        if (babyCheck.type === 'img') {
          console.log(babyCheck.className)
          // Will need to check for match
          setPromptType("confirmation");
        } else {
          setPromptMessage("Please scan the barcode on the baby.");
        }
      } else if (scannedValue === "baby") {
        setBabyCheck(<img className="img" src={confirmCheck}></img>);
        console.log(milkCheck)
        if (milkCheck.type === 'img') {
          // Will need to check for match
          setPromptType("confirmation");
        } else {
          setPromptMessage("Please scan the barcode on the milk.");
        }
      } else {
        openAlert("The scanned milk does not match the scanned baby")
      }
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const closeAlert = () => {
    setFilter("")
    setDisplay("none")
  }

  const openAlert = (message) => {
    setAlertMessage(message)
    setFilter("blur(2px)")
    setDisplay("")
  }

  switch (promptType) {
    case "scan":
      promptPage = (
        <>
          <div className="subtitle">{promptMessage}</div>
          <img className="img" src={scanner}></img>
          <div className="text">Waiting for scan...</div>
          <input
            type="text"
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
          <div className="text" style={{marginTop: "10px"}}>Feed has been recorded.</div>
        </div>
        <button 
          type="button" 
          className="btn btn-primary home-button"
          onClick={goToHome}>Return Home</button>
        </>
      )
      break;
  };

  return (
    <>
      <section id="Home" >
        <Navibar />
        <div className="alert-container">
          <div className="alert alert-danger alert-popup alert-dismissable fade show" style={{display}}>
            <h4 className="alert-heading">Error</h4>
            <button type="button" className="btn-close alert-close" onClick={closeAlert}></button>
            <hr></hr>
            <div className="text">{alertMessage}</div>
          </div>
        </div>
        <div className="verification-page" style={{filter}}>
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
