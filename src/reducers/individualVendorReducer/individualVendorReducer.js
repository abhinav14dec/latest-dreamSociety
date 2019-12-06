import {ADD_VENDOR,GET_INDIVIDUAL_VENDOR, DELETE_INDIVIDUAL_VENDOR, DELETE_SELECT_INDIVIDUAL_VENDOR, UPDATE_INDIVIDUAL_VENDOR,GET_INDIVIDUAL_SERVICEID,GET_INDIVIDUAL_DATA,ADD_VENDOR_BOOKING,GET_VENDOR_BOOKING,
    GET_INDIVIDUAL_VENDOR_BOOKING_REQUEST,GET_TIME_SLOT} from  '../../actionCreators/index';
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
    
    case GET_INDIVIDUAL_DATA:
    return { ...state, getVendorBooking: action.payload};

    case ADD_VENDOR_BOOKING:
    return { ...state, addVendorBooking: action.payload};

    case GET_VENDOR_BOOKING:
    return { ...state, vendorBooking: action.payload};

    case GET_INDIVIDUAL_VENDOR_BOOKING_REQUEST:
    return { ...state, vendorBookingRequest: action.payload};
    
    case GET_TIME_SLOT:
            return { ...state, timeSlot: action.payload};

    default:
    return state;
}
}
