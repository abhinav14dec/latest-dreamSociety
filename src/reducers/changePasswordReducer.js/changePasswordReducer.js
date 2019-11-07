import {CHANGE_PASSWORD} from  '../../actionCreators/index';
export default function(state={},action){
  
    switch(action.type){
    case CHANGE_PASSWORD:
    return {  ...state, password: action.payload};

    default:
    return state;
}
}
