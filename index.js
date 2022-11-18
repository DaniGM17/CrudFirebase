import {saveTask} from './firebase.js';

window.addEventListener('DOMContentLoaded', () => {
    
});

const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submitted');

    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    saveTask(title.value, description.value);

    taskForm.reset();
});