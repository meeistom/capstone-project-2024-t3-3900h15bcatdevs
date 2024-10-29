import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import { Table } from "../Components/Table";


  
export { ViewMothers };
  
function ViewMothers() {
  let fake_data = [
    {
      mrn: 346363,
      first_name: "123",
      last_name: "2141",
      babies: "21412451251"
    },
    {
      mrn: 346363,
      first_name: "1113",
      last_name: "2411",
      babies: ["21412451251", "fsadgag"]
    },
    {
      mrn: 346363,
      first_name: "first",
      last_name: "last",
      babies: "21412451251"
    }
  ]
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">Mothersss</h1>
          <p>Total number of mothers: {fake_data.length}</p>
          <Table data={fake_data} setOpenModal = {null} viewType="viewMother"/>
        </div>
      </section>
    </>
  );
}