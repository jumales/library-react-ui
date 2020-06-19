import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class AddAuthorToBook extends Component {
  state = {};
  getOption = (author) => {
    return (
      <option key={author.id} value={author.id}>
        {author.fullName}
      </option>
    );
  };

  render() {
    const { show, handleCancel, handleAddAuthorToBook, authors } = this.props;
    return (
      <>
        <Modal show={show} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add author to book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddAuthorToBook}>
              <Form.Label>Authors</Form.Label>
              <Form.Control as="select" id="authors">
                {authors.map((a) => this.getOption(a))}
              </Form.Control>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddAuthorToBook;
