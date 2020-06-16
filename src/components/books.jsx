import React, { Component } from "react";
import Book from "./book";
import BookAuthors from "./bookAuthors";

class Books extends Component {
  state = {
    books: [
      {
        id: 1,
        ibn: "1234",
        title: "AAAAAA",
        authors: [{ id: 1, firstName: "Jure", lastName: "Maleš" }],
      },
      {
        id: 2,
        ibn: "5678",
        title: "BBBBB",
        authors: [
          { id: 1, firstName: "Jure", lastName: "Maleš" },
          { id: 2, firstName: "Nikolina", lastName: "Antolić" },
        ],
      },
    ],
  };

  onEdit = (book) => {
    console.log("OnEditClicked", book);
  };

  onDelete = (book) => {
    console.log("OnDelete", book);
  };

  onRemoveAuthor = (author) => {
    console.log("onRemoveAuthor", author);
  };

  render() {
    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">IBN</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {this.state.books.map((book) => (
            <React.Fragment>
              <Book
                key={book.id}
                book={book}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
                onRemoveAuthor={this.onRemoveAuthor}
              />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Books;
