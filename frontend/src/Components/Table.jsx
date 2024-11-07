import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {
  faPlus,
  faFilter,
  faTrash,
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewInfoModal } from "./ViewInfoModal";

export { Table };

function Table({
  deleteMilk,
  displayData,
  setDisplayData,
  setOpenModal,
  viewType,
}) {
  const viewConfigs = {
    viewMilk: [
      { label: "milk ID", key: "uid" },
      { label: "Baby", key: "baby_name" },
      { label: "Mother", key: "mother_name" },
      { label: "Express time", key: "express_time" },
      { label: "Expiration time", key: "expiration_time" },
      { label: "Storage Type", key: "storage_type" },
    ],
    viewMother: [
      { label: "MRN", key: "mrn" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name" },
      { label: "Associate Babies", key: "babies" },
    ],
    viewBaby: [
      { label: "MRN", key: "mrn" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name" },
      { label: "Mother", key: "mother_mrn" },
    ],
    viewLog: [
      { label: "Log ID", key: "logId" },
      { label: "Timestamp", key: "timestamp" },
      { label: "Event", key: "event" },
    ],
  };
  const columns = viewConfigs[viewType] || [];
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [info, setInfo] = useState(null);
  const URL = "http://127.0.0.1:5001";
  const [searchValue, setSearchValue] = useState("");

  const handlePopUp = (entry) => {
    setInfo(entry);
    setOpenEntryModal(true);
    console.log(entry);
  };
  const handleClosePopUp = () => {
    setInfo(null);
    setOpenEntryModal(false);
  };

  const handleSearch = async () => {
    console.log(searchValue);
    let result;
    try {
      console.log("Quering backend");
      const response = await fetch(`${URL}/search?keyword=${searchValue}`);
      if (!response.ok) {
        throw new Error("Could not find relative entry with such keyword");
      }
      result = await response.json();
    } catch (error) {
      setError(error);
    } finally {
      if (result) {
        console.log(result);
        switch (viewType) {
          case "viewMilk":
            result = result.milk_entries;
            const milk_uids = result.map((entry) => entry.uid);
            setDisplayData(
              displayData.filter((entry) => milk_uids.includes(entry.uid))
            );
            break;
          case "viewMother":
            result = result.mothers;
            const mother_ids = result.map((entry) => entry.mrn);
            setDisplayData(
              displayData.filter((entry) => mother_ids.includes(entry.mrn))
            );
            break;
          case "viewBaby":
            result = result.babies;
            const baby_ids = result.map((entry) => entry.mrn);
            setDisplayData(
              displayData.filter((entry) => baby_ids.includes(entry.mrn))
            );
            break;
        }
      }
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="table-header-block">
            <td colSpan="100%">
              <div className="table-header">
                <button className="btn btn-outline-secondary sort-btn">
                  <FontAwesomeIcon icon={faFilter} />
                </button>
                <div className="search-bar input-group">
                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? handleSearch() : null
                    }
                    value={searchValue}
                    type="text"
                    className="form-control"
                    placeholder="Seach..."
                    aria-describedby="button-search"
                  />
                  <button
                    onClick={() => handleSearch()}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-search"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <button
                    onClick={() => setDisplayData(displayData)}
                    className="btn btn-outline-secondary"
                  >
                    <FontAwesomeIcon icon={faArrowsRotate} />
                  </button>
                </div>
                {viewType === "viewMilk" && (
                  <Button id="scan-btn" onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus} /> New Milk Entry
                  </Button>
                )}
              </div>
            </td>
          </tr>
          <tr>
            {columns.map((column) =>
              column.key === "storage_type" ? (
                <th colSpan={2} key={column.key}>
                  {column.label}
                </th>
              ) : (
                <th key={column.key}>{column.label}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((item, index) => (
              // make the entry colours alternate
              <tr
                key={item.uid || item.mrn || index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                {columns.map((column) =>
                  // only milk entries(on the home page) will activate a pop up for details when clicking onto an entry
                  viewType === "viewMilk" ? (
                    <td onClick={() => handlePopUp(item)} key={column.key}>
                      {item[column.key]}
                    </td>
                  ) : (
                    <td key={column.key}>{item[column.key]}</td>
                  )
                )}
                {viewType === "viewMilk" && ( // only milk entries are deletable
                  <td key="delete-button">
                    <button className="dlt-btn">
                      <FontAwesomeIcon
                        onClick={() => deleteMilk(item)}
                        icon={faTrash}
                      />
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
      {openEntryModal && (
        <ViewInfoModal
          info={info}
          closeModal={handleClosePopUp}
          version={viewType}
        />
      )}
    </div>
  );
}
