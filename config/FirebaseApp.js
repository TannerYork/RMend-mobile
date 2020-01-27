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

export const createReport = async (location, details, magisterialDistrict, priority) => {
    const date = new Date();
    const timestamp = date.toDateString();
    const data = {
        sender: firebaseApp.auth().currentUser.displayName,
        timestamp: timestamp,
        location: location,
        details: details,
        magisterialDistrict: magisterialDistrict,
        priority: priority,
        isBeingReviewed: false
    };

    try {
        const messageRef = await firestore.collection('reports').add(data);
        const photos = photos
        for (var i = 0; i < photos.length; i++) {
            // Upload images to Cloud Storage
            const filePath = `reports/${messageRef.id}/${messageRef.id}-initial-${i}`;
            const fileSnapshot = await storage.ref(filePath).put(photos[i]);
            
            // Generate a public URL for the file
            const url = await fileSnapshot.ref.getDownloadURL();
            // Update the chat message placeholder with the real image
            messageRef.update({
                id: messageRef.id, 
                photos: firebase.firestore.FieldValue.arrayUnion({
                    id: messageRef.id, 
                    imageUrl: url, 
                    imageUri: fileSnapshot.metadata.fullPath
                })
            });
        }
    } catch(error) { alert(error) }
}

