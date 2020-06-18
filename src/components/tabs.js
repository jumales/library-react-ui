import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Books from "./book/books";
import Authors from "./author/authors";

class MainComponent extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="books" id="uncontrolled-tab-example">
        <Tab eventKey="books" title="Books">
          <Books />
        </Tab>
        <Tab eventKey="authors" title="Authors">
          <Authors />
        </Tab>
      </Tabs>
    );
  }
}

export default MainComponent;
