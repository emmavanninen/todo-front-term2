import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./components/Nav/Nav";
import TodoList from "./components/todo/todolist";
import {
  apiHandleGetAllTodos,
  apiHandleAddNewTodoList,
  apiHandleNewEdit,
  apiHandleDelete,
  apiHandleCompleted
} from "./api/api";

class Todo extends Component {
  state = {
    todoLibrary: {},
    selected: "all",
    isAuth: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isAuth === true && prevState.isAuth === false) {
      //! this to call the function, doesn't find it without
      this.appHandleGetAllTodos();
    }
  }

  appHandleAuthSubmit = () => {
    this.setState({
      isAuth: true
    });
  };

  appHandleLogout = () => {
    this.setState({
      isAuth: false
    });
  };

  appHandleAddNewTodoList = newTodoFromTodoList => {
    apiHandleAddNewTodoList(newTodoFromTodoList)
      .then(createdNewTodo => {
        this.setState(
          ({ todoLibrary }) => ({
            todoLibrary: {
              ...todoLibrary,
              "all": [...todoLibrary.all, createdNewTodo]
            }
          }),
          () => {
            // getAllCompleted
            // getAllIncompleted
          }
        );
      })
      .catch(err => {
        console.log("err: ", err);
      });
  };

  appHandleGetAllTodos = () => {
    apiHandleGetAllTodos()
      .then(allTodos => {
        //   console.log(`all`, allTodos.data.todo);

        this.setState(({ todoLibrary }) => ({
          todoLibrary: {
            ...todoLibrary,
            "all": allTodos.data.todo
          }
        }));
      })
      .catch(error => console.log("error: ", error));
  };

  appHandleNewEdit = (id, newTodo) => {
    apiHandleNewEdit(id, newTodo)
      .then(editedTodo => {
        let updated = this.state.todoLibrary.all;

        updated = updated.map(item => {
          if (item._id === id) {
            return editedTodo;
          }
          return item;
        });

        this.setState(({ todoLibrary }) => ({
          todoLibrary: {
            ...todoLibrary,
            "all": updated
          }
        }));
      })
      .catch(error => console.log("error: ", error));
  };

    appHandleCompleted = (id, bool) => {
        apiHandleCompleted(id, bool)
            .then(result => {
                let completedTag = this.state.todoLibrary.all;
                completedTag = completedTag.map(item => {
                    if (item._id === id) {
                        item.completed = result
                        return item;
                    }
                    return item;
                });

                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        "all": completedTag
                    }
                }));
            })
            .catch(error => console.log("error: ", error))
    }

  appHandleDelete = (userid, todoid) => {
      apiHandleDelete(userid, todoid)
        .then(result =>{
            console.log(`deleted`, result);
            this.setState(({ todoLibrary }) => ({
                todoLibrary: {
                    ...todoLibrary,
                    "all": result
                }
            }))
        }
        )
          .catch(error => console.log("error: ", error))

  };

  
  render() {
    return (
      <div className="TodoApp">
        <Nav
          appHandleAuthSubmit={this.appHandleAuthSubmit}
          appHandleLogout={this.appHandleLogout}
        />
        {this.state.isAuth ? (
          <>
            <div id="list">
              <div id="category">
                <div className="your-todo"></div>
                <ul id="category-nav">
                  <li>
                    <a href="/">All todos</a>
                  </li>
                  <li>
                    <a href="/">Current</a>
                  </li>
                  <li>
                    <a href="/">Done</a>
                  </li>
                </ul>
                <TodoList
                  appHandleAddNewTodoList={this.appHandleAddNewTodoList}
                  todoList={this.state.todoLibrary["all"]}
                  appHandleNewEdit={this.appHandleNewEdit}
                  appHandleCompleted={this.appHandleCompleted}
                  appHandleDelete={this.appHandleDelete}
                />
              </div>
            </div>
          </>
        ) : (
          <h1 id="login-warning">Please login</h1>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
