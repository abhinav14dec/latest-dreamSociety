import {GET_OWNER_ACCESS_DATA } from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case GET_OWNER_ACCESS_DATA:
    return {  ...state, ownerAccess: action.payload};

 

    default:
        return state;
    }
}





