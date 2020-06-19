import React from "react";
import BookAuthors from "./bookAuthors";

function Book(props) {
  const { id, ibn, title, authors } = props.book;
  const {
    onEdit,
    onDelete,
    onRemoveAuthor,
    onAddAuthor,
    book,
    isUserLogged,
    isAdmin,
  } = props;

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
            isAdmin={isAdmin}
          />
        </td>
        <td>
          <button
            id="addAuthor"
            className="btn btn-primary btn-sm"
            onClick={() => onAddAuthor(book)}
            hidden={!isUserLogged}
          >
            Add author to book
          </button>
        </td>
        <td>
          <button
            id="btnEdit"
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(book)}
            hidden={!isUserLogged}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            id="btnDelete"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(book)}
            hidden={!isAdmin}
          >
            Delete
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default Book;
