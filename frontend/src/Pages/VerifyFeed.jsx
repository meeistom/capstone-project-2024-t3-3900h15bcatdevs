import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import scanner from "../Assets/scanner.png";

export { VerifyFeed };

function VerifyFeed() {
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="verify-container">
          <div className="title">Verify Feed</div>
          <div className="checkbox-container">
            <div className="checkbox">
              <span className="empty-check"></span>
              <div className="text">Baby</div>
            </div>
            <div className="checkbox">
              <span className="empty-check"></span>
              <div className="text">Bottle</div>
            </div>
          </div>
          <div className="subtitle"> Please scan the barcode on the baby or the milk.</div>
          <img className="img" src={scanner}></img>
          <div className="text">Waiting for scan...</div>
        </div>
    </section>
    </>
  );
}
