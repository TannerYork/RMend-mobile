import firebase from 'firebase';
import '@firebase/firestore';
import { FIREBASE_DEV_CONFIG } from './keys';

export const firebaseApp = firebase.initializeApp(FIREBASE_DEV_CONFIG);

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        return { result: true }
    } catch(err) {
        return { error: err.message };
    }
}

export const signOut = () => {
    firebaseApp.auth().signOut();
}

export const createUserWithEmailAndPassword = async (email, password, userName) => {
    try {
        const user = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
        await user.user.updateProfile({ displayName: userName });
        await firestore.collection('users').doc(user.user.uid).update({ displayName: userName });
        return { result: true }
    } catch(err) {
        return { error: err.message };
    }
}

