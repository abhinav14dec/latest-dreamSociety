import {ADD_DESIGNATION, GET_DESIGNATION} from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case ADD_DESIGNATION:
    return {  ...state, addDesignation: action.payload};

    case GET_DESIGNATION:
    return {...state, designationResult: action.payload}
    default:
        return state;
    }
}

