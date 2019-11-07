import {ADD_SOCIETY_EVENTS,GET_SOCIETY_EVENTS,UPDATE_SOCIETY_EVENTS,DELETE_SOCIETY_EVENT,DELETE_EVENTS_IDS} from '../../actionCreators/index';


export default function(state={}, action) {

    switch(action.type){
        case ADD_SOCIETY_EVENTS:
            return {...state, addSocietyEvents: action.payload}
            
        case GET_SOCIETY_EVENTS:
            return {...state, societyEvents: action.payload}
            
        case UPDATE_SOCIETY_EVENTS:
             return {...state, updateSociety: action.payload}
        
        case DELETE_SOCIETY_EVENT:
             return {...state, deleteSociety: action.payload}

        case DELETE_EVENTS_IDS:
             return {...state, deleteAllSociety: action.payload}
            default:
            return state;
    
    }
    

}