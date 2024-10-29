import React from "react";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { Modal };

function Modal({ id, title, body, footer, closeModal }) {
  return (
    <>
      <div
        id={id}
        className="modal-background position-fixed d-flex justify-content-center align-items-center w-100 h-100"
      >
        <div className="modal-container position-relative bg-white rounded-3 shadow-lg d-flex flex-column p-4">
          <div className="modal-close-btn d-flex justify-content-end">
            <Button
              variant="link"
              name="close-modal"
              aria-label="close-modal"
              onClick={() => closeModal(false)}
            >
              <FontAwesomeIcon className="close-btn" icon={faXmark} />
            </Button>
          </div>
          <div className="title fs-2 text-center">
            <p>{title}</p>
          </div>
          <div className="body d-flex justify-content-center align-items-center flex-column">
            {body}
          </div>
          <div className="footer d-flex justify-content-center mt-auto w-100 align-items-center">
            {footer}
          </div>
        </div>
      </div>
    </>
  );
}
