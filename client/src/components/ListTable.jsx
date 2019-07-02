import React, { Component } from "react";
import ListContext from "./ListContext";

class ListTable extends Component {
  componentDidMount() {
    this.props.getAll();
  }
  render() {
    return (
      <ListContext.Consumer>
        {todo => (
          <table className="table">
            <tbody>
              {todo.items.map((item, index) => (
                <tr key={index}>
                  <td className="text-left">{item.task_name}</td>
                  <td className="text-right">
                    <button
                      href=""
                      className="btn btn-info mr-1"
                      disabled={todo.editDisabled}
                      onClick={todo.onEdit.bind(this, item.task_name, item.id)}
                    >
                      Edit
                    </button>
                    <button
                      href=""
                      className="btn btn-danger"
                      onClick={todo.onDelete.bind(this, item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>
        )}
      </ListContext.Consumer>
    );
  }
}

export default ListTable;
