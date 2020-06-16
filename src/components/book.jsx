import React, { Component } from "react";
import BookAuthors from "./bookAuthors";

class Book extends Component {
  render() {
    const { id, ibn, title, authors } = this.props.book;
    const { onEdit, onDelete, onRemoveAuthor } = this.props;

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
            <button
              id="btnEdit"
              className="btn btn-primary"
              onClick={() => onEdit(this.props.book)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              id="btnDelete"
              className="btn btn-danger"
              onClick={() => onDelete(this.props.book)}
            >
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <BookAuthors authors={authors} onDelete={onRemoveAuthor} />
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Book;
