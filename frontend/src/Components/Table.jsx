import React from 'react'
import Button from "react-bootstrap/Button";
import { faPlus, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export {Table};

function Table({ setOpenModal }) {
  let fake_data = [
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      time: 1,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    }
  ]
  return (
      <div className="table-container">
        <table>
          <thead>
            <tr className="table-header-block">
              <td colSpan="100%">
                <div className="table-header">
                  <button className="btn btn-outline-secondary sort-btn"><FontAwesomeIcon icon={faFilter} /></button>
                  <input className="search-bar form-control" type="text" placeholder="Search..."/>
                  <Button id="scan-btn" onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus} /> New Milk Entry
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <th>#</th>
              <th>Baby Name</th>
              <th>type</th>
              <th>Collection time</th>
              <th>Expiry time</th>
              <th colSpan={2}>Notes</th>
            </tr>
          </thead>
          
          <tbody>
            {fake_data.length > 0 ? (
              fake_data.map((item, index) => (
                <tr key={item.mrn} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <th>{item.mrn}</th>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.time}</td>
                  <td>{item.time}</td>
                  <td>{item.action}</td>
                  <td className="table-btn"><button className="dlt-btn"><FontAwesomeIcon icon={faTrash} /></button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}

