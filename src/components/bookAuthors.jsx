import React, { Component } from "react";
import BookAuthor from "./bookAuthor";

class BookAuthors extends Component {
  render() {
    const { authors, onDelete } = this.props;
    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <BookAuthor key={author.id} author={author} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default BookAuthors;
