import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalComponent = ({ show, handleClose }) => {

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Awesome ! Now you're one of us</Modal.Title>
            </Modal.Header>
            <Modal.Body>Registration was a success. Please continue to login.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default ModalComponent