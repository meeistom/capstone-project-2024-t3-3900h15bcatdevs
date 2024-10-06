import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navibar } from "../Components/Navibar";
import { Modal } from "../Components/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "../index.css";

export { Home };

function Home() {
  
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <>
      <section id="Home">
        <Navibar />
        <Button id="scan-btn" onClick={() => {setOpenModal(true)}}>
          <FontAwesomeIcon icon={faPlus} /> New Milk Entry
        </Button>
        {openModal && <Modal closeModal={setOpenModal} version="addMilk1"/>}
        this is da home
      </section>
    </>
  );
}
