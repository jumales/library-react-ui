import React, { Component } from "react";
import Author from "./author";
import AlertDialog from "../dialog/alertDialog";
import AuthorEditor from "./authorEditor";

class Authors extends Component {
  state = {
    showDeleteDialog: false,
    selectedAuthor: {},
    showAuthorEditorDialog: false,
    authors: [
      {
        id: 1,
        firstName: "Jure",
        lastName: "Maleš",
        oib: "12345678900",
        dayOfBirth: "1987-11-23",
        books: [{ id: 1, ibn: "1234", title: "First title" }],
      },
      {
        id: 2,
        firstName: "Nikolina",
        lastName: "Antolić",
        oib: "01278968578",
        dayOfBirth: "1991-11-15",
        books: [
          { id: 1, ibn: "1234", title: "First title" },
          { id: 2, ibn: "5678", title: "Second title" },
        ],
      },
    ],
  };

  onEdit = (author) => {
    this.setState({ selectedAuthor: author, showAuthorEditorDialog: true });
  };

  onDelete = (author) => {
    this.setState({ selectedAuthor: author, showDeleteDialog: true });
  };

  deleteAuthor = (author) => {
    const authors = this.state.authors.filter((a) => a.id !== author.id);
    this.setState({
      authors: authors,
      showDeleteDialog: false,
      selectedAuthor: {},
    });
  };

  cancelDeleteDialog = () => {
    this.setState({
      showDeleteDialog: false,
      selectedAuthor: {},
    });
  };

  //edit author
  saveAuthor = (evt) => {
    evt.preventDefault();

    const authors = this.state.authors;
    const sel = this.state.selectedAuthor;
    authors.map((author) => {
      if (author.id === sel.id) {
        author.firstName = evt.target.firstName.value;
        author.lastName = evt.target.lastName.value;
        author.oib = evt.target.oib.value;
        author.dayOfBirth = evt.target.dayOfBirth.value;
      }
    });
    this.setState({
      authors: authors,
      selectedAuthor: {},
      showAuthorEditorDialog: false,
    });
  };

  handleCancelEditAuthor = () => {
    this.setState({
      showAuthorEditorDialog: false,
      selectedAuthor: {},
    });
  };

  //remove book from author
  onRemoveBook = (author, book) => {
    const authors = this.state.authors;
    const index = authors.find((a) => a.id === author.id);
    const books = author.books.filter((b) => b.id !== book.id);
    author.books = books;
    authors[index] = author;
    this.setState({ authors: authors });
  };

  render() {
    return (
      <React.Fragment>
        <AlertDialog
          show={this.state.showDeleteDialog}
          handleDelete={this.deleteAuthor}
          handleClose={this.cancelDeleteDialog}
          item={this.state.selectedAuthor}
        />
        <AuthorEditor
          show={this.state.showAuthorEditorDialog}
          handleSaveAuthor={this.saveAuthor}
          handleCancel={this.handleCancelEditAuthor}
          author={this.state.selectedAuthor}
        />

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">OIB</th>
              <th scope="col">Day of birth</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.authors.map((author) => (
              <Author
                key={author.id}
                author={author}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
                onRemoveBook={this.onRemoveBook}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Authors;
