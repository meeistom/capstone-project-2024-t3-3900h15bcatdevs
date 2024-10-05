import React from 'react';
import "../index.css";
import scanner from "../Assets/scanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ closeModal }) {
	return (
		<>
			<div className='modal-background'>
				<div className='modal-container'>
					<button onClick={() => closeModal(false)}>
						<input type="text" className="scanner-input" disabled></input>
						<FontAwesomeIcon className='close-btn' icon={faXmark} />
					</button>
					<div className='title'>
						<p>Please scan the mother's barcode</p>
					</div>
					<div className='body'>
						<img src={scanner} alt="scanner" />
					</div>
					<div className='footer'>
						waiting for scan...
					</div>
				</div>
			</div>
		</>
	)
};

export default Modal