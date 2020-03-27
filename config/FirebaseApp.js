import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/functions';
import { FIREBASE_DEV_CONFIG } from './keys';

export const firebaseApp = firebase.initializeApp(FIREBASE_DEV_CONFIG);

export const createUserWithEmailAndPassword = async (email, password, userName) => {
    try {
        const user = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
        await user.user.updateProfile({ displayName: userName });
        await firestore
            .collection('users')
            .doc(user.user.uid)
            .update({ displayName: userName });
        return { result: true };
    } catch (err) {
        return { error: err.message };
    }
};

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        return { result: true };
    } catch (err) {
        return { error: err.message };
    }
};

export const signOut = () => {
    firebaseApp.auth().signOut();
};

async function getBlobAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    return blob;
}

export const updateProfile = async ({ displayName, email, authCode }, shouldUpdateAuthCode) => {
    const { currentUser } = firebaseApp.auth();
    try {
        await currentUser.updateProfile({ displayName });
        await currentUser.updateEmail(email);
        if (shouldUpdateAuthCode) {
            await updateAuthCode(authCode);
        }

        const user = await firebaseApp
            .firestore()
            .collection('users')
            .doc(currentUser.uid);

        if (user) {
            await user.update({ displayName, email, authCode });
        }
    } catch (error) {
        console.log(error);
    }
};

export const createReport = async ({
    images,
    details,
    senderInfo,
    location: { latitude, longitude },
    authority: { authCode, name, type }
}) => {
    const date = new Date();
    const timestamp = date.toDateString();
    const data = {
        location: { latitude, longitude },
        timestamp: timestamp,
        details: { ...details, authority: name },
        senderInfo,
        authCode
    };

    try {
        const messageRef = await firebaseApp
            .firestore()
            .collection('reports')
            .add(data);
        for (var i = 0; i < images.length; i++) {
            // Upload images to Cloud Storage
            const blob = await getBlobAsync(images[i]);
            const filePath = `reports/${messageRef.id}/${messageRef.id}-initial-${i}`;
            const fileSnapshot = await firebaseApp
                .storage()
                .ref(filePath)
                .put(blob);
            blob.close();

            // Generate a public URL for the file
            const url = await fileSnapshot.ref.getDownloadURL();
            // Update the chat message placeholder with the real image
            messageRef.update({
                id: messageRef.id,
                images: firebase.firestore.FieldValue.arrayUnion({
                    id: messageRef.id,
                    imageUrl: url,
                    imageUri: fileSnapshot.metadata.fullPath
                })
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateAuthCode = async newAuthCode => {
    const updateUserAuthCode = await firebaseApp.functions().httpsCallable('updateUserAuthCode');
    const results = await updateUserAuthCode({ authCode: newAuthCode });
    if (results.error) {
        console.log(results.error.message, results.error.stack);
        alert(results.error.message);
    }
};

export const makeAdminFrom = async userId => {
    const makeUserAdmin = await firebaseApp.functions().httpsCallable('makeUserAdmin');
    const results = await makeUserAdmin({ userId });
    if (results.error) {
        console.log(results.error.message, results.error.stack);
        alert(results.error.message);
    } else {
        alert(results.result);
    }
};

export const getIssueGroups = async county => {
    try {
        const querySnapshot = await firebaseApp
            .firestore()
            .collection('counties')
            .doc(county)
            .collection('issue-groups')
            .get();
        issueGroups = [];
        querySnapshot.forEach(doc => {
            issueGroups.push(doc.data());
        });
        return issueGroups;
    } catch (error) {
        console.log(error);
        return [];
    }
};
