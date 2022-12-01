import {
    saveTask,
    getTasks,
    onGetTasks,
    deleteTask,
    getTask,
    updateTask,
    saveImage
} from './firebase.js';

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');

let editStatus = false;
let id = '';

const uploadFileAction = (e) => {
    const file = e.target.files[0];
    saveImage(file);
}

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `
            <div class='card card-body mt-2 bord-primary'>
            <h3 class='card-title'>${task.title}</h3>
            <p class='card-text'>${task.description}</p>`;
            if (task.imageUrl) {
                html += `<img src='${task.imageUrl}' width='300px'>`
            }
            html += `
            <div>
            <button class='btn-delete btn btn-primary btn-sm' data-id="${doc.id}">Delete</button>
            <button class='btn-edit btn btn-secondary btn-sm' data-id="${doc.id}">Edit</button>
            </div>
            </div>
        `;
        });
        taskContainer.innerHTML = html;

        const btnDelete = taskContainer.querySelectorAll('.btn-delete');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', async ({ target: { dataset } }) => {
                deleteTask(dataset.id);
            })
        });

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async e => {
            
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();

                    taskForm['task-title'].value = task.title;
                    taskForm['task-description'].value = task.description;

                    editStatus = true;
                    id = e.target.dataset.id;

                    taskForm['btn-task-save'].innerText = 'update';
                })
            })
            // btnsEdit.forEach((btn) => {
            //     btn.addEventListener('click', async (e) => {
            //         const doc = await getTask(e.target.dataset.id);
            //         const task = doc.data();

            //         taskForm['task-title'].value = task.title;
            //         taskForm['task-description'].value = task.description;

            //         editStatus = true;
            //         id = e.target.dataset.id;

            //         taskForm['btn-task-form'].innerText = 'update';
            //     })
            // })

        });

        document.querySelector('#file-task').addEventListener('change', uploadFileAction);

    });




    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Submitted');

        const title = taskForm['task-title'].value;
        const description = taskForm['task-description'].value;
        const imageUrl = document.querySelector('#image').src;
        if (title.length > 3 || description.length > 3) {
            if (!editStatus) {
                saveTask(title, description, imageUrl);
                document.querySelector('#image').src = '';
            } else {
                updateTask(id, {
                    'title': title,
                    'description': description,
                });
                editStatus = false;
            }
            taskForm.reset();
        } else {
            alert('Debes escribir algo 😑');
        }


    });

