import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Books from "./book/books";
import Authors from "./author/authors";

class MainNav extends Component {
  state = {
    showBooks: true,
    showAuthors: false,
  };

  selectedKey = (key) => {
    if (key === "books" && this.state.showBooks === false) {
      this.setState({ showBooks: true, showAuthors: false });
    } else if (key == "authors" && this.state.showAuthors === false) {
      this.setState({ showBooks: false, showAuthors: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Library</Navbar.Brand>
          <Nav className="mr-auto" onSelect={this.selectedKey}>
            <Nav.Link eventKey="books">Books</Nav.Link>
            <Nav.Link eventKey="authors">Authors</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <div hidden={this.state.showBooks === false}>
          <Books />
        </div>
        <div hidden={this.state.showAuthors === false}>
          <Authors />
        </div>
      </React.Fragment>
    );
  }
}

export default MainNav;
