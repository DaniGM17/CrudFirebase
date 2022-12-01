// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    getDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCic9rtMLKkGUiImKzFU5iwmVWgnlBpG6E",
    authDomain: "fir-javascript-crud-c5564.firebaseapp.com",
    projectId: "fir-javascript-crud-c5564",
    storageBucket: "fir-javascript-crud-c5564.appspot.com",
    messagingSenderId: "436796516225",
    appId: "1:436796516225:web:f4061da6e890f5ddbfea80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage(app);


export const saveTask = (title, description, imageUrl) => {
    addDoc(collection(db, 'tasks'), { title, description, imageUrl });
}

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) =>
    updateDoc(doc(db, "tasks", id), newFields);

export const saveImage = file => {
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);


   
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        document.querySelector('.progress-bar').style.width=`${progress}%`;
      },
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // document.querySelector('#progress').value='Fin';
          console.log('File available at', downloadURL);
          document.querySelector('#image').src=downloadURL;
        });
      }
    );
    
}