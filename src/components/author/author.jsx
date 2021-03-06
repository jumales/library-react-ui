import React from "react";
import AuthorBooks from "./authorBooks";

function Author(props) {
  const { id, firstName, lastName, dayOfBirth, oib, books } = props.author;
  const {
    onEdit,
    onDelete,
    author,
    onRemoveBook,
    isUserLogged,
    isAdmin,
  } = props;

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
          <p>{dayOfBirth.substring(0, 10)}</p>
        </td>
        <td>
          <AuthorBooks
            books={books}
            author={author}
            onRemoveBook={onRemoveBook}
            isAdmin={isAdmin}
          />
        </td>
        <td>
          <button
            id="btnEdit"
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(author)}
            hidden={!isUserLogged}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            id="btnDelete"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(author)}
            hidden={!isAdmin}
          >
            Delete
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default Author;
