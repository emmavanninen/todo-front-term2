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
              all: [...todoLibrary.all, createdNewTodo]
            }
          }),
          () => {
              console.log('poop');
              
            //
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
        this.setState(({ todoLibrary }) => ({
          todoLibrary: {
            ...todoLibrary,
            all: allTodos.data.todo
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
            all: updated
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
            item.completed = result;
            return item;
          }
          return item;
        });

        this.setState(
          ({ todoLibrary }) => ({
            todoLibrary: {
              //! ... "spread"
              ...todoLibrary,
              all: completedTag
            }
          }),
          () => {
              console.log('poop');
              
            // updt lib
          }
        );
      })
      .catch(error => console.log("error: ", error));
  };

  appHandleDelete = (userid, todoid) => {
    apiHandleDelete(userid, todoid)
      .then(result => {
        this.setState(
          ({ todoLibrary }) => ({
            todoLibrary: {
              ...todoLibrary,
              all: result
            }
          }),
          () => {
              console.log('poop');
              
            // updt lib
          }
        );
      })
      .catch(error => console.log("error: ", error));
  };

  appHandleGetByCompletion = completion => {
    let completeB;

    this.setState({
      selected: completion
    });

    if (completion === "all") return;
    else if (completion === "incompleted") completeB = false;
    else if (completion === "completed") completeB = true;

    if (
      !this.state.todoLibrary[completion] ||
      this.state.todoLibrary[completion].length === 0
    ) {
      apiHandleGetAllTodos(completeB)
        .then(result => {
          let byCompletion = result.data.todo;
          console.log(`data before filter`, byCompletion);

          byCompletion = byCompletion.filter(item => {
            if (item.completed === completeB) {
              return item;
            } else return;
          });

          console.log(`by completion`, byCompletion);

          this.setState(({ todoLibrary }) => ({
            todoLibrary: {
              ...todoLibrary,
              [completion]: byCompletion
            }
          }));
        })
        .catch(error => console.log("error: ", error));
    }
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
                  <li onClick={() => this.appHandleGetByCompletion("all")}>
                    <a href="#">All todos</a>
                  </li>
                  <li
                    onClick={() => this.appHandleGetByCompletion("incompleted")}
                  >
                    <a href="#">Current</a>
                  </li>
                  <li
                    onClick={() => this.appHandleGetByCompletion("completed")}
                  >
                    <a href="#">Done</a>
                  </li>
                </ul>
                <TodoList
                  appHandleAddNewTodoList={this.appHandleAddNewTodoList}
                  todoList={this.state.todoLibrary[this.state.selected]}
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
