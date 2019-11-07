import {ADD_RELATION, GET_RELATION} from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case ADD_RELATION:
    return {  ...state, addRelation: action.payload};

    case GET_RELATION:
    return {...state, relationResult: action.payload}



    default:
        return state;
    }
}

