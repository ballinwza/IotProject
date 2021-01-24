const initState = {
    updateError : null
}
const patientReducer = (state = initState,action) =>{
    switch(action.type){
        case 'UPDATE_ERROR':
            return {
                ...state,
                updateError: 'Update failed'
            }
        case 'UPDATE_SUCCESS' :
            return{
                ...state,
                updateError:null
            }
        default:
            return state
    }
}

export default patientReducer