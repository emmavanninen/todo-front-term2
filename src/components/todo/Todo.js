import React, { Component } from "react";
import todoList from "../../components/todo/todolist";

export default class Todo extends Component {
  state = {
    editToggled: false,
    newEditTodo: this.props.item,
    currentTodo: this.props.item
  };

  handleEditToggle = () => {
    // console.log(this.state);
    //! Toggle boolean with state
    this.setState(prevState => {
      return {
        editToggled: !prevState.editToggled,
          newEditTodo: this.state.currentTodo
      };
    });
  };

  editTodo = event => {
    this.setState({
      newEditTodo: event.target.value
    });
  };

  //! name this.props under variables
  render() {
    const {
        item,
        todoHandleNewEdit,
        id
    } = this.props

    return (
      <li>
        {this.state.editToggled ? (
          //! react fragment
          <>
            <input defaultValue={item} onChange={this.editTodo} />

            <button
              className="buttonClass"
              disabled={
                this.state.newEditTodo === this.state.currentTodo ? true : false
              }
              onClick={() => {
                todoHandleNewEdit(id, this.state.newEditTodo)
                this.handleEditToggle()
              }}
            >
              Edit
            </button>

            <button className="buttonClass" onClick={this.handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p> {item} </p>
            <button
              className="buttonClass editbutton"
              onClick={this.handleEditToggle}
            >
Edit
            </button>
          </>
        )}
      </li>
    );
  }
}
