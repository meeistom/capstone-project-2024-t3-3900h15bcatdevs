import { React, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sticker from "../../Assets/milk1_label.png";
import "../../index.css";

export { PreviewGeneratedLabel };

function PreviewGeneratedLabel({ setImageRef }) {
  const imgRef = useRef(null);

  // Pass the ref to the parent component
  useEffect(() => {
    if (setImageRef) {
      setImageRef(imgRef);
    }
  }, [setImageRef]);

  return (
    <>
      <div className="register-details-container preview-label">
        {/* Render the progress bar at mother details stage */}
        <div className="title">
          <h2>{"Preview Label"}</h2>
        </div>
        <div className="body">
          <img ref={imgRef} src={sticker} alt="sticker" />
        </div>
      </div>
    </>
  );
}
