import React, { Component } from "react";
import BookAuthors from "./bookAuthors";

class Book extends Component {
  render() {
    const { id, ibn, title, authors } = this.props.book;
    const { onEdit, onDelete, onRemoveAuthor, onAddAuthor, book } = this.props;

    return (
      <React.Fragment>
        <tr>
          <td scope="row">{id}</td>
          <td>
            <p>{ibn}</p>
          </td>
          <td>
            <p>{title}</p>
          </td>
          <td>
            <BookAuthors
              authors={authors}
              book={book}
              onDelete={onRemoveAuthor}
            />
          </td>
          <td>
            <button
              id="addAuthor"
              className="btn btn-primary btn-sm"
              onClick={() => onAddAuthor(book)}
            >
              Add author to book
            </button>
          </td>
          <td>
            <button
              id="btnEdit"
              className="btn btn-primary btn-sm"
              onClick={() => onEdit(book)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              id="btnDelete"
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(book)}
            >
              Delete
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Book;
