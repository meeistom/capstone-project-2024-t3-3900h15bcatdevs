import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  faPlus,
  faFilter,
  faTrash,
  faMagnifyingGlass,
  faArrowsRotate,
  faCaretRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewInfoModal } from "./ViewInfoModal";
import { URL } from "../constants";

export { Table };

function Table({ deleteMilk, displayData, setDisplayData, setOpenModal, viewType }) {
  const viewConfigs = {
    viewMilk: [
      { label: 'milk ID', key: 'uid' },
      { label: 'Baby', key: 'baby_name' },
      { label: 'Mother', key: 'mother_name' },
      { label: 'Express time', key: 'express_time_str' },
      { label: 'Expiration time', key: 'expiration_time_str' },
      { label: 'Storage Type', key: 'storage_type' }
    ],
    viewMother: [
      { label: "MRN", key: "mrn" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name" },
      { label: "Babies", key: "babies" },
    ],
    viewBaby: [
      { label: "MRN", key: "mrn" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name"},
      { label: "Mother", key: "mother_name" },
      { label: "Number of Milks", key: "associated_milks"},
    ],
    viewLog: [
      { label: 'Event', key: 'type' },
      { label: 'Timestamp', key: 'timestamp_str' },
      { label: 'Message', key: 'message' }
    ],
    viewBabyMilk: [
      { label: "milk ID", key: "uid" },
      { label: "Express time", key: "express_time" },
      { label: "Expiration time", key: "expiration_time"},
      { label: "Storage Type", key: "storage_type"},
    ]
  };
  const columns = viewConfigs[viewType] || [];
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [info, setInfo] = useState(null);
  const [searchValue, setSearchValue] = useState('');

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
      console.log('Quering backend');
      let response;
      switch (viewType) {
        case 'viewMilk':
          response = await fetch(`${URL}/milk_entries/search?keyword=${searchValue}`);
          break;
        case 'viewMother':
          response = await fetch(`${URL}/mothers/search?keyword=${searchValue}`);
          break;
        case 'viewBaby':
          response = await fetch(`${URL}/babies/search?keyword=${searchValue}`);
          break;
      }
      if (!response.ok) {
        throw new Error('Could not find relative entry with such keyword');
      }
      result = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      if (result) {
        console.log(result);
        switch (viewType) {
          case 'viewMilk': {
            const milk_uids = result.map((entry) => entry.uid);
            setDisplayData(displayData.filter((entry) => milk_uids.includes(entry.uid)));
            break;
          }
          default:
            setDisplayData(result);
            break;
        }
      }
    }
  };

  function babyRow (babyData, index) {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <>
        <tr
          className={index % 2 === 0 ? "even-row" : "odd-row"}
        >
          {columns.map((column) => (
            column.key === "mrn" ? (
              <td key={column.key}>
                  <button 
                    type="button" 
                    className="btn btn-sm expand-btn" 
                    onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? (
                        <FontAwesomeIcon icon={faCaretDown} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretRight} />
                      )}
                  </button>
                {babyData[column.key]}
              </td>
            ) : column.key === "associated_milks" ? (
              <td key={column.key}>
                {(babyData[column.key]).length}
              </td>
            ) : (
              <td key={column.key}>
                {babyData[column.key]}
              </td>
            )
          ))}
        </tr>

        {expanded && (
          <tr className={index % 2 === 0 ? "even-row" : "odd-row"} outline
          >
            <td colSpan={4}>
              {milkSubTable(babyData.associated_milks)}
            </td>
            <td></td>
          </tr>
        )}
      </>
    )
  }

  function milkSubTable (associated_milks) {
    const milk_columns = viewConfigs['viewBabyMilk']
    return (
      <>
        {associated_milks.length > 0 ? (
          <div className="sub-table-container">
            <table className='sub-table'>
              <thead>
              {milk_columns.map((column) => (
                <th key={column.key}
                  colSpan={column.key === "storage_type" ? 2 : 1}
                >
                  {column.label}
                </th>
              )
            )}
              </thead>
              <tbody>
                {associated_milks.map((item, index) => (
                  <tr key={item.uid}>
                    {milk_columns.map((column) => (
                      <td key={column.key} onClick={() => handlePopUp(item)}>
                          {item[column.key]}
                      </td>
                    ))}
                    <td className='dlt-container'
                      key="delete-btn">
                        <Button
                          variant="link"
                          id={`dlt-${item.uid}`}
                          className="dlt-btn"
                        >
                          <FontAwesomeIcon
                            onClick={() => deleteMilk(item)}
                            icon={faTrash}
                          />
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='empty-sub-table'>No milks available</div>
        )}
      </>
    )
  }
  
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
                      onKeyDown={(e) => e.key === "Enter" ? handleSearch() : null}
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
                    {(viewType === "viewMilk" || viewType === "viewBaby") && (
                      <Button id="scan-btn" onClick={() => setOpenModal(true)}> 
                        <FontAwesomeIcon icon={faPlus} /> New Milk Entry
                      </Button>
                    )}
                </div>
              </td>
            </tr>
            <tr>
            {columns.map((column) => (
              column.key === 'storage_type' ? ( 
                <th colSpan={2} key={`${column.mrn}${column.key}`}>
                  {column.label}
                </th>
              ) : 
              column.key === 'mrn' && viewType === 'viewBaby' ? (
                <th className='mrn-th' key={`${column.mrn}${column.key}`}>
                  {column.label}
                </th>
              ) :  (
                <th key={column.key}>{column.label}</th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((item, index) => (
              <>
              {viewType === 'viewBaby' ? (
                <>
                  {babyRow(item, index)}
                </>
              ) : (
                // make the entry colours alternate
                <>
                <tr
                  key={item.uid || item.mrn || index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  {columns.map((column) => (
                      // only milk entries will activate a pop up when clicked
                      viewType === "viewMilk" ? ( 
                        <td onClick={() => handlePopUp(item)} key={column.key}>
                          {item[column.key]}
                        </td>
                      ) : column.key === "babies" ? (
                        <td key={column.key}>{item[column.key].join(", ")}</td>
                      ) : (
                        <td key={column.key}>{item[column.key]}</td>
                      )
                    ))}
                  {viewType === "viewMilk" && ( // only milk entries are deletable
                    <td key="delete-button">
                      <Button
                        variant="link"
                        id={`dlt-${item.uid}`}
                        className="dlt-btn"
                      >
                        <FontAwesomeIcon
                          onClick={() => deleteMilk(item)}
                          icon={faTrash}
                        />
                      </Button>
                    </td>
                  )}
                </tr>
                </>
              )}
            </>
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
          displayData={displayData}
          setDisplayData={setDisplayData}
          version={viewType}
        />
      )}
    </div>
  );
}
