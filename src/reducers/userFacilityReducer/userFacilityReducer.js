import {ADD_USER_FACILITY,GET_USER_FACILITY,NOT_IN_USE_FACILITY,UPDATE_USER_FACILITY} from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case ADD_USER_FACILITY:
    return {  ...state, postUserFacilty: action.payload};

    case GET_USER_FACILITY:
    return {  ...state, userFacilty: action.payload};

    
    case NOT_IN_USE_FACILITY:
    return {  ...state, getFacilityUser: action.payload};

    case UPDATE_USER_FACILITY:
    return {  ...state, updateFacility: action.payload};

   

    default:
        return state;
    }
}
