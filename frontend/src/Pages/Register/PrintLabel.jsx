import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

export { PrintLabel };

function PrintLabel() {
  return (
    <>
      <div className="register-details-container">
        {/* Render the progress bar at mother details stage */}
        <div className="title">
          <h2>{"Print Label"}</h2>
        </div>
      </div>
    </>
  );
}
