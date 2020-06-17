import React from "react";
import BookAuthor from "./bookAuthor";

function BookAuthors(props) {
  const { book, authors, onDelete } = props;
  return (
    <table className="table table-dark">
      <tbody>
        {authors.map((author) => (
          <BookAuthor
            key={author.id}
            author={author}
            book={book}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default BookAuthors;
