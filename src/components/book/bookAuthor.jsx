import React from "react";

function BookAuthor(props) {
  const { author, onDelete, book, isAdmin } = props;
  const { firstName, lastName } = props.author;
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
          hidden={!isAdmin}
        >
          Remove author from book
        </button>
      </td>
    </tr>
  );
}

export default BookAuthor;
