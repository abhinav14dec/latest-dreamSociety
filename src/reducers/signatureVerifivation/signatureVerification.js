import {VERIFY_SIGNATURE} from '../../actionCreators';
export default function(state={},action){
    switch(action.type){
        case VERIFY_SIGNATURE:
         return {...state, verification:action.payload}
         default:
         return state;
    }
}