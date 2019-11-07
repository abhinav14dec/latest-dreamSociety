import {GET_ROLES1,GET_ACTIVE_LIST,GET_DEACTIVE_LIST} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case GET_ROLES1:
         return{...state, roles:action.payload}
         case GET_ACTIVE_LIST:
         return{...state, roles1:action.payload}
         case GET_DEACTIVE_LIST:
         return{...state, roles2:action.payload}
         default:
         return state;
    }
}