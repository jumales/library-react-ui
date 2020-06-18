import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class AuthorEditor extends Component {
  state = { firstName: "", lastName: "", oib: "", dayOfBirth: "" };

  onChangeFirstName = (evt) => {
    this.setState({ firstName: evt.target.value });
  };

  onChangeLastName = (evt) => {
    this.setState({ lastName: evt.target.value });
  };

  onChangeOib = (evt) => {
    this.setState({ oib: evt.target.value });
  };

  onChangeDayOfBirth = (evt) => {
    this.setState({ dayOfBirth: evt.target.value });
  };

  render() {
    const { show, handleCancel, handleSaveAuthor, author } = this.props;
    return (
      <>
        <Modal show={show} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>
              {author === null ? "Create new author" : "Edit author"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSaveAuthor}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                onChange={this.onChangeFirstName}
                type="input"
                placeholder="Enter first name..."
                id="firstName"
                name="firstName"
                value={
                  this.state.firstName ||
                  (author !== null ? author.firstName : null)
                }
              ></Form.Control>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                onChange={this.onChangeLastName}
                type="input"
                placeholder="Enter last name..."
                value={
                  this.state.lastName ||
                  (author !== null ? author.lastName : null)
                }
                id="lastName"
                name="lastName"
              ></Form.Control>
              <Form.Label>OIB</Form.Label>
              <Form.Control
                onChange={this.onChangeOib}
                type="input"
                placeholder="Enter OIB..."
                value={this.state.oib || (author !== null ? author.oib : null)}
                id="oib"
                name="oib"
              ></Form.Control>
              <Form.Label>Day of birth</Form.Label>
              <Form.Control
                onChange={this.onChangeDayOfBirth}
                type="date"
                placeholder="Enter day of birth..."
                value={
                  this.state.dayOfBirth ||
                  (author !== null ? author.dayOfBirth : null)
                }
                id="dayOfBirth"
                name="dayOfBirth"
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

export default AuthorEditor;
