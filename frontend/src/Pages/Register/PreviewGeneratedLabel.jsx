import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

export { PreviewGeneratedLabel };

function PreviewGeneratedLabel() {
  return (
    <>
      <div className="register-details-container">
        {/* Render the progress bar at mother details stage */}
        <div className="title">
          <h2>{"Preview Label"}</h2>
        </div>
      </div>
    </>
  );
}
