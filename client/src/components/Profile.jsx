import React, { Component } from "react";
import ListContext from "./ListContext";
import jwt_decode from "jwt-decode";
import { getList, addToList, deleteItem, updateItem } from "./ListFunctions";
import ListTable from "./ListTable";
import ListForm from "./ListForm";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick_name: "",
      id: "",
      term: "",
      editDisabled: false,
      items: [],
      errors: {},
      getAll: () => {
        getList().then(data => {
          this.setState(
            {
              term: "",
              items: [...data]
            },
            () => {
              console.log(this.state.items);
            }
          );
        });
      },
      onChange: event => {
        this.setState({ term: event.target.value, editDisabled: "disabled" });
      },

      onSubmit: e => {
        e.preventDefault();
        addToList(this.state.term).then(() => {
          this.state.getAll();
        });
        this.setState({ editDisabled: false });
      },
      onUpdate: e => {
        e.preventDefault();
        updateItem(this.state.term, this.state.id).then(() => {
          this.state.getAll();
        });
        this.setState({ editDisabled: false });
      },
      onEdit: (item, itemid, e) => {
        e.preventDefault();
        this.setState({
          id: itemid,
          term: item
        });
      },
      onDelete: (val, e) => {
        e.preventDefault();
        deleteItem(val).then(() => {
          this.state.getAll();
        });
      }
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      nick_name: decoded.nick_name,
      email: decoded.email
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Whats up {this.state.nick_name}</h1>
          </div>
          <ListContext.Provider value={this.state}>
            <ListForm />
            <ListTable getAll={this.state.getAll} />
          </ListContext.Provider>
        </div>
      </div>
    );
  }
}

export default Profile;
