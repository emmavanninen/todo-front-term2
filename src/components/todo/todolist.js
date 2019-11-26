import React, { Component } from "react";
import "./todo-style.css";
import Todo from "./Todo";

export default class todolist extends Component {
  state = {
    newTodo: ""
  };

  handleNewTodoSubmit = () => {
    console.log("poop");
  };


  handleChange = (event) => {
      this.setState({
          newTodo: event.target.value
      })
  }


  render() {
    return (
      <>
        <form onSubmit={this.handleNewTodoSubmit}>
          <input name="newTodo" value={this.state.newTodo} onChange={this.handleChange}/>

          <button>Add</button>
        </form>
        <ul>
          <Todo />
        </ul>
      </>
    );
  }
}
