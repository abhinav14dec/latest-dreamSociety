import { ADD_USER, GET_USERS, GET_ROLES } from '../../actionCreators/index';

export default function(state=[], action) {
    switch(action.type){
        case ADD_USER:
            return {...state, users: action.payload}
        case GET_USERS:
            return {...state, user: action.payload}
        case GET_ROLES:
            return {...state, userRole: action.payload}
        
        default:
            return state;
    }

}