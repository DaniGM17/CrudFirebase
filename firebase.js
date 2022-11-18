  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getFirestore, 
           collection, 
           addDoc,
           getDocs,
           deleteDoc,
           onSnapshot,
           doc
        } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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

  export const saveTask = (title, description) => {
    addDoc(collection(db, 'tasks'), {title, description});
  }

  export const getTasks = () => getDocs(collection(db, 'tasks'));

  export const onGetTasks = (callback) => onSnapshot(collection(db,'tasks'), callback);

  export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));