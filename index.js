let tasks = JSON.parse(localStorage.getItem('todoList')) || [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

renderTaskList();

function addTask() {
  const task = taskInput.value.trim();
  const isExist = tasks.some(item => item.desc === task);
  if (isExist) {
    alert('Task already exist');
    return;
  }
  if (!task) {
    alert('Please enter task')
    return
  }

  tasks.unshift({desc: task, done: false});
  localStorage.setItem('todoList', JSON.stringify(tasks));
  renderTaskList();
  taskInput.value = '';
}

function enterTask(e) {
  e.keyCode === 13 && addTask();
}

function empty() {
  const oDiv = document.querySelector('.task-empty');
  if (tasks.length === 0) {
    oDiv.style.display = 'block';
  } else {
    oDiv.style.display = 'none';
  }
}

function renderTaskList() {
  empty()
  taskList.innerHTML = '';
  for (const [index, task] of tasks.entries()) {
    const listItem = document.createElement('li');
    listItem.className = `task + task.done ? 'done' : '';
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      localStorage.setItem('todoList', JSON.stringify(tasks));
      renderTaskList();
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(task.desc));
    listItem.appendChild(label);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(tasks));
      renderTaskList();
    });
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  }
}
