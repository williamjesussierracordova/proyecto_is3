import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVCL8uTrf64-1yfGwD0qZ-3WdBTXugb3Y",
  authDomain: "medicalcenter-e3b86.firebaseapp.com",
  databaseURL: "https://medicalcenter-e3b86-default-rtdb.firebaseio.com",
  projectId: "medicalcenter-e3b86",
  storageBucket: "medicalcenter-e3b86.appspot.com",
  messagingSenderId: "350222302298",
  appId: "1:350222302298:web:82ece29a96b470dd806c63",
  measurementId: "G-ZCTZER0B7N"
};

let app;
let db;
let auth;
let analytics;
let storage;

export function initializeFirebase() {
  if (!app) {
    try{
      app = initializeApp(firebaseConfig);
      db = getDatabase(app);
      auth = getAuth(app);
      storage = getStorage(app);
    }
     catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }
  return { app, db, auth, analytics };
}

export function getFirebaseDb() {
  if (!db) {
    initializeFirebase();
  }
  return db;
}

export function getFirebaseAuth() {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
}

export function getFirebaseStorage() {
  if (!storage) {
    initializeFirebase();
  }
  return storage;
}