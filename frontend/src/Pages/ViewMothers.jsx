import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import axios from 'axios';

export { ViewMothers };

function ViewMothers() {
  const [motherData, setMotherData] = useState([]);


  // Fetch mother entries from the server
  useEffect(() => {
    const url = `http://localhost:5001/mothers`;
    axios.get(url)
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setMotherData(response.data);
          return response.data;
        }
        return [];
      })
      .catch(error => {
        console.error('Error fetching mother entries:', error);
      });
  }, []);

  return (
    <>
      <section id="Home">
        <Navibar />
        <div>
          <h2>Mother information</h2>
          {motherData.length > 0 ? (
            <ul>
              {motherData.map((entry, index) => (
                <li key={index}>
                  MRN: {entry.mrn},
                  first name: {entry.first_name}, 
                  last name: {entry.last_name}, 
                </li>
              ))}
            </ul>
          ) : (
            <p>No patients in system.</p>
          )}
        </div>
      </section>
    </>
  );
}
