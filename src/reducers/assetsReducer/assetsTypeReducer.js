import {ADD_ASSETS_TYPE,GET_ASSETS_SUB,REMOVE_ASSETS_SUB,UPDATE_ASSETS_SUB,DELETE_MULTIPLE_ASSETS_SUB_LIST} from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){
        case ADD_ASSETS_TYPE:
        return {...state,addAssetsType:action.payload}
        case GET_ASSETS_SUB:
        return {...state, getAssetsType:action.payload}
        case REMOVE_ASSETS_SUB :
        return {...state, delete:action.payload}
        case UPDATE_ASSETS_SUB :
        return {...state, update:action.payload}
        case DELETE_MULTIPLE_ASSETS_SUB_LIST :
        return {...state, multiDelete:action.payload}
        default:
        return state;
    }
} 