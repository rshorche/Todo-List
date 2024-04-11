const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");

import { addTodo, removeTodo, doTodo, filterTodos } from "../Redux/actions.js";

import {
  addTodoAction,
  removeTodoAction,
  doTodoActin,
  filterAllTodosAction,
} from "../Redux/actionCreators.js";

window.removeTodoHandler = removeTodoHandler;
window.doTodoHandler = doTodoHandler;

//create todos reducer
function todolistReducer(state = [], action) {
  switch (action.type) {
    case filterTodos: {
      return state;
    }
    case addTodo: {
      let newState = [...state];
      let newTodoObj = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      };
      newState.push(newTodoObj);
      return newState;
    }
    case removeTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => {
        return todo.id !== action.id;
      });
      return newState;
    }
    case doTodo: {
      let newState = [...state];
      newState.forEach((todo) => {
        if (todo.id == action.id) {
          return (todo.isCompleted = !todo.isCompleted);
        }
      });
      return newState;
    }
    default: {
      return state;
    }
  }
}

//create store
const store = Redux.createStore(todolistReducer);

todoButton.addEventListener("click", (event) => {
  event.preventDefault();
  const todoInputValue = todoInput.value.trim();
  store.dispatch(addTodoAction(todoInputValue));
  const todos = store.getState();
  todoInput.value = "";
  generatTodos(todos);
});

//generat todo in domm
function generatTodos(todos) {
  todoList.innerHTML = "";
  todos.map((todo) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      `
    <div class="todo ${todo.isCompleted && "completed"}">
      <li class="todo-item">${todo.title}</li>
      <button class="complete-btn" onclick=doTodoHandler('${todo.id}')>
        <i class="fas fa-check-circle"></i>
      </button>
      <button class="trash-btn" onclick=removeTodoHandler('${todo.id}')>
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `
    );
  });
}

// remove todo
function removeTodoHandler(todoId) {
  store.dispatch(removeTodoAction(todoId));
  const todos = store.getState();
  generatTodos(todos);
}
// is completed
function doTodoHandler(todoId) {
  store.dispatch(doTodoActin(todoId));
  const todos = store.getState();
  generatTodos(todos);
}

// all completed inComplete
filterTodo.addEventListener("change", (e) => {
  store.dispatch(filterAllTodosAction());
  let todos = store.getState();

  if (e.target.value === "all") {
    generatTodos(todos);
  } else if (e.target.value === "completed") {
    let complete = todos.filter((todo) => todo.isCompleted);
    generatTodos(complete);
  } else if (e.target.value === "incomplete") {
    let complete = todos.filter((todo) => !todo.isCompleted);
    generatTodos(complete);
  }
});
