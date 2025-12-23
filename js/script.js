const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  taskInput.value = "";
  saveAndRender();
}

function renderTasks() {
  taskList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn">✔</button>
        <button class="edit-btn">✏</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    li.querySelector(".complete-btn").onclick = () => toggleTask(task.id);
    li.querySelector(".edit-btn").onclick = () => editTask(task.id);
    li.querySelector(".delete-btn").onclick = () => deleteTask(task.id);

    if (task.completed) {
      li.classList.add("completed");
      completedList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  const newText = prompt("Update task:", task.text);

  if (newText && newText.trim() !== "") {
    task.text = newText.trim();
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
