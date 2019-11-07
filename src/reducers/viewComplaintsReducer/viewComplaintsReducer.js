import {GET_COMPLAINTS,REJECT_COMPLAINT,ACCEPT_COMPLAINT,SEND_COMPLAINT,COMPLAINT_COMPLETE,GET_FEEDBACK} from '../../actionCreators/index';

export default function(state={}, action) {

    switch(action.type){
        case GET_COMPLAINTS:
            return {...state, complaints: action.payload}

        case REJECT_COMPLAINT:
            return {...state, rejectComplaint: action.payload}

        case ACCEPT_COMPLAINT:
            return {...state, acceptComplaint: action.payload}   
             
        case SEND_COMPLAINT:
            return {...state, sendComplaint: action.payload}

        case COMPLAINT_COMPLETE:
            return {...state, complaintComplete: action.payload}

        case GET_FEEDBACK:
            return {...state, feedbackResult: action.payload}

            default:
            return state;
    
    }
    

}