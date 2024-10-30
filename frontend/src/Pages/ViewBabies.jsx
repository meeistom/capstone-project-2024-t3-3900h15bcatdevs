import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import { Table } from "../Components/Table";

export { ViewBabies };

function ViewBabies() {
  let fake_data = [
    {
      mrn: 346313,
      first_name: "123",
      last_name: "2141",
      mother_mrn: "21412451251"
    },
    {
      mrn: 326363,
      first_name: "1113",
      last_name: "2411",
      mother_mrn: "21412451251"
    },
    {
      mrn: 346363,
      first_name: "first",
      last_name: "last",
      mother_mrn: "21412451251"
    }
  ]
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">Babies</h1>
          <p>Total number of babies: {fake_data.length}</p>
          <Table data={fake_data} setOpenModal = {null} viewType="viewBaby"/>
        </div>
      </section>
    </>
  );
}
