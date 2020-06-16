import React, { Component } from "react";

class BookAuthor extends Component {
  render() {
    const { author, onDelete } = this.props;
    const { id, firstName, lastName } = this.props.author;
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
            className="btn btn-primary"
            onClick={() => onDelete(author)}
          >
            Remove author from book
          </button>
        </td>
      </tr>
    );
  }
}

export default BookAuthor;
