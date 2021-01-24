const updateFirestore = (id,data,firebaseApp,dispatch) => {
    const firestore = firebaseApp.firestore();
    const database = firestore.collection("patients");
    console.log("id:",id)
    console.log("data:",data)
    console.log(database.doc(id))
    return (dispatch, getState, {getFirebase}) =>{
        database.doc(id).update(data).then((dispatch)=> {
            console.log("Document successfully updated!");
            dispatch({type: "UPDATE_SUCCESS"});
        })
        .catch((error)=> {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            dispatch({type:'UPDATE_ERROR', error});
            
        })
    }
}
export default updateFirestore

