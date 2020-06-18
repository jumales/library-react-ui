import React from "react";

function Author(props) {
  const { id, firstName, lastName, dayOfBirth, oib, books } = props.author;
  const { onEdit, onDelete, author, onRemoveBook } = props;

  return (
    <React.Fragment>
      <tr>
        <td scope="row">{id}</td>
        <td>
          <p>{firstName}</p>
        </td>
        <td>
          <p>{lastName}</p>
        </td>
        <td>
          <p>{oib}</p>
        </td>
        <td>
          <p>{dayOfBirth}</p>
        </td>
        <td>
          <button
            id="btnEdit"
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(author)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            id="btnDelete"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(author)}
          >
            Delete
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default Author;
