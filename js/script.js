document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const todoList = document.getElementById("todo-list");
  const filterInput = document.getElementById("filter-input");
  const taskCount = document.getElementById("task-count");
  const progressFill = document.getElementById("progress-fill");
  const deleteAllBtn = document.getElementById("delete-all");

  // Update task count & progress bar
  const updateStatus = () => {
    const tasks = document.querySelectorAll("#todo-list li");
    const completed = document.querySelectorAll("#todo-list li.completed");
    taskCount.textContent = `Total Tasks: ${tasks.length} | Completed: ${completed.length}`;

    let percent = tasks.length === 0 ? 0 : (completed.length / tasks.length) * 100;
    progressFill.style.width = percent + "%";
  };

  // Add Task
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = todoInput.value.trim();
    const date = todoDate.value;

    if (task === "" || date === "") {
      alert("⚠️ Please fill out both fields!");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${task}</strong> <br> <small>📅 ${date}</small></span>
      <div>
        <button class="btn complete-btn">✔</button>
        <button class="btn delete-btn">✖</button>
      </div>
    `;

    todoList.appendChild(li);

    todoInput.value = "";
    todoDate.value = "";

    updateStatus();
  });

  // Actions (Complete & Delete)
  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const li = e.target.closest("li");
      li.style.opacity = "0";
      li.style.transform = "translateX(50px)";
      setTimeout(() => {
        li.remove();
        updateStatus();
      }, 400);
    }

    if (e.target.classList.contains("complete-btn")) {
      const li = e.target.closest("li");
      li.classList.toggle("completed");
      updateStatus();
    }
  });

  // Filter Task
  filterInput.addEventListener("keyup", () => {
    const filter = filterInput.value.toLowerCase();
    const tasks = document.querySelectorAll("#todo-list li");

    tasks.forEach(task => {
      const text = task.textContent.toLowerCase();
      task.style.display = text.includes(filter) ? "flex" : "none";
    });
  });

  // Delete All Tasks
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("⚠️ Are you sure you want to delete ALL tasks?")) {
      todoList.innerHTML = "";
      updateStatus();
    }
  });

  updateStatus();
});
