import { React, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sticker from "../../Assets/milk1_label.png";
import "../../index.css";

export { PreviewGeneratedLabel };

function PreviewGeneratedLabel({ setImageRef, milkChecked }) {
  const imgRef = useRef(null);

  // Pass the ref to the parent component
  useEffect(() => {
    if (setImageRef) {
      setImageRef(imgRef);
    }
  }, [setImageRef]);

  return (
    <>
      <div className="register-details-container preview-label min-vh-50">
        <div className="title">
          {milkChecked && <h2>Preview Label</h2>}
          {!milkChecked && <h2>Register Complete</h2>}
        </div>
        <div className="body d-flex flex-column justify-content-between">
          {milkChecked && <img ref={imgRef} src={sticker} alt="sticker" />}
          {!milkChecked && (
            <p>
              Registration has been successfully completed. You may return to
              the home page now.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
