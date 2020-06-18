import React, { Component } from "react";
import Author from "./author";
import AlertDialog from "../dialog/alertDialog";

class Authors extends Component {
  state = {
    showDeleteDialog: false,
    selectedAuthor: {},
    showAuthorEditorDialog: false,
    authors: [
      {
        id: 1,
        firstName: "Jure",
        lastName: "Maleš",
        oib: "12345678900",
        dayOfBirth: "1987-11-23",
        books: [{ id: 1, ibn: "1234", title: "First title" }],
      },
      {
        id: 2,
        firstName: "Nikolina",
        lastName: "Antolić",
        oib: "01278968578",
        dayOfBirth: "1991-11-15",
        books: [
          { id: 1, ibn: "1234", title: "First title" },
          { id: 2, ibn: "5678", title: "Second title" },
        ],
      },
    ],
  };

  onEdit = (author) => {};
  onDelete = (author) => {};

  render() {
    return (
      <React.Fragment>
        <AlertDialog
          show={this.state.showDeleteDialog}
          handleDelete={this.deleteAuthor}
          handleClose={this.cancelDeleteDialog}
          item={this.state.selectedAuthor}
        />

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">OIB</th>
              <th scope="col">Day of birth</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.authors.map((author) => (
              <Author
                key={author.id}
                author={author}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Authors;
