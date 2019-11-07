import {REGISTER_COMPLAINT, USER_FLAT_DETAILS,POST_REGISTER_COMPLAINT,SERVICE_DETAILS, GET_REGISTER_DETAIL,COMPLAINT_CANCELLED,COMPLAINT_FEEDBACK, COMPLAINT_ALL_DELETED} from  '../../actionCreators/index';
export default function(state={},action){
  
    switch(action.type){
    case REGISTER_COMPLAINT:
    return {  ...state, register: action.payload};

    case USER_FLAT_DETAILS:
    return {  ...state, userFlat: action.payload};

    case POST_REGISTER_COMPLAINT:
    return {  ...state, postComplaint: action.payload};

    case SERVICE_DETAILS:
    return {...state, item: action.payload}

    case GET_REGISTER_DETAIL:
    return {...state, getComplaints: action.payload}

    case COMPLAINT_CANCELLED:
    return {...state, cancelComplaints: action.payload}

    case COMPLAINT_FEEDBACK:
    return {...state, complaintsFeedback: action.payload}

    case COMPLAINT_ALL_DELETED:
    return {...state, allDeletedComplaint: action.payload}
    

    default:
    return state;
}
}
