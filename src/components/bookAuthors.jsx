import React, { Component } from "react";
import BookAuthor from "./bookAuthor";

class BookAuthors extends Component {
  render() {
    const { authors, onDelete, onAddAuthor } = this.props;
    return (
      <table className="table table-dark">
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
