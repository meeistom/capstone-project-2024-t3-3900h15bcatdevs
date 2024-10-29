import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navibar } from "../Components/Navibar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { AddMilkModal } from "../Components/AddMilkModal";
import { Table } from "../Components/Table";

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">List of Milk Entries</h1>
          <p>sub - info</p>
          <Table setOpenModal = {setOpenModal} />
        </div>
        {openModal && (
          <AddMilkModal closeModal={setOpenModal} version="addMilk1" />
        )}
      </section>
    </>
  );
}
