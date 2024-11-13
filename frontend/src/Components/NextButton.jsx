import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export { NextButton };

function NextButton({ id, onClick, disabled, children }) {
  return (
    <Button
      id={id}
      variant="primary"
      size="lg"
      aria-label="next-button"
      onClick={onClick}
      disabled={disabled}>
      <span className="me-2">{children}</span>
      <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  );
}
