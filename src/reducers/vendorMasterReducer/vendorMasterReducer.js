import {ADD_VENDOR_MASTER,GET_VENDOR_MASTER,GET_RATE_TYPE,DELETE_VENDOR,UPDATE_VENDOR, DELETE_VENDOR_SERVICE_IDS, DELETE_VENDOR_SERVICES, DELETE_VENDOR_IDS,UPDATE_VENDOR_SERVICE} from '../../actionCreators/index';
import { stat } from 'fs';

export default function(state={}, action) {

    switch(action.type){
        case ADD_VENDOR_MASTER:
            return {...state, vendor: action.payload} 
            
        case GET_VENDOR_MASTER:
            return {...state, vendors: action.payload}
        
        case GET_RATE_TYPE:
            return {...state, rate: action.payload}    
            
        case DELETE_VENDOR:
            return {...state, delete: action.payload}    

        case UPDATE_VENDOR:
            return {...state, update: action.payload} 
        
        case UPDATE_VENDOR_SERVICE:
            return {...state, updateService: action.payload}

        case DELETE_VENDOR_IDS:
            return{...state,deleteAll:action.payload}
        
        case DELETE_VENDOR_SERVICE_IDS:
            return{...state, deleteAllServices: action.payload}

        case DELETE_VENDOR_SERVICES:
            return{...state, delete: action.payload}

        default:
            return state;
    
    }
    

}