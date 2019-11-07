import {ADD_VENDOR,GET_INDIVIDUAL_VENDOR, DELETE_INDIVIDUAL_VENDOR, DELETE_SELECT_INDIVIDUAL_VENDOR, UPDATE_INDIVIDUAL_VENDOR,GET_INDIVIDUAL_SERVICEID} from  '../../actionCreators/index';
export default function(state={},action){
  
    switch(action.type){
    case ADD_VENDOR:
    return {  ...state, postVendor: action.payload};

    case GET_INDIVIDUAL_VENDOR:
    return { ...state, getVendor: action.payload};

    case DELETE_INDIVIDUAL_VENDOR:
    return { ...state, deleteVendor: action.payload};

    case DELETE_SELECT_INDIVIDUAL_VENDOR:
    return { ...state, allSelectedVendor: action.payload};

    case UPDATE_INDIVIDUAL_VENDOR:
    return { ...state, updateVendor: action.payload};

    case GET_INDIVIDUAL_SERVICEID:
    return { ...state, getServiceVendor: action.payload};

    default:
    return state;
}
}
