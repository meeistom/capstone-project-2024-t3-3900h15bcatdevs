import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navibar } from "../Components/Navibar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { AddMilkModal } from "../Components/AddMilkModal";

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section id="Home">
        <Navibar />
        <Button
          id="scan-btn"
          name="scan-btn"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> New Milk Entry
        </Button>
        {openModal && (
          <AddMilkModal closeModal={setOpenModal} version="addMilk1" />
        )}
        <div className="notifications-container">
          <div className="title-box">
            Notifications
            <div className="subtitle-1">
              (5)
            </div>
          </div>
          <div className="subtitle-2">
            Last updated Wed 30 Oct 2:20am
          </div>
          <div className="notification-container">
            <div className="text">
              hello
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
