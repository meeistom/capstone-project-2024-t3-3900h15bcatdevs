import { React, useState} from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { Navibar } from "../Components/Navibar";
import { Button, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


export { Register };

function Register() {
  const [currentRenderedPage, setCurrentRenderedPage] = useState(0);
  // Page 0: Choose Mother/Baby/Milk to register
  // Page 1: Mother Registration
  // Page 2: Baby Registration
  // Page 3: Milk Registration
  // Page 4: Confirm details
  // Page 5: Preview generated label
  // Page 6: Print label
  
  var pagesToVisit = [0];
  var currentPage = 0;
  const nextPageToVisit = () => {
    currentPage += 1;
    console.log("Next Page: " + pagesToVisit[currentPage]);
    setCurrentRenderedPage(pagesToVisit[currentPage]);
  };
  
  const prevPageToVisit = () => {
    currentPage -= 1;
    console.log("Prev Page: " + pagesToVisit[currentPage]);
    setCurrentRenderedPage(pagesToVisit[currentPage]);
  };
  
  // Registration Type - Mother, Baby, Milk
  const [checked, setChecked] = useState([false, false, false]);
  
  const renderPage = () => {
    console.log("Current Page: " + pagesToVisit[currentPage]);
    switch (currentRenderedPage) {
      case 0:
        return <ChooseRegistrationTypePage
        checked={checked}
        setChecked={setChecked}
        />
      case 1:
        return <MotherRegistrationPage />;
      case 2:
        return <BabyRegistrationPage />;
      case 3:
        return <MilkRegistrationPage />;
    }
  }
          
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="register-title">
          <h1>{"Register"}</h1>
        </div>
        {renderPage()}
        <div className='nav-button-container'>
          <div className='back-button'>
            {currentRenderedPage > 0 && (
              <Button 
                variant="primary"
                size="lg"
                onClick={() => {
                  prevPageToVisit();
                }}
                >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span style={{ marginLeft: '10px' }}>Back</span>
              </Button>
            )}  
          </div>
          <div className='next-button'>
            <Button 
              variant="primary"
              size="lg"
              onClick={() => {
                if (currentPage == 0) {
                  checked.forEach((type, index) => { // Add pages to visit based on what was checked
                    if (type) {
                      pagesToVisit.push(index + 1);
                    }
                  });
                }
                nextPageToVisit();
                console.log(pagesToVisit);
                // if (checked[0] && !visited[0]) { // Move to Mother Registration Page
                //   setCurrentPage(1);
                //   visited[0] = true;
                //   console.log("Moving to Mother Registration Page");
                // } else if (checked[1] && !visited[1]) { // Move to Baby Registration Page
                //   setCurrentPage(2);
                //   visited[1] = true; 
                //   console.log("Moving to Baby Registration Page");
                // } else if (checked[2] && !visited[2]) { // Move to Milk Registration Page
                //   setCurrentPage(3);
                //   visited[2] = true;
                //   console.log("Moving to Milk Registration Page");
                // } else {
                //   alert("Please select at least one option.");
                // }
              }}
              >
              <span style={{ marginRight: '10px' }}>Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const ChooseRegistrationTypePage = ({checked, setChecked}) => {
  const handleToggle = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  }

  return (
    <div className="register-selection-container">
      <div className='title'>
          <h2>{"What would you like to register?"}</h2>
      </div>
      <div className='checkbox-container'>
        <ToggleButton // Mother Checkbox
          className={checked[0] ? 'check' : 'uncheck'}
          id="toggle-check"
          type="checkbox"
          checked={checked[0]}
          value="1"
          onClick={() => handleToggle(0)}
          >
          {checked[0] ? (
            <FontAwesomeIcon icon={faCheckSquare} />
          ) : (
            <FontAwesomeIcon icon={faSquare} />
          )}
          <span style={{ marginLeft: '10px' }}>Mother</span>
        </ToggleButton>
        <ToggleButton // Baby Checkbox
          className={checked[1] ? 'check' : 'uncheck'}
          id="toggle-check"
          type="checkbox"
          checked={checked[1]}
          value="1"
          onClick={() => handleToggle(1)}
          >
          {checked[1] ? (
            <FontAwesomeIcon icon={faCheckSquare} />
          ) : (
            <FontAwesomeIcon icon={faSquare} />
          )}
          <span style={{ marginLeft: '10px' }}>Baby</span>
        </ToggleButton>
      </div>
      <div className='checkbox-container'>
        <ToggleButton // Mother Checkbox
          className={checked[2] ? 'check' : 'uncheck'}
          id="toggle-check"
          type="checkbox"
          checked={checked[2]}
          value="1"
          onClick={() => handleToggle(2)}
          >
          {checked[2] ? (
            <FontAwesomeIcon icon={faCheckSquare} />
          ) : (
            <FontAwesomeIcon icon={faSquare} />
          )}
          <span style={{ marginLeft: '10px' }}>Milk</span>
        </ToggleButton>
      </div>
    </div>
  )
}

const MotherRegistrationPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Mother Details"}</h2>
    </div>

  </div>
);

const BabyRegistrationPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Baby Details"}</h2>
    </div>
  </div>
);
           
const MilkRegistrationPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Milk Details"}</h2>
    </div>
  </div>
);
           
const ConfirmDetailsPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Confirm Details"}</h2>
    </div>
  </div>
);

const PreviewGeneratedLabelPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Preview Details"}</h2>
    </div>
  </div>
);  

const PrintLabelPage = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Print Label"}</h2>
    </div>
  </div>
);
      