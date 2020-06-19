import React, { Component } from "react";
import Book from "./book";
import AlertDialog from "../dialog/alertDialog";
import BookEditor from "./bookEditor";
import AddAuthorToBook from "./bookAddAuthor";
import { Button } from "react-bootstrap";

class Books extends Component {
  state = {
    showDeleteDialog: false,
    showDeleteAuthorDialog: false,
    selectedBook: {},
    selectedAuthor: {},
    showBookEditDialog: false,
    showBookCreateDialog: false,
    showAddAuthorToBook: false,
    books: [],
    authorsNotOnBook: [],
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
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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

  onAddAuthor = (book) => {
    console.log(book);
    this.setState({ showAddAuthorToBook: true, selectedBook: book });
    this.getAuthorsNotOnBook(book.id);
  };

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

  handleCancel = () => {
    this.setState({
      showDeleteDialog: false,
      showDeleteAuthorDialog: false,
      showAddAuthorToBook: false,
      showBookCreateDialog: false,
      showBookEditDialog: false,
      selectedBook: {},
      selectedAuthor: {},
      authorsNotOnBook: [],
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
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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
    } else {
      this.getBooks();
    }
    this.handleCancel();
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
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify(newValues),
    };

    fetch(uri + "books", requestOptions)
      .then((response) => response.json())
      .then((data) => this.handleBookEditorResult(data))
      .catch(console.log);
  };

  removeAuthorFromBook = (book) => {
    const uri = localStorage.getItem("REST_URI");
    const dto = { bookId: book.id, authorId: this.state.selectedAuthor.id };
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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
        this.handleCancel();
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

  handleAddAuthorToBook = (evt) => {
    evt.preventDefault();
    const uri = localStorage.getItem("REST_URI");
    const dto = {
      bookId: this.state.selectedBook.id,
      authorId: evt.target.authors.value,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify(dto),
    };

    fetch(uri + "books/addAuthorToBook", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          this.getBooks();
        } else {
          console.error(data);
        }
        this.handleCancel();
      })
      .catch(console.log);
  };

  getAuthorsNotOnBook = (bookId) => {
    const uri =
      localStorage.getItem("REST_URI") + "authors/notOnBook/" + bookId;
    fetch(uri)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ authorsNotOnBook: data });
      })
      .catch(console.log);
  };

  render() {
    return (
      <React.Fragment>
        <AlertDialog
          show={this.state.showDeleteDialog}
          handleDelete={this.deleteBook}
          handleClose={this.handleCancel}
          item={this.state.selectedBook}
        />
        <AlertDialog
          show={this.state.showDeleteAuthorDialog}
          handleDelete={this.removeAuthorFromBook}
          handleClose={this.handleCancel}
          item={this.state.selectedBook}
        />
        <BookEditor
          show={this.state.showBookEditDialog}
          handleSaveBook={this.editBook}
          handleCancel={this.handleCancel}
          book={this.state.selectedBook}
        />
        <BookEditor
          show={this.state.showBookCreateDialog}
          handleSaveBook={this.createBook}
          handleCancel={this.handleCancel}
          book={null}
        />
        <AddAuthorToBook
          show={this.state.showAddAuthorToBook}
          handleCancel={this.handleCancel}
          handleAddAuthorToBook={this.handleAddAuthorToBook}
          book={this.state.selectedBook}
          authors={this.state.authorsNotOnBook}
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
                isAdmin={localStorage.getItem("IS_ADMIN")}
                isUserLogged={localStorage.getItem("TOKEN") !== null}
              ></Book>
            ))}
          </tbody>
        </table>
        <Button
          hidden={localStorage.getItem("TOKEN") === null}
          onClick={this.onAddNewBook}
        >
          Add new book
        </Button>
      </React.Fragment>
    );
  }
}

export default Books;
