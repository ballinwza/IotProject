const initState = {
    name:null,
    gender:null,
    date:null,
    time:null,
    activity:null,
    uuid:null,
    updateError : null
}
const patientReducer = (state = initState,action) =>{
    switch(action.type){
        case 'UPDATE_ERROR':
            return {
                ...state,
                ...action.payload,
                updateError: 'Update failed'
            }
        case 'UPDATE_SUCCESS' :
            return{
                ...state,
                ...action.payload,
                updateError:null
            }
        default:
            return state
    }
}

export default patientReducer