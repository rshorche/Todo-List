import { addTodo, removeTodo, doTodo, filterTodos } from "./actions.js";

function addTodoAction(title) {
  return {
    type: addTodo,
    title,
  };
}
function removeTodoAction(id) {
  return {
    type: removeTodo,
    id,
  };
}
function doTodoActin(id) {
  return {
    type: doTodo,
    id,
  };
}
function filterAllTodosAction() {
  return {
    type: filterTodos,
  };
}

export { addTodoAction, removeTodoAction, doTodoActin, filterAllTodosAction };
