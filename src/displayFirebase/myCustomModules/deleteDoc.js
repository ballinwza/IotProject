import React from 'react';
import firebaseApp from '../firebaseConnection/firebase';


const deleteDoc = async function(collectionName, keyName, valueName) {
    const firestore = firebaseApp.firestore();
    const ref = await firestore.collection(collectionName).where(keyName, '==', valueName).get();
    ref.forEach(doc => {
        firestore.collection(collectionName).doc(doc.id).delete();
    })
}

export default deleteDoc;