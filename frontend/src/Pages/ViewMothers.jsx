import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import { Table } from "../Components/Table";
import { URL } from "../constants";

export { ViewMothers };

function ViewMothers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/mothers`);
      if (!response.ok) {
        throw new Error("Having errors fetching mother details");
      }
      const result = await response.json();
      setData(result);
      localStorage.setItem("myMotherData", JSON.stringify(result));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("myMotherData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section id="viewMother">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">Mothers</h1>
          <p>Total number of mothers: {data.length}</p>
          <Table
            delete={null}
            displayData={data}
            setDisplayData={setData}
            setOpenModal={null}
            viewType="viewMother"
          />
        </div>
      </section>
    </>
  );
}
