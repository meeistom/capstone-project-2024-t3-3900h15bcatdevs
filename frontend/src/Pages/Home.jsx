import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import "../index.css";
import { AddMilkModal } from "../Components/AddMilkModal";
import { Table } from "../Components/Table";

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);
  // call backend to get milk infos

  let fake_data = [
    {
      uid: 346363,
      express_time: 1,
      expiration_time: 2,
      baby_mrn: "43636436",
      mother_mrn: "21412451251",
      extra_notes: "im notes"      
    },
    {
      uid: 346363,
      express_time: 1,
      expiration_time: 2,
      baby_mrn: "43636436",
      mother_mrn: "21412451251",
      extra_notes: "im notes"      
    },
    {
      uid: 346363,
      express_time: 1,
      expiration_time: 2,
      baby_mrn: "43636436",
      mother_mrn: "21412451251",
      extra_notes: "im notes"      
    }
  ]
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">List of Milk Entries</h1>
          <p>Total Number of Milk Entries: {fake_data.length}</p>
          <Table data={fake_data} setOpenModal = {setOpenModal} viewType="viewMilk"/>
        </div>
        {openModal && (
          <AddMilkModal closeModal={setOpenModal} version="addMilk1" />
        )}
      </section>
    </>
  );
}
