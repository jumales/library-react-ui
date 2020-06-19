import React from "react";
import BookAuthor from "./bookAuthor";

function BookAuthors(props) {
  const { book, authors, onDelete, isAdmin } = props;
  return (
    <table className="table table-dark">
      <tbody>
        {authors.map((author) => (
          <BookAuthor
            key={author.id + "-" + book.id}
            author={author}
            book={book}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </tbody>
    </table>
  );
}

export default BookAuthors;
