import {RESET_PASSWORD,CLEAR_MESSAGE} from '../../actionCreators/index';
export default function(state=[],action){


    switch(action.type){
        case RESET_PASSWORD:
          return{...state, message:action.payload}
        case CLEAR_MESSAGE:
          return{...state, message:''}
        default:
            return state;
    }
}