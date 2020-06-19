import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Books from "./book/books";
import Authors from "./author/authors";
import Login from "./login";

class MainNav extends Component {
  state = {
    showBooks: true,
    showAuthors: false,
    showLogin: false,
    loggedUser: null,
    isAdmin: false,
  };

  componentDidMount = () => {
    const username = localStorage.getItem("USERNAME");

    if (username !== null) {
      this.setState({ loggedUser: username });
    }
  };

  selectedKey = (key) => {
    if (key === "books" && this.state.showBooks === false) {
      this.setState({ showBooks: true, showAuthors: false });
    } else if (key == "authors" && this.state.showAuthors === false) {
      this.setState({ showBooks: false, showAuthors: true });
    }
  };

  onLoginClick = (evt) => {
    this.setState({ showLogin: true });
  };

  onLogoutClick = (evt) => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("IS_ADMIN");
    this.setState({ loggedUser: null });
  };

  handleLogin = (evt) => {
    evt.preventDefault();
    const uri = localStorage.getItem("REST_URI") + "auth/signin";
    const dto = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dto),
    };

    fetch(uri, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.handleAfterUserLogged(data);
      })
      .catch(console.log);
  };

  handleAfterUserLogged = (data) => {
    localStorage.setItem("TOKEN", data.token);
    localStorage.setItem("USERNAME", data.username);
    const uri = localStorage.getItem("REST_URI") + "auth/me";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    fetch(uri, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        data.roles.map((role) => {
          console.log("role", role);
          if (role === "ROLE_ADMIN") {
            localStorage.setItem("IS_ADMIN", true);
            this.setState({ isAdmin: true });
          }
        });
      })
      .catch(console.log);
    this.setState({ loggedUser: data.username, showLogin: false });
  };

  handleCancel = () => {
    this.setState({ showLogin: false });
  };

  render() {
    localStorage.setItem("REST_URI", "http://localhost:8080/api/v1/");
    return (
      <React.Fragment>
        <Navbar bg="white" variant="white">
          <Navbar.Brand>Library</Navbar.Brand>
          <Nav className="mr-auto" onSelect={this.selectedKey}>
            <Nav.Link eventKey="books">Books</Nav.Link>
            <Nav.Link eventKey="authors">Authors</Nav.Link>
          </Nav>
          <Form inline>
            <Form.Label>
              {this.state.loggedUser !== null
                ? "Logged as " + this.state.loggedUser
                : ""}
            </Form.Label>
            <Button
              hidden={this.state.loggedUser !== null}
              variant="outline-info"
              onClick={this.onLoginClick}
            >
              Login
            </Button>
            <Button
              hidden={this.state.loggedUser === null}
              variant="outline-info"
              onClick={this.onLogoutClick}
            >
              Logout
            </Button>
          </Form>
        </Navbar>
        <div hidden={this.state.showBooks === false}>
          <Books />
        </div>
        <div hidden={this.state.showAuthors === false}>
          <Authors />
        </div>
        <Login
          show={this.state.showLogin}
          handleLogin={this.handleLogin}
          handleCancel={this.handleCancel}
        />
      </React.Fragment>
    );
  }
}

export default MainNav;
