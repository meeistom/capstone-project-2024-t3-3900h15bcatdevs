import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import { useNavigate } from "react-router-dom";
import scanner from "../Assets/scanner.png";
import confirmCheck from "../Assets/confirm-check.png"

export { VerifyFeed };

function VerifyFeed() {
  const scannerInputRef = useRef(null);
  const navigate = useNavigate();
  const [milkCheck, setMilkCheck] = useState(<span className={"empty-check"}></span>);
  const [babyCheck, setBabyCheck] = useState(<span className={"empty-check"}></span>);
  const [promptMessage, setPromptMessage] = useState("Please scan the barcode on the baby or milk.");
  const [promptType, setPromptType] = useState("verificationPrompt");
  let promptPage;

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const handleInput = () => {
    const scannedValue = scannerInputRef.current.value;
    if (scannedValue.length >= 0) {
      if (scannedValue === "milk") {
        // Will need to check expiry
        setMilkCheck(<img className="img" src={confirmCheck}></img>)
        if (babyCheck.type === 'img') {
          // Will need to check for match
          setPromptType("confirmation")
        } else {
          setPromptMessage("Please scan the barcode on the baby.")
        }
      } else if (scannedValue === "baby") {
        setBabyCheck(<img className="img" src={confirmCheck}></img>)
        if (milkCheck.type === 'img') {
          // Will need to check for match
          setPromptType("confirmation")
        } else {
          setPromptMessage("Please scan the barcode on the milk.")
        }
      }
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  switch (promptType) {
    case "verificationPrompt":
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
          class="btn btn-primary home-button"
          onClick={goToHome}>Return Home</button>
        </>
      )
      break;
  };

  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="verification-page">
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
