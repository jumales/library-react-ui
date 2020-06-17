import React, { Component } from "react";
import Book from "./book";
import AlertDialog from "../dialog/alertDialog";
import BookEditor from "./bookEditor";

class Books extends Component {
  state = {
    showDeleteDialog: false,
    selectedBook: {},
    showBookEditorDialog: false,
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

  //grid actions
  onEdit = (book) => {
    console.log("OnEditClicked", book);
    this.setState({ selectedBook: book, showBookEditorDialog: true });
  };

  onDelete = (book) => {
    console.log("OnDelete", book);
    this.setState({ selectedBook: book, showDeleteDialog: true });
  };

  onRemoveAuthor = (author) => {
    console.log("onRemoveAuthor", author);
  };

  onAddAuthor = (book) => {};

  //delete dialog actions
  deleteBook = (book) => {
    const books = this.state.books.filter((b) => b.id !== book.id);
    this.setState({ books, showDeleteDialog: false, selectedBook: {} });
  };

  cancelDeleteDialog = () => {
    this.setState({ showDeleteDialog: false });
  };

  //edit book editor
  saveBook = (evt) => {
    evt.preventDefault();

    const books = this.state.books;
    const sel = this.state.selectedBook;
    books.map((book) => {
      if (book.id === sel.id) {
        book.ibn = evt.target.ibn.value;
        book.title = evt.target.title.value;
      }
    });
    this.setState({
      books: books,
      selectedBook: {},
      showBookEditorDialog: false,
    });
  };

  handleCancelEditBook = () => {
    this.setState({ showBookEditorDialog: false });
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
        <BookEditor
          show={this.state.showBookEditorDialog}
          handleSaveBook={this.saveBook}
          handleCancel={this.handleCancelEditBook}
          book={this.state.selectedBook}
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
              <Book
                key={book.id}
                book={book}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
                onRemoveAuthor={this.onRemoveAuthor}
                onAddAuthor={this.onAddAuthor}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Books;
