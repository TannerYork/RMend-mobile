import firebase from 'firebase';
import '@firebase/firestore';
import { FIREBASE_DEV_CONFIG } from './keys';

export const firebaseApp = firebase.initializeApp(FIREBASE_DEV_CONFIG);

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        return { result: true }
    } catch(err) {
        alert(err.message);
        return { error: err.message };
    }
}

export const signOut = () => {
    firebaseApp.auth().signOut();
}

export const createUserWithEmailAndPassword = async (email, password) => {
    try {
        await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
        return { result: true }
    } catch(err) {
        return { error: err.message };
    }
}

