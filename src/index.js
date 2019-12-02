import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav';
import TodoList from './components/todo/todolist';
import { apiHandleGetAllTodos, apiHandleAddNewTodoList } from './api/api';

class Todo extends Component {
    state = {
        todoLibrary: {},
        selected: 'all',
        isAuth: false
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.isAuth === true && prevState.isAuth === false){
            //! this to call the function, doesn't find it without
            this.appHandleGetAllTodos()
        }
    }

    appHandleAuthSubmit = () => {
        this.setState({
            isAuth: true
        })
    }


    appHandleLogout = () => {
        this.setState({
            isAuth: false
        })
    }

    appHandleAddNewTodoList = (newTodoFromTodoList) => {
        apiHandleAddNewTodoList(newTodoFromTodoList)
            .then(createdNewTodo => {
                console.log('createdNewTodo: ', createdNewTodo)
                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        ['all']: [...todoLibrary.all, createdNewTodo]
                    }
                }), () => {
                    console.log(this.state)
                })
            })
            .catch(err => {
                console.log('err: ', err)
            })
    }

    appHandleGetAllTodos = () => {
        apiHandleGetAllTodos()
            .then(allTodos => {
                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        ['all']: allTodos.data.todo
                    }
                }))
            })
            .catch(error => console.log('error: ', error))
    }

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
                    <ul>
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
                    />
                  </div>
                </div>
              </>
            ) : (
              <h1 id='login-warning'>Please login</h1>
            )}
          </div>
        );
    }
}

ReactDOM.render(<Todo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
