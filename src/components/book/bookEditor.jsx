import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class BookEditor extends Component {
  state = { ibn: "", title: "" };

  onChangeIbn = (evt) => {
    this.setState({ ibn: evt.target.value });
  };

  onChangeTitle = (evt) => {
    this.setState({ title: evt.target.value });
  };

  render() {
    const { show, handleCancel, handleSaveBook, book } = this.props;
    return (
      <>
        <Modal show={show} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>
              {book === null ? "Create new book" : "Edit book"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSaveBook}>
              <Form.Label>IBN</Form.Label>
              <Form.Control
                onChange={this.onChangeIbn}
                type="input"
                placeholder="Enter IBN..."
                id="ibn"
                name="ibn"
                value={this.state.ibn || (book !== null ? book.ibn : null)}
              ></Form.Control>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={this.onChangeTitle}
                type="input"
                placeholder="Enter title..."
                value={this.state.title || (book !== null ? book.title : null)}
                id="title"
                name="title"
              ></Form.Control>
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

export default BookEditor;
