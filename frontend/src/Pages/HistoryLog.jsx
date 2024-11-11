import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import { Table } from "../Components/Table";
import { URL } from "../constants";
import { unixToTimeStr } from "../Utils/utils.jsx";

export { HistoryLog };

function HistoryLog() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/history`);
      if (!response.ok) {
        throw new Error("Having errors fetching history logs");
      }
      const result = await response.json();
      result.forEach((entry) => {
        entry.timestamp = unixToTimeStr(entry.timestamp);
      });
      const reversed = [...result].reverse();
      setData(reversed);
      setDisplayData(reversed);
      localStorage.setItem("myLog", JSON.stringify(reversed));
    } catch (error) {
      console.log(error);
    } finally {
      console.log(data)
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("myLog");
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setDisplayData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section id="history">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">History Log</h1>
          <p>Total number of actions: {data.length}</p>
          <Table
            deleteMilk={null}
            displayData={displayData}
            setDisplayData={setDisplayData}
            setOpenModal={null}
            viewType="viewLog"
          />
        </div>
      </section>
    </>
  );
}
