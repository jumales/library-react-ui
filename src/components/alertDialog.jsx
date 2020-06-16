import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class AlertDialog extends Component {
  render() {
    const { show, handleClose, handleDelete, item } = this.props;
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are trying to delete item. Isn't possible rollback operation!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleDelete(item)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AlertDialog;
