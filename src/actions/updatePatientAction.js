const updateFirestore = (id,data,firebaseApp,dispatch) => {
    const firestore = firebaseApp.firestore();
    const database = firestore.collection("patients");
    return (dispatch, getState, {getFirebase}) =>{
        database.doc(id).update(data).then(()=> {
            console.log(id)
            console.log(data)
            console.log("Document successfully updated!");
            dispatch({type: "UPDATE_SUCCESS", payload:data});
        })
        .catch((error)=> {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            dispatch({type:'UPDATE_ERROR', error});
            
        })
    }
}
export default updateFirestore

