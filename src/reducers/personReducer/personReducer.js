import {GET_TOWER,GET_FLAT, GET_ROLES,ADD_PERSON,GET_PERSON} from '../../actionCreators/index'


export default  function(state=[],action){
    switch(action.type){
        case GET_TOWER: 
        return{ ...state , get:action.payload}
        case GET_FLAT:
        return{...state,flat1:action.payload}
        case GET_ROLES:
        return{
            ...state,roles:action.payload
        }
        case ADD_PERSON:
            return{...state,person:action.payload}
            case GET_PERSON:
            return{...state,person1:action.payload}
        default :
         return state
    }
}