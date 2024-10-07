import { React, useState} from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { Navibar } from "../Components/Navibar";
import { Button, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export { Register };

function Register() {
  let [currentRenderedPage, setCurrentRenderedPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  // Page 0: Choose Mother/Baby/Milk to register
  // Page 1: Mother Registration
  // Page 2: Baby Registration
  // Page 3: Milk Registration
  // Page 4: Confirm details
  // Page 5: Preview generated label
  // Page 6: Print label
  
  let pagesToVisit = [0];

  const nextPageToVisit = () => {
    setCurrentRenderedPage(pagesToVisit[pageIndex + 1]);
    setPageIndex(pageIndex => pageIndex + 1);
  };
  
  const prevPageToVisit = () => {
    if (pageIndex - 1 >= 0) {
      setCurrentRenderedPage(pagesToVisit[pageIndex - 1]);
      setPageIndex(pageIndex => pageIndex - 1);
    }
  };
  
  // Registration Type - Mother, Baby, Milk
  const [checked, setChecked] = useState([false, false, false]);
  
  const renderPage = () => {
    console.log("Page Index: " + pageIndex);
    switch (currentRenderedPage) {
      case 0:
        return <ChooseRegistrationType
        checked={checked}
        setChecked={setChecked}
        />
      case 1:
        return <MotherRegistration />;
      case 2:
        return <BabyRegistration />;
      case 3:
        return <MilkRegistration />;
    }
  }
          
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="register-container">
          <div className="register-title">
            <h1>{"Register"}</h1>
          </div>
          {renderPage()}
          <div className='nav-button-container'>
            <div className="back-button-container">
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
            <div className="next-button-container">
              <Button 
                variant="primary"
                size="lg"
                onClick={() => {
                  const hasTrue = checked.some(element => element === true); // Checks for a strict `true`
                  if (!hasTrue) {
                    alert("Choose one type for registration");
                    return;
                  }

                  if (currentRenderedPage == 0) {
                    checked.forEach((type, index) => { // Add pages to visit based on what was checked
                      if (!pagesToVisit.includes(index + 1) && type) {
                        pagesToVisit.push(index + 1);
                      }
                    });
                  }

                  console.log(pagesToVisit);
                  nextPageToVisit();
                }}
                >
                <span style={{ marginRight: '10px' }}>Next</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>  
          </div>
        </div>
      </section>
    </>
  );
}

const ChooseRegistrationType = ({checked, setChecked}) => {
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

const MotherRegistration = () => (
  <div className="mother-details-container">
    <h1>{"Mother Details"}</h1>
    <div className='mrn'>MRN</div>
    <Form.Control type="email" placeholder="Enter MRN" />
    <Form.Text className="text-muted"></Form.Text>  
    <div className='mrn'>First Name</div>
    <Form.Control type="email" placeholder="Enter First Name" />
    <Form.Text className="text-muted"></Form.Text>  
    <div className='mrn'>Last Name</div>
    <Form.Control type="email" placeholder="Enter Last Name" />
    <Form.Text className="text-muted"></Form.Text>  
  </div>
);

const BabyRegistration = () => (
  <div className="input-details-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Baby Details"}</h2>
    </div>
  </div>
);
           
const MilkRegistration = () => (
  <div className="input-details-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Milk Details"}</h2>
    </div>
  </div>
);
           
const ConfirmDetails = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Confirm Details"}</h2>
    </div>
  </div>
);

const PreviewGeneratedLabel = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Preview Details"}</h2>
    </div>
  </div>
);  

const PrintLabel = () => (
  <div className="register-selection-container">
    {/* Render the progress bar at mother details stage */}
    <div className='title'>
      <h2>{"Print Label"}</h2>
    </div>
  </div>
);
      