import {ADD_MEMBEREVENTS, GET_MEMBEREVENTS } from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case ADD_MEMBEREVENTS:
    return {  ...state, addMemberEvents: action.payload};

    case GET_MEMBEREVENTS:
    return {...state, memberEventsResult: action.payload}




    default:
        return state;
    }
}





