import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// const firebaseConfig = {
//   apiKey: "AIzaSyB6rEeCFL0kouvHC3Ks-YV9-D4q8_SedHg",
//   authDomain: "almacen-danben.firebaseapp.com",
//   databaseURL: "https://almacen-danben-default-rtdb.firebaseio.com",
//   projectId: "almacen-danben",
//   storageBucket: "almacen-danben.appspot.com",
//   messagingSenderId: "548574985301",
//   appId: "1:548574985301:web:731d09860f35a572f468dc",
//   measurementId: "G-Y26LJK2F8B"
// }

const botonGuardar = document.querySelector("#botonGuardar")
const nombreTarea = document.querySelector("#nombreTarea")
const contenidoTarea = document.querySelector("#contenidoTarea")
const cuerpo = document.querySelector('#cuerpo')

var config = {
  apiKey: "AIzaSyB6rEeCFL0kouvHC3Ks-YV9-D4q8_SedHg",
  authDomain: "almacen-danben.firebaseapp.com",
  databaseURL: "https://almacen-danben-default-rtdb.firebaseio.com",
  storageBucket: "almacen-danben.appspot.com"
};
firebase.initializeApp(config);

  // Get a reference to the database service

firebase.database().ref().child('tareas');

function writeUserData(name, email) {
  firebase.database().ref('tareas').push({
    nombre: name,
    tarea: email
  });
}

const getTasks = () => {
  const datosTasks = firebase.database().ref('tareas');
  datosTasks.once('value')
    .then(snap => {
      const datos = snap.val()
      for(const registro in datos) {
        const tr = document.createElement('tr')
        
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        td1.textContent = datos[registro].nombre
        td2.textContent = datos[registro].tarea
        tr.appendChild(td1)    
        tr.appendChild(td2)    
      
        cuerpo.appendChild(tr)
        console.log(datos[registro])
      }
    })
}







botonGuardar.addEventListener('click', event => {
  event.preventDefault()
  console.log(nombreTarea.value, contenidoTarea.value)
  if(nombreTarea.value != '' && contenidoTarea.value != '') {
      writeUserData(nombreTarea.value, contenidoTarea.value)
  }
  cuerpo.textContent = ''
  getTasks()
})

window.onload = () => {
  getTasks()
}

// firebase.database().ref('tareas').on('child_added', (data) => {
  
// });

// firebase.database().ref('tareas').on('child_changed', (data) => {
//   getTasks()
// });

// firebase.database().ref('tareas').on('child_removed', (data) => {
//   getTasks()
// });

// firebase.analytics();