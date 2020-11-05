import { database } from 'firebase';
import React from 'react';
import firebaseApp from "../firebaseConnection/firebase";

const GoogleFormData = async () => {
    const impDatabase = firebaseApp.database();
    let dataArray = [];
    const db = impDatabase.ref("1jIr0RVcDy9q-wbXIWJ7gRFLTDOmbJ7QW4oo_VbhyngI/Firebase data");
    await db.once('value').then((snapshot) => {
        snapshot.forEach((child) => {
            if (child.exists) {
                dataArray.push({
                    name: child.val().name,
                    uuid: child.val().uuid,
                    activity: child.val().activity,
                    date: child.val().date,
                    time: child.val().time,
                    qr: child.val().qr_code_link
                })
            }
        })
    });
    return dataArray;
}

export default GoogleFormData;