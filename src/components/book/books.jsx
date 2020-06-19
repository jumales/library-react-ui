import React, { Component } from "react";
import Book from "./book";
import AlertDialog from "../dialog/alertDialog";
import BookEditor from "./bookEditor";
import { Button } from "react-bootstrap";

class Books extends Component {
  state = {
    showDeleteDialog: false,
    showDeleteAuthorDialog: false,
    selectedBook: {},
    selectedAuthor: {},
    showBookEditDialog: false,
    showBookCreateDialog: false,
    books: [],
  };

  componentDidMount = () => {
    this.getBooks();
  };

  //event methods
  onEdit = (book) => {
    this.setState({ selectedBook: book, showBookEditDialog: true });
  };

  onDelete = (book) => {
    const uri = localStorage.getItem("REST_URI");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(book),
    };
    fetch(uri + "books", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          this.getBooks();
        } else {
          console.error("error", data);
        }
      })
      .catch(console.log);
    this.setState({
      showDeleteDialog: false,
      selectedBook: {},
    });
  };

  onAddAuthor = (book) => {};

  onAddNewBook = () => {
    this.setState({ showBookCreateDialog: true });
  };

  onRemoveAuthor = (author, book) => {
    this.setState({
      showDeleteAuthorDialog: true,
      selectedBook: book,
      selectedAuthor: author,
    });
  };

  //delete dialog actions
  deleteBook = (book) => {
    const books = this.state.books.filter((b) => b.id !== book.id);
    this.setState({ books: books, showDeleteDialog: false, selectedBook: {} });
  };

  cancelDeleteDialog = () => {
    this.setState({
      showDeleteDialog: false,
      showDeleteAuthorDialog: false,
      selectedBook: {},
      selectedBook: {},
    });
  };

  //edit book editor
  editBook = (evt) => {
    evt.preventDefault();

    const newValues = this.getBookDto(this.state.selectedBook.id, evt);

    const uri = localStorage.getItem("REST_URI");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newValues),
    };

    fetch(uri + "books", requestOptions)
      .then((response) => response.json())
      .then((data) => this.handleBookEditorResult(data))
      .catch(console.log);
  };

  handleBookEditorResult = (data) => {
    if (data.status.code > 201) {
      console.log(data);
      this.setState({
        selectedBook: {},
        showBookEditDialog: false,
        showBookCreateDialog: false,
      });
    } else {
      this.getBooks();
      this.setState({
        selectedBook: {},
        showBookEditDialog: false,
        showBookCreateDialog: false,
      });
    }
  };

  getBookDto = (id, evt) => {
    return {
      id: id,
      ibn: evt.target.ibn.value,
      title: evt.target.title.value,
    };
  };

  createBook = (evt) => {
    evt.preventDefault();

    const newValues = this.getBookDto(null, evt);

    const uri = localStorage.getItem("REST_URI");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newValues),
    };

    fetch(uri + "books", requestOptions)
      .then((response) => response.json())
      .then((data) => this.handleBookEditorResult(data))
      .catch(console.log);
  };

  handleCancelEditBook = () => {
    this.setState({
      showBookEditDialog: false,
      showBookCreateDialog: false,
      selectedBook: {},
    });
  };

  removeAuthorFromBook = (book) => {
    const uri = localStorage.getItem("REST_URI");
    const dto = { bookId: book.id, authorId: this.state.selectedAuthor.id };
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dto),
    };

    fetch(uri + "books/deleteAuthorFromBook", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          this.getBooks();
        } else {
          console.error(data);
        }
        this.setState({
          selectedBook: {},
          selectedAuthor: {},
          showDeleteAuthorDialog: false,
        });
      })
      .catch(console.log);
  };

  getBooks = () => {
    const uri = localStorage.getItem("REST_URI");
    fetch(uri + "books")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ books: data });
      })
      .catch(console.log);
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
        <AlertDialog
          show={this.state.showDeleteAuthorDialog}
          handleDelete={this.removeAuthorFromBook}
          handleClose={this.cancelDeleteDialog}
          item={this.state.selectedBook}
        />
        <BookEditor
          show={this.state.showBookEditDialog}
          handleSaveBook={this.editBook}
          handleCancel={this.handleCancelEditBook}
          book={this.state.selectedBook}
        />
        <BookEditor
          show={this.state.showBookCreateDialog}
          handleSaveBook={this.createBook}
          handleCancel={this.handleCancelEditBook}
          book={null}
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
        <Button onClick={this.onAddNewBook}>Add new book</Button>
      </React.Fragment>
    );
  }
}

export default Books;
