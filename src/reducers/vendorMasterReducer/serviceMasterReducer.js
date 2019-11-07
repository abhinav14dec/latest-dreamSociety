import {GET_DETAIL,ADD_SERVICE,DELETE_SERVICE_IDS,DELETE_SERVICE,UPDATE_SERVICES} from '../../actionCreators/index';

export default function(state={}, action) {

    switch(action.type){
        case ADD_SERVICE:
            return {...state, services: action.payload}
        
        case DELETE_SERVICE_IDS:
            return{...state, delete: action.payload}
        
        case GET_DETAIL:
            return{...state,detail: action.payload}

        case DELETE_SERVICE:
            return{...state,deleteService: action.payload}
        
        case UPDATE_SERVICES:
            return{...state,update:action.payload}
            
        default:
            return state;
    
    }
    

}