import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import axios from 'axios';
import { Navibar } from '../Components/Navibar';
import { AddMilkModal } from '../Components/AddMilkModal';
import { Table } from '../Components/Table';
import { DeleteMilkModal } from '../Components/DeleteMilkModal';
import { URL } from '../constants';
import { unixToTimeStr } from '../Utils/utils.jsx';

export { ViewMilks };

function ViewMilks() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/view_milks`);
      if (!response.ok) {
        throw new Error('Having errors fetching milk details');
      }
      const result = await response.json();
      result.forEach((entry) => {
        entry.express_time_str = unixToTimeStr(entry.express_time);
      });
      result.forEach((entry) => {
        entry.expiration_time_str = unixToTimeStr(entry.expiration_time);
      });
      setData(result);
      setDisplayData(result);
      localStorage.setItem('myMilkData', JSON.stringify(result));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('myMilkData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setDisplayData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleRefreshAfterAdd = (newMilk) => {
    const updatedData = [newMilk, ...data];
    newMilk.express_time_str = unixToTimeStr(newMilk.express_time);
    newMilk.expiration_time_str = unixToTimeStr(newMilk.expiration_time);
    setData(updatedData);
    setDisplayData(updatedData);
    localStorage.setItem('myMilkData', JSON.stringify(updatedData));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleConfirmDelete = (entry) => {
    setConfirmDelete(true);
    setDeleteEntry(entry);
  };

  const handleDeleteMilk = (uid, reason, notes) => {
    let reasonData = {};

    if (reason === 'other') {
      reasonData = { notes };
    } else {
      reasonData = { reason };
    }

    axios
      .delete(`${URL}/delete_milk_entry?uid=${uid}`, { data: reasonData })
      .then(() => {
        const updatedData = data.filter((item) => item.uid !== uid);
        setData(updatedData);
        setDisplayData(updatedData);
        localStorage.setItem('myMilkData', JSON.stringify(updatedData));
        setConfirmDelete(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  return (
    <>
      <section id="view_milks">
        <Navibar />
        <div className="viewmilk-page d-flex flex-row p-5 justify-content-center">
          <div className="page-container">
            <h1 className="page-title">List of Milk Entries</h1>
            <p className="py-2 fs-5 subtitle-2">Total Number of Milk Entries: {data.length}</p>
            <Table
              deleteMilk={handleConfirmDelete}
              displayData={displayData}
              setDisplayData={setDisplayData}
              setOpenModal={setOpenModal}
              viewType="viewMilk"
            />
          </div>
          {openModal && (
            <AddMilkModal
              addMilk={handleRefreshAfterAdd}
              closeModal={setOpenModal}
              version="addMilk1"
            />
          )}
          {confirmDelete && (
            <DeleteMilkModal
              entry={deleteEntry}
              closeModal={setConfirmDelete}
              deleteMilk={handleDeleteMilk}
            />
          )}
        </div>
      </section>
    </>
  );
}
