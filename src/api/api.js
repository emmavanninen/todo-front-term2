import { Axios } from "./Axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "./setAuthJWT";

export const apiAuth = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("jwtToken");

      setAuthJWT(null);

      reject(null);
    } else {
      setAuthJWT(token);

      const user = {
        id: decoded.id,
        email: decoded.email
      };

      resolve(user);
    }
  });
};

export const apiHandleSignupLogin = userInfo => {
  return new Promise((resolve, reject) => {
    Axios.post("/users/signuplogin", userInfo, axiosConfig)
      .then(result => {
        const { token } = result.data;

        localStorage.setItem("jwtToken", token);

        const decoded = jwt_decode(token);

        setAuthJWT(token);

        resolve(decoded);
      })
      .catch(error => reject(error.response.data.message));
  });
};

export const apiHandleAddNewTodoList = newTask => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(token);

    const newObj = {
      todo: newTask,
      id: decoded.id
    };

    Axios.post("/todo/createtodo", newObj, axiosConfig)
      .then(newTodo => resolve(newTodo.data))
      .catch(err => reject(err));
  });
};

export const apiHandleGetAllTodos = todo => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(token);

    // const todoObj = {
    //   todo: todo,
    //   id: decoded.id
    // };

    Axios.get(`/todo?id=${decoded.id}`)
      .then(todos => resolve(todos))
      .catch(err => reject(err));
  });
};

export const apiHandleNewEdit = (id, editedTodo) => {
  return new Promise((resolve, reject) => {
    // const token = localStorage.getItem("jwtToken");
    // const decoded = jwt_decode(token);

    const editedTodoObj = {
      id,
      editedTodo
    };

    Axios.put("/todo/edittodo", editedTodoObj)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
};

export const apiHandleDelete = todoid => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(token);

    Axios.delete(`/todo/deletetodo/${decoded.id}/${todoid}`)
      .then(result => {
        resolve(result.data);
      })
      .catch(err => reject(err));
  });
};

export const apiHandleCompleted = (id, bool) => {
    
  return new Promise((resolve, reject) => {
    const completedObj = {
      id,
      bool
    };

    Axios.put(`/todo/completetodo`, completedObj)
      // .then(result => console.log(result.data))
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
};

// export const apiHandleCompletionLists = (completion) => {
//     console.log('completion', completion);
    
//   return new Promise((resolve, reject) => {
//     const token = localStorage.getItem("jwtToken");
//     const decoded = jwt_decode(token);

//       Axios.get(`/todo/getbycompletion/${completion}/${decoded.id}`)
//       .then(result => {
//         console.log(`back to front`, result.data);
          
//         resolve(result)})
//       .catch(err => reject(err));
//   });
// };

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};
