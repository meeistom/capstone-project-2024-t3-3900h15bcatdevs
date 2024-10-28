import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar} from "../Components/Navibar";
import { useNavigate } from "react-router-dom";
import scanner from "../Assets/scanner.png";
import confirmCheck from "../Assets/confirm-check.png"
import axios from "axios";

export { VerifyFeed };

function VerifyFeed() {
  const scannerInputRef = useRef(null);
  const navigate = useNavigate();
  const [milkCheck, setMilkCheck] = useState(<span className={"empty-check"}></span>);
  const [babyCheck, setBabyCheck] = useState(<span className={"empty-check"}></span>);
  const [milkBarcode, setMilkBarcode] = useState("");
  const [babyBarcode, setBabyBarcode] = useState("");
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
        // if (barcodeInfo.expired == true) {
        //   openAlert(`Milk ${barcode} expired on ${barcodeInfo.expiration_time}.`)
        // }
        setMilkBarcode(barcode);
        if (babyBarcode == "") {
          setMilkCheck(<img className="img" src={confirmCheck}></img>);
        } else {
          await checkMatch(barcode, babyBarcode)
        }

      // If a mother barcode is scanned raise error
      } else {
        openAlert("Mother barcode scanned. Please scan a valid milk or baby barcode.")
      }

      return response.data;
    } catch (error) {
      // If barcode not found in system raise error
      console.log("Error with verification", error)
      openAlert("Barcode not found.")
      return error.status;
    }
  }

  const checkMatch = async (milk_barcode, baby_barcode) => {
    const url = `http://localhost:5001/verify?milk_uid=${milk_barcode}&baby_mrn=${baby_barcode}`
    try {
      const response = await axios.get(url);
      console.log("verification check response", response.data);
    } catch (error) {
      console.log("error in verification", error)
    }

  }

  const handleInput = async () => {
    const scannedValue = scannerInputRef.current.value;
    if (scannedValue.length >= 4) {
      // Sets scanner input to empty again
      document.getElementById("scanner-input").value = ""

      // Checks if scanned barcode is valid
      await checkBarcode(scannedValue);

    };
  };
    //   if (milkBarcodes.includes(scannedValue)) {
    //     setMilkCheck(<img className="img" src={confirmCheck}></img>)
    //     setMilkBarcode(scannedValue);
    //     if (babyCheck.type === 'img') {
    //       console.log(babyCheck.className)
    //       // Will need to check for match
    //       if (milkBarcodes.indexOf(scannedValue) == babyBarcodes.indexOf(babyBarcode)) {
    //         setPromptType("confirmation");
    //       } else {
    //         setMilkCheck(<span className={"empty-check"}></span>)
    //         openAlert("The scanned milk does not match the scanned baby.")
    //       }
    //     } else {
    //       setPromptMessage("Please scan the barcode on the baby.");
    //     }
    //   } else if (babyBarcodes.includes(scannedValue)) {
    //     setBabyCheck(<img className="img" src={confirmCheck}></img>);
    //     setBabyBarcode(scannedValue)
    //     if (milkCheck.type === 'img') {
    //       // Will need to check for match
    //       if (babyBarcodes.indexOf(scannedValue) == milkBarcodes.indexOf(milkBarcode)) {
    //         setPromptType("confirmation");
    //       } else {
    //         setBabyCheck(<span className={"empty-check"}></span>);
    //         openAlert("The scanned milk does not match the scanned baby.");
    //       }
    //     } else {
    //       setPromptMessage("Please scan the barcode on the milk.");
    //     } 
    //   } else {
    //     openAlert("Barcode not found in the system.");
    //   }
    // }
  // };

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
            id ="scanner-input"
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
