import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  faPlus,
  faFilter,
  faTrash,
  faMagnifyingGlass,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ViewInfoModal } from './ViewInfoModal';
import { URL } from '../constants';

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
      { label: 'MRN', key: 'mrn' },
      { label: 'First Name', key: 'first_name' },
      { label: 'Last Name', key: 'last_name' },
      { label: 'Associate Babies', key: 'babies' }
    ],
    viewBaby: [
      { label: 'MRN', key: 'mrn' },
      { label: 'First Name', key: 'first_name' },
      { label: 'Last Name', key: 'last_name' },
      { label: 'Mother', key: 'mother_mrn' }
    ],
    viewLog: [
      { label: 'Event', key: 'type' },
      { label: 'Timestamp', key: 'timestamp_str' },
      { label: 'Message', key: 'message' }
    ]
  };
  const columns = viewConfigs[viewType] || [];
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [info, setInfo] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [data] = useState(displayData);

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
                    onKeyDown={(e) => (e.key === 'Enter' ? handleSearch() : null)}
                    value={searchValue}
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-describedby="button-search"
                  />
                  <button
                    onClick={() => handleSearch()}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <button
                    onClick={() => setDisplayData(data)}
                    className="btn btn-outline-secondary">
                    <FontAwesomeIcon icon={faArrowsRotate} />
                  </button>
                </div>
                {viewType === 'viewMilk' && (
                  <Button id="scan-btn" onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus} /> New Milk Entry
                  </Button>
                )}
              </div>
            </td>
          </tr>
          <tr>
            {columns.map((column) =>
              column.key === 'storage_type' ? (
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
                className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                {columns.map((column) =>
                  // only milk entries(on the home page) will activate a pop up for details when clicking onto an entry
                  viewType === 'viewMilk' ? (
                    <td onClick={() => handlePopUp(item)} key={column.key}>
                      {item[column.key]}
                    </td>
                  ) : viewType === 'viewLog' ? (
                    <td key={column.key}>{item[column.key]}</td>
                  ) : (
                    <td key={column.key}>{item[column.key]}</td>
                  )
                )}
                {viewType === 'viewMilk' && ( // only milk entries are deletable
                  <td key="delete-button">
                    <Button variant="link" id={`dlt-${item.uid}`} className="dlt-btn">
                      <FontAwesomeIcon onClick={() => deleteMilk(item)} icon={faTrash} />
                    </Button>
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
          displayData={displayData}
          setDisplayData={setDisplayData}
          version={viewType}
        />
      )}
    </div>
  );
}
