import { saveTask, getTasks, onGetTasks, deleteTask, getTask} from './firebase.js';

const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
        let html = '';

        querySnapshot.forEach((doc) => {
            const task = doc.data();
            html += `
            <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class='btn-delete' data-id="${doc.id}">Delete</button>
            <button class='btn-edit' data-id="${doc.id}">Edit</button>
            </div>
        `;
        });

    tasksContainer.innerHTML = html;
    const btnDelete = tasksContainer.querySelectorAll('.btn-delete');
    btnDelete.forEach(btn => {
        btn.addEventListener('click', ({target: {dataset}}) => {
            deleteTask(dataset.id);
        });
    });

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submitted');

    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    saveTask(title.value, description.value);

    taskForm.reset();
});