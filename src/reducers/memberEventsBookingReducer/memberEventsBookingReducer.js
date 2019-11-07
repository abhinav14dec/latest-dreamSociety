import {ADD_EVENT_BOOKING, GET_EVENT_BOOKING, GET_EVENT_SPACE_NAME } from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case ADD_EVENT_BOOKING:
    return {  ...state, addEventBooking: action.payload};

    case GET_EVENT_BOOKING:
    return {...state, memberEventsResult: action.payload};

    case GET_EVENT_SPACE_NAME:
    return {...state, spaceNameResult: action.payload}




    default:
        return state;
    }
}





