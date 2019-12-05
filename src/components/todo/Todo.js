import React, { Component } from "react";
// import todoList from "../../components/todo/todolist";

export default class Todo extends Component {
  state = {
    editToggled: false,
    // completed: false,
    newEditTodo: this.props.item,
    currentTodo: this.props.item
  };

  handleEditToggle = () => {
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

    handleCompleted = () => {
      this.setState(prevState => {
        return {
          completed: !prevState.completed
        };
      });
    };


  //! name this.props under variables
  render() {
    const {
      item,
      completed,
      todoHandleNewEdit,
      todoHandleCompleted,
      todoHandleDelete,
      id
    } = this.props;

    return (
      <li key={id}>
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
                todoHandleNewEdit(id, this.state.newEditTodo);
                this.handleEditToggle();
              }}
            >
              <img src="/tick.png" alt="icon"></img>
            </button>
            <button className="buttonClass" onClick={this.handleEditToggle}>
              <img src="/go-back.png" alt="icon"></img>
            </button>
            <button
              className="buttonClass editbutton"
              onClick={() => {
                todoHandleDelete(id);
              }}
            >
              <img src="/delete.png" alt="icon"></img>
            </button>
          </>
        ) : (
          <>
            <p
              className={`${completed === true ? "completedline" : ""}`}
              onClick={() => {
                todoHandleCompleted(id, completed);
              }}
            >
              {item}
            </p>
            <div className="button-group">
              <button
                className="buttonClass editbutton"
                onClick={this.handleEditToggle}
              >
                <img src="/edit.png" alt="icon"></img>
              </button>
            </div>
          </>
        )}
      </li>
    );
  }
}
