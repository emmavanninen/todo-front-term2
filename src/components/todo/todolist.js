import React, { Component } from "react";
import "./todo-style.css";
import Todo from "./Todo";

export default class todoList extends Component {
  state = {
    newTodo: ""
  };

  handleNewTodoSubmit = event => {
    event.preventDefault();

    this.props.appHandleAddNewTodoList(this.state);

    this.setState({
      newTodo: ""
    });
  };

  handleChange = event => {
    this.setState({
      newTodo: event.target.value
    });
  };

  showTodoList = event => {
    return this.props.todoList.map(item => {
      return (
        <Todo
          key={item._id}
          id={item._id}
          item={item.todo}
          completed={item.false}
          todoHandleNewEdit={this.props.appHandleNewEdit}
          todoHandleDelete={this.props.appHandleDelete}
        />
      );
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleNewTodoSubmit}>
          <input
            name="newTodo"
            value={this.state.newTodo}
            onChange={this.handleChange}
          />

          <button className="buttonClass">Add new todo</button>
        </form>
        <ul id="list-of-todos">
          {this.props.todoList ? this.showTodoList() : null}
        </ul>
      </>
    );
  }
}
