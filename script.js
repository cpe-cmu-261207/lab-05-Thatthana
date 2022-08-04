const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  else if (inputAdd === "") alert("Todo cannot be empty");
  else addTodo(inputAdd.value, false);
  inputAdd.value = "";
  saveTodo();
  //your code here
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";
  doneBtn.style.display = "none";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.style.display = "none";

  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);

  div.onmouseover = () => {
    div.onmouseover;
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };
  div.onmouseout = () => {
    div.onmouseout;
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };
  //your code here
  //append todo to HTML...
  //define buttons event...
  doneBtn.onclick = () => {
    if (span.style.textDecoration !== "line-through") {
      span.style.textDecoration = "line-through";
      const data = JSON.parse(localStorage.getItem("todo-container"));
      for (const i in data) {
        data.completed = true;
      }
    } else {
      span.style.textDecoration = "";
      const data = JSON.parse(localStorage.getItem("todo-container"));
      for (const i in data) {
        data.completed = false;
      }
    }
    saveTodo();
  };

  deleteBtn.onclick = () => {
    div.remove();
    const data = JSON.parse(localStorage.getItem("todo-container"));
    for (const i in data) {
      if (data[i].title === title) {
        data.splice(i, 1);
      }
    }
    saveTodo();
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed = todoDiv.style.textDecoration === "line-through";
    data.push(todoObj);
  }
  //your code here
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todo-container", dataStr);
}

function loadTodo() {
  //your code here

  const dataStr = localStorage.getItem("todo-container");
  const data = JSON.parse(dataStr);
  for (const i of data.reverse()) {
    addTodo(i.title, i.completed);
  }
}

loadTodo();
