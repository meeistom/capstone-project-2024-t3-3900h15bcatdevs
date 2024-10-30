import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import { faPlus, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewInfoModal } from './ViewInfoModal';

export {Table};

function Table({ data, setOpenModal, viewType }) {

  const viewConfigs = {
    "viewMilk": [
      { label: "milk ID", key: "uid" },
      { label: "Baby", key: "baby_name" },
      { label: "Mother", key: "mother_name" },
      { label: "Express time", key: "express_time" },
      { label: "Expiration time", key: "expiration_time"},
      { label: "Storage Type", key: "storage_type"},
    ],
    "viewMother": [
      { label: "MRN", key: "mrn" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name"},
      { label: "Associate Baby(ies)", key: "babies" }
    ],
    "viewBaby": [
      { label: "MRN", key: "mrn" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name"},
      { label: "Mother", key: "mother_mrn" }
    ],
    "viewLog": [
      { label: "Log ID", key: "logId" },
      { label: "Timestamp", key: "timestamp" },
      { label: "Event", key: "event" }
    ]
  };
  const columns = viewConfigs[viewType] || [];
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [info, setInfo] = useState(null);

  const handlePopUp = (entry) => {
    setInfo(entry);
    setOpenEntryModal(true);
    console.log(entry);
  }
  const handleClosePopUp = () => {
    setInfo(null);
    setOpenEntryModal(false);
  }
  
  return (
      <div className="table-container">
        <table>
          <thead>
            <tr className="table-header-block">
              <td colSpan="100%">
                <div className="table-header">
                  <button className="btn btn-outline-secondary sort-btn"><FontAwesomeIcon icon={faFilter} /></button>
                  <input className="search-bar form-control" type="text" placeholder="Search..."/>
                  {viewType === "viewMilk" && <Button id="scan-btn" onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus} /> New Milk Entry
                  </Button>}
                </div>
              </td>
            </tr>
            <tr>
            {columns.map((column) => (
              column.key === "storage_type" ? ( 
                <th colSpan={2} key={column.key}>{column.label}</th>
              ) : (
                <th key={column.key}>{column.label}</th>
              )
            ))}
            </tr>
          </thead>
          
          <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.uid || item.mrn || index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                {columns.map((column) => (
                  <td onClick={() => {handlePopUp(item)}} key={column.key}>
                    {item[column.key]}
                  </td>
                ))}
                {viewType === "viewMilk" && (
                  <td key="delete-button">
                    <button className="dlt-btn">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
              <tr>
                <td colSpan={columns.length}>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        {openEntryModal && <ViewInfoModal info={info} closeModal={handleClosePopUp} version={viewType} />}
      </div>
  )
}

