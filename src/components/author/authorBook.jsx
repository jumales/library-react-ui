import React from "react";

function AuthorBook(props) {
  const { author, onRemoveBook, book, isAdmin } = props;
  const { ibn, title } = props.book;
  return (
    <tr>
      <td>
        <p>{ibn}</p>
      </td>
      <td>
        <p>{title}</p>
      </td>
      <td>
        <button
          id="btnRemove"
          className="btn btn-danger btn-sm"
          onClick={() => onRemoveBook(author, book)}
          hidden={!isAdmin}
        >
          Remove book from author
        </button>
      </td>
    </tr>
  );
}

export default AuthorBook;
