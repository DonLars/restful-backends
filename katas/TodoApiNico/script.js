const newTodoInput = document.querySelector("#new-todo");
const addTodoBtn = document.querySelector("#new-todo-btn");
const todoList = document.querySelector("#list");

let todos = [];

function loadTodos() {
  fetch("http://localhost:4730/todos")
    .then((res) => res.json())
    .then((todosFromApi) => {
      //console.log(todosFromApi);
      todos = todosFromApi;
      renderTodos();
    });
}
function postTodos() {
  const newTodoText = newTodoInput.value;
  const newTodo = {
    description: newTodoText,
    done: false,
  };
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const text = document.createTextNode(todo.description);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";

    removeBtn.addEventListener("click", (event) => {
      console.log(event);
      event.target.parentNode.remove();

      //renderTodos();

      // hier den eintrag mit der entsprechenden ID löschen und der Api übergeben mittels DELETE
    });

    newLi.append(text, removeBtn);
    todoList.appendChild(newLi);
  });
}

addTodoBtn.addEventListener("click", () => {
  postTodos();
});

loadTodos();
