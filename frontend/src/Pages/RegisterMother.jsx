import { React} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { Navibar } from "../Components/Navibar";
// import { Button, ToggleButton } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


export { RegisterMother };

function RegisterMother() {
  return (
    <>
      <section id="Home">
        <Navibar />
      </section>
    </>
  );
}
