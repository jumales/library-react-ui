import React, { Component } from "react";
import Author from "./author";
import AlertDialog from "../dialog/alertDialog";
import AuthorEditor from "./authorEditor";
import { Button } from "react-bootstrap";

class Authors extends Component {
  state = {
    showDeleteDialog: false,
    showDeleteBookDialog: false,
    selectedAuthor: {},
    selectedBook: {}, //onRemoveBook needed
    showAuthorEditDialog: false,
    showAuthorCreateDialog: false,
    authors: [],
  };

  componentDidMount = () => {
    this.getAuthors();
  };

  //event methods
  onEdit = (author) => {
    this.setState({ selectedAuthor: author, showAuthorEditDialog: true });
  };

  onDelete = (author) => {
    this.setState({ selectedAuthor: author, showDeleteDialog: true });
  };

  onAddNewAuthor = () => {
    this.setState({ showAuthorCreateDialog: true });
  };

  onRemoveBook = (author, book) => {
    this.setState({
      showDeleteBookDialog: true,
      selectedBook: book,
      selectedAuthor: author,
    });
  };

  //delete author methods
  deleteAuthor = (author) => {
    const uri = localStorage.getItem("REST_URI");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(author),
    };
    fetch(uri + "authors", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          this.getAuthors();
        } else {
          console.error("error", data);
        }
      })
      .catch(console.log);
    this.setState({
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

  //edit or create author
  editAuthor = (evt) => {
    evt.preventDefault();

    const newValues = this.getAuthorDto(this.state.selectedAuthor.id, evt);

    const uri = localStorage.getItem("REST_URI");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newValues),
    };

    fetch(uri + "authors", requestOptions)
      .then((response) => response.json())
      .then((data) => this.handleAuthorEditorResult(data))
      .catch(console.log);
  };

  handleAuthorEditorResult = (data) => {
    if (data.status.code > 201) {
      console.log(data);
      this.setState({
        selectedAuthor: {},
        showAuthorEditDialog: false,
        showAuthorCreateDialog: false,
      });
    } else {
      this.getAuthors();
      this.setState({
        selectedAuthor: {},
        showAuthorEditDialog: false,
        showAuthorCreateDialog: false,
      });
    }
  };

  getAuthorDto = (id, evt) => {
    return {
      id: id,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      dayOfBirth: evt.target.dayOfBirth.value,
      oib: evt.target.oib.value,
    };
  };

  createAuthor = (evt) => {
    evt.preventDefault();

    const newValues = this.getAuthorDto(null, evt);

    const uri = localStorage.getItem("REST_URI");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newValues),
    };

    fetch(uri + "authors", requestOptions)
      .then((response) => response.json())
      .then((data) => this.handleAuthorEditorResult(data))
      .catch(console.log);
  };

  handleCancelEditAuthor = () => {
    this.setState({
      showAuthorEditDialog: false,
      selectedAuthor: {},
    });
  };

  //remove book from author
  removeBookFromAuthor = (author) => {
    const uri = localStorage.getItem("REST_URI");
    const dto = { authorId: author.id, bookId: this.state.selectedBook.id };
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
          this.getAuthors();
        } else {
          console.error(data);
        }
        this.setState({
          selectedBook: {},
          selectedAuthor: {},
          showDeleteBookDialog: false,
        });
      })
      .catch(console.log);
  };

  //helper methods
  getAuthors = () => {
    const uri = localStorage.getItem("REST_URI");
    fetch(uri + "authors")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ authors: data });
      })
      .catch(console.log);
  };

  getSelectedAuthor = () => {
    const uri = localStorage.getItem("REST_URI");
    fetch(uri + "authors/" + this.state.selectedAuthor.id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ selectedAuthor: data });
      })
      .catch(console.log);
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
        <AlertDialog
          show={this.state.showDeleteBookDialog}
          handleDelete={this.removeBookFromAuthor}
          handleClose={this.cancelDeleteDialog}
          item={this.state.selectedAuthor}
        />
        <AuthorEditor
          id="editAuthor"
          show={this.state.showAuthorEditDialog}
          handleSaveAuthor={this.editAuthor}
          handleCancel={this.handleCancelEditAuthor}
          author={this.state.selectedAuthor}
        />

        <AuthorEditor
          id="createAuthor"
          show={this.state.showAuthorCreateDialog}
          handleSaveAuthor={this.createAuthor}
          handleCancel={this.handleCancelEditAuthor}
          author={null}
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
        <Button onClick={this.onAddNewAuthor}>Add new author</Button>
      </React.Fragment>
    );
  }
}

export default Authors;
