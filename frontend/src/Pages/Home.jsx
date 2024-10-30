import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navibar } from "../Components/Navibar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { AddMilkModal } from "../Components/AddMilkModal";
import axios from "axios";

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);

  const getNotifications = async () => {
    const url = 'http://localhost:5001/notifications'
    try {
      const response = await axios.get(url);
      const list = new Array(response.data)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

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
              {/* {getNotifications()} */}
            </div>
          </div>
          <div className="subtitle-2">
            Last updated Wed 30 Oct 2:20am
          </div>
          <div className="notification">
            <div className="text">
              milk 000000 from baby Jeff is about to expire at 9:00pm Thu 31 Oct 2024 
            </div>
            <div className="near-expiry-status"></div>
          </div>
          <div className="notification">
            <div className="text">
              milk 000000 from baby Jeff expired at 3:00am Wed 06 Oct 2024 
            </div>
            <div className="expired-status"></div>
          </div>
        </div>
      </section>
    </>
  );
}
