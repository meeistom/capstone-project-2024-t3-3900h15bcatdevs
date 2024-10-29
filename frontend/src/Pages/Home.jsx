import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import "../index.css";
import { AddMilkModal } from "../Components/AddMilkModal";
import { Table } from "../Components/Table";

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://127.0.0.1:5001";

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/home`);
      if (!response.ok) {
        throw new Error('Having errors fetching milk details');
      }
      const result = await response.json();
      setData(result);
      localStorage.setItem('myData', JSON.stringify(result)); 
    } catch (error) {
      setError(error); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('myData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData(); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">List of Milk Entries</h1>
          <p>Total Number of Milk Entries: {data.length}</p>
          <Table data={data} setOpenModal = {setOpenModal} viewType="viewMilk"/>
        </div>
        {openModal && (
          <AddMilkModal refresh={handleRefresh} closeModal={setOpenModal} version="addMilk1" />
        )}
      </section>
    </>
  );
}
