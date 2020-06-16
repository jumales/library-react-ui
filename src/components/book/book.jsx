import React, { Component } from "react";
import BookAuthors from "./bookAuthors";

class Book extends Component {
  render() {
    const { id, ibn, title, authors } = this.props.book;
    const { onEdit, onDelete, onRemoveAuthor, onAddAuthor, book } = this.props;

    /**<tr>
          <td colspan="5">
            <BookAuthors authors={authors} onDelete={onRemoveAuthor} />
          </td>
        </tr>*/

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
            <BookAuthors authors={authors} onDelete={onRemoveAuthor} />
          </td>
          <td>
            <button
              id="addAuthor"
              className="btn btn-primary"
              onClick={() => onAddAuthor(book)}
            >
              Add author to book
            </button>
          </td>
          <td>
            <button
              id="btnEdit"
              className="btn btn-primary"
              onClick={() => onEdit(book)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              id="btnDelete"
              className="btn btn-danger"
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
