import React, { Component } from "react";
import ListContext from "./ListContext";

class ListForm extends Component {
  render() {
    return (
      <ListContext.Consumer>
        {todo => (
          <form onSubmit={todo.onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Task Name</label>
              <div className="row">
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={todo.term || ""}
                    onChange={todo.onChange.bind(this)}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary"
                    onClick={todo.onUpdate.bind(this)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={todo.onSubmit.bind(this)}
            >
              Submit
            </button>
          </form>
        )}
      </ListContext.Consumer>
    );
  }
}

export default ListForm;
