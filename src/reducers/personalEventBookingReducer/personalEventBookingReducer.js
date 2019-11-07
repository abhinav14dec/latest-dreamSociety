import {ADD_PERSONAL_EVENT, GET_PERSONALEVENTS, PERSONAL_EVENT_SPACE_DETAILS,GET_PERSONAL_BOOKING,DELETE_PERSONAL_BOOKING,DELETE_SELECTED_PERSONAL_BOOKING,UPDATE_PERSONAL_BOOKING} from '../../actionCreators/index'


export default  function(state=[],action){
    switch(action.type){
        case ADD_PERSONAL_EVENT: 
        return{ ...state , addEventBooking:action.payload}

        case GET_PERSONALEVENTS:
        return {...state, eventsResult: action.payload}

        case PERSONAL_EVENT_SPACE_DETAILS:
            return{...state,space:action.payload}  

        
        case GET_PERSONAL_BOOKING:
        return {...state, memberEventsResult: action.payload};
    
     
       
        default :
         return state
    }
}