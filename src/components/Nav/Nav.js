import React, { Component } from "react";
import { apiAuth, apiHandleSignupLogin } from "../../api/api";
import setAuthJWT from "../../api/setAuthJWT";

//! Statefull component
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isAuth: false,
      loggedinEmail: "",
      errorMsg: false,
      errorToggle: false
    };
  }

  componentDidMount = () => {
    apiAuth()
      .then(userObj => {
        this.setState(
          {
            isAuth: true,
            loggedinEmail: userObj.email
          },
          () => {
            this.props.appHandleAuthSubmit();
          }
        );
      })
      .catch(error => console.log(error));
  };

  handleOnCHange = event => {
    this.setState({ [event.target.name]: event.target.value });
    //! log to see letter by letter
    //   console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();

    apiHandleSignupLogin({
      email: this.state.email,
      password: this.state.password
    })
      .then(result => {
        const { email } = result;

        this.setState(
          {
            email: "",
            password: "",
            isAuth: true,
            loggedinEmail: email,
            errorToggle: false,
            errorMsg: ""
          },
          () => {
            this.props.appHandleAuthSubmit();
          }
        );
      })
      .catch(errormsg => {
        console.log(errormsg);

        this.setState({
          errorMsg: errormsg,
          errorToggle: true
        });
      });
  };

  handleLogout = event => {
    this.setState(
      {
        isAuth: false
      },
      () => {
        this.props.appHandleLogout();
        localStorage.removeItem("jwtToken");

        setAuthJWT(null);
      }
    );
  };

  render() {
    return (
      <>
        <nav id="navigation" className="navbar navbar-dark">
          <a href="/" className="navbar-brand">
            Todo App
          </a>
          {this.state.isAuth ? (
            <form className="navbar-brand">
              <p>Logged in as {this.state.loggedinEmail}</p>
              <button
                onClick={this.handleLogout}
                className="btn btn-outline-success my-2 my-sn-0"
              >
                Log Out
              </button>
            </form>
          ) : (
            <form className="navbar-brand" onSubmit={this.handleSubmit}>
              <span
                style={{ padding: "0px" }}
                className={this.state.errorToggle ? "alert alert-danger" : ""}
              >
                {this.state.errorToggle ? this.state.errorMsg : ""}
              </span>
              <input
                type="text"
                placeholder="email"
                name="email"
                className="form-control mr-sm-2"
                onChange={this.handleOnCHange}
              ></input>
              <input
                type="text"
                placeholder="password"
                name="password"
                className="form-control mr-sm-2"
                onChange={this.handleOnCHange}
              ></input>
              <button className="btn btn-outline-success my-2 my-sn-0">
                Sign Up | Sign In
              </button>
            </form>
          )}
        </nav>
      </>
    );
  }
}

// //! Stateless component
// const Nav = props => {
//     return (
//         <nav className='navbar navbar-dark bg-dark'>
//             <a className='navbar-brand'>Poop</a>
//             <form className='navbar-brand'>
//                 <input type='text' placeholder="email" className='form-control mr-sm-2'></input>
//                 <input type='text' placeholder="password"  className='form-control mr-sm-2'></input>
//                 <button className='btn btn-outline-success my-2 my-sn-0'>Sign Up | Sign In</button>
//             </form>
//         </nav>
//     );
// };

export default Nav;
