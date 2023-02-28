// Import the functions you need from the SDKs you need
import { getAuth, signInAnonymously, onAuthStateChanged  } from "firebase/auth";
import { getDatabase, ref, set, onChildAdded, onChildChanged, onChildRemoved, onValue, remove } from "firebase/database";

import { initializeApp } from "firebase/app";

// Connect to the firebase app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};
initializeApp(firebaseConfig);

let uid = undefined;
let authAttempted = false;

// let rootRef = {};
let rootRefString = undefined;
let db = undefined;

// let password_override = "";
// let hidecontrols = false;
// let forceShrink = false;
// let roomid = location.pathname.replace(/\/$/, "").split("/").pop().toLowerCase();
// let urlquery = location.search.replace(/\/$/, "").split("?").pop().toLowerCase().split("&");

// Log the user in anonymously
export const initFirebase = (roomid, setTrackerState) => {
  const auth = getAuth();

  // signInAnonymously(auth).catch((error) => {
  //   console.log(error);
  // });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Connected to firebase")
      uid = user.uid;
      db = getDatabase();
      rootRefString = `games/${roomid}`;
      initFirebaseTracking(setTrackerState);
    } else {
      console.log("Auth state not logged in");
      if(authAttempted) return;
      authAttempted = true;
      signInAnonymously(auth).catch(function(error) {
          console.log(error);
      });
    }
  });
};

export const setFirebaseState = (trackerState) => {
  set(ref(db, `${rootRefString}/gameState`), trackerState);
}


export const firebaseRemoveRef = (item) => {
  console.log("Removing", item)
  remove(ref(db, `${rootRefString}/gameState/${item}`));
}

export const firebaseChangeRef = (item, value) => {
  console.log("Setting", item, value);
  set(ref(db, `${rootRefString}/gameState/${item}`), value);
}

export const firebaseResetDb = () => {
  set(ref(db, `${rootRefString}/gameState`), {});
}


export const firebaseChangeParentRef = (newState) => {
  console.log("Chaning the parent ref");
  set(ref(db, `${rootRefString}/gameState`), newState);
}


// Set up event tracking
export const initFirebaseTracking = (setTrackerState) => {
  let initialized = null;
  console.log("Setting up listeners")

  const stateRef = ref(db, rootRefString);
  onChildAdded(stateRef, (data) => {
    setTrackerState(data.val());
  });

  onChildChanged(stateRef, (data) => {
    setTrackerState(data.val());
  });

  onChildRemoved(stateRef, (data) => {
    setTrackerState({});
  });

  // child owner
  const ownerRef = ref(db, `${rootRefString}/owner`);
  onValue(ownerRef, (data) => {
    initialized = !!data.val();    
  })

  // rootRef.child('owner').on('value', function (data) {
  //   initialized = !!data.val();
  //   document.getElementById('notInitialized').hidden = initialized;
  //   document.getElementById('setPasscode').innerText = initialized ? 'Enter passcode' : 'Initialize room w/passcode';
  //   document.getElementById('ownerControls').hidden = !(initialized && (data.val() === uid));
  // });


  // setTimeout(() => {
  //   if (password_override === "") {
  //     return;
  //   }

  //   console.log("Override password set, handle it");
  //   if (initialized == false) {
  //     //create room
  //     set_password(password_override);
  //   } else {
  //     //add to editors if room already exists
  //     rootRef.child('editors').child(uid).set(password_override, function(error) {
  //       if(error) {
  //         console.log("Did not add to editors on page load");
  //         console.log(error);
  //       } else {
  //         console.log("Added to editors successfully due password set in url");
  //       }
  //     });
  //   }

  //   if (forceShrink) {
  //     rootRef.child("config").child("is_small").set(true);
  //   }

  // }, 2500); //small timeout to catch potential firebase delay
};