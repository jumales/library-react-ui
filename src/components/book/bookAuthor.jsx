import React, { Component } from "react";

class BookAuthor extends Component {
  render() {
    const { author, onDelete, book } = this.props;
    const { firstName, lastName } = this.props.author;
    return (
      <tr>
        <td>
          <p>{firstName}</p>
        </td>
        <td>
          <p>{lastName}</p>
        </td>
        <td>
          <button
            id="btnRemove"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(author, book)}
          >
            Remove author from book
          </button>
        </td>
      </tr>
    );
  }
}

export default BookAuthor;
