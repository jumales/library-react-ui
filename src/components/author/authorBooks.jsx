import React from "react";
import AuthorBook from "./authorBook";

function AuthorBooks(props) {
  const { books, author, onRemoveBook } = props;
  return (
    <table className="table table-dark">
      <tbody>
        {books.map((book) => (
          <AuthorBook
            key={author.id + "-" + book.id}
            author={author}
            book={book}
            onRemoveBook={onRemoveBook}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AuthorBooks;
