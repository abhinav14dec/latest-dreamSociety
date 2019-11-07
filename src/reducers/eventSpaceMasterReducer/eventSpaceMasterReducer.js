import {FETCH_EVENT_SPACE_DETAILS, DELETE_MULTIPLE_EVENT_SPACE_MASTER_DETAILS,UPDATE_EVENT_SPACE} from '../../actionCreators/index';
export default function(state={},action){

    switch(action.type){
       
        case FETCH_EVENT_SPACE_DETAILS:
            return{...state,space:action.payload}   
        case DELETE_MULTIPLE_EVENT_SPACE_MASTER_DETAILS:
            return{...state,delete:action.payload}   
        case UPDATE_EVENT_SPACE:
            return{...state,delete:action.payload} 
        default:
            return state;
    }

}