importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

console.log('firebase', firebase);
firebase.messaging().onBackgroundMessage(function (payload) {
  console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
  );
});
