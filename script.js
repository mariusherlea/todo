const todos = [];
const displayTodo = document.querySelector(".display-todo");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from localStorage
function loadTodos() {
  todos.length = 0;
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos) {
    todos.push(...savedTodos);
  }
}

// Function to add a todo
function addTodo(todoText) {
  todos.push({ text: todoText, completed: false });
  saveTodos();
  displayTodos();
}

// Function to clear all todos
function clearTodos() {
  todos.length = 0;
  saveTodos();
  displayTodos();
}

// Function to toggle completion status of a todo
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  displayTodos();
}

// Function to display todos
function displayTodos() {
  displayTodo.innerHTML = ""; // Clear the display area
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.addEventListener("click", () => toggleTodo(index));
    displayTodo.appendChild(li);
  });
}

// Event listener for form submission
todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    addTodo(todoText);
    todoInput.value = ""; // Clear the input field
  }
});

// Event listener for clear button
const clearButton = document.getElementById("clearTodo");
clearButton.addEventListener("click", clearTodos);

// Load todos when the page loads
loadTodos();
displayTodos();
