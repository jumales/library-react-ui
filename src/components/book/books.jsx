import React, { Component } from "react";
import Book from "./book";
import BookAuthors from "./bookAuthors";
import AlertDialog from "../dialog/alertDialog";

class Books extends Component {
  state = {
    showDeleteDialog: false,
    selectedBook: {},
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
    //let bookCopy = (...this.state.books);
  };

  onDelete = (book) => {
    console.log("OnDelete", book);
    this.setState({ selectedBook: book, showDeleteDialog: true });
  };

  onRemoveAuthor = (author) => {
    console.log("onRemoveAuthor", author);
  };

  onAddAuthor = (book) => {};

  deleteBook = (book) => {
    const books = this.state.books.filter((b) => b.id !== book.id);
    this.setState({ books, showDeleteDialog: false });
  };

  cancelDeleteDialog = () => {
    this.setState({ showDeleteDialog: false });
  };

  render() {
    return (
      <React.Fragment>
        <AlertDialog
          show={this.state.showDeleteDialog}
          handleDelete={this.deleteBook}
          handleClose={this.cancelDeleteDialog}
          item={this.state.selectedBook}
        />
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IBN</th>
              <th scope="col">Title</th>
              <th scope="col">Authors</th>
              <th scope="col"></th>
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
                  onAddAuthor={this.onAddAuthor}
                />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Books;
