import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBACtKPFYfV-6kooH_j976idb0ihM4G_4o",
  authDomain: "lblood---a-life-saver-app.firebaseapp.com",
  databaseURL: "https://lblood---a-life-saver-app-default-rtdb.firebaseio.com",
  projectId: "lblood---a-life-saver-app",
  storageBucket: "lblood---a-life-saver-app.appspot.com",
  messagingSenderId: "70649792031",
  appId: "1:70649792031:web:4803d5cbe89543d706f72a"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}  
export default firebase.database();