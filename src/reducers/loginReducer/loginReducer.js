import {USER_LOGIN} from '../../actionCreators/index'
export default function(state={}, action){
    switch(action.type){
        case USER_LOGIN:
            return {...state,error:action.payload};                                                                              
        default:
            return state;
    }
} 