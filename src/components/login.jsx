import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
class Login extends Component {
  /*state = { username: "", password: "" };

  onChangeUsername = (evt) => {
    this.setState({ ibn: evt.target.value });
  };

  onChangePassword = (evt) => {
    this.setState({ title: evt.target.value });
  };*/

  render() {
    const { show, handleCancel, handleLogin } = this.props;
    return (
      <>
        <Modal show={show} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleLogin}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter username..."
                id="username"
                name="username"
              ></Form.Control>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password..."
                id="password"
                name="password"
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

export default Login;
