import {MATCH_USER,CLEAR_MESSAGE} from '../../actionCreators/index';
export default function(state=[],action){


    switch(action.type){
        case MATCH_USER:
          return{...state, message:action.payload}
        case CLEAR_MESSAGE:
          return{...state, message:''}
        default:
            return state;
    }
}