import {ADD_INVENTORY,GET_INVENTORY,UPDATE_INVENTORY,REMOVE_INVENTORY,GET_INVENTORY_LIST} from '../../actionCreators/index';

export default function(state={},action){
    switch(action.type){
        case ADD_INVENTORY:
        return {...state,addInventory:action.payload}
        case GET_INVENTORY :
        return {...state,getInventory:action.payload}
        case UPDATE_INVENTORY :
        return {...state,update:action.payload}
        case REMOVE_INVENTORY :
        return {...state,delete:action.payload}
        case GET_INVENTORY_LIST:
        return {...state,inventoryList:action.payload}
        default :
        return state;
    }

}