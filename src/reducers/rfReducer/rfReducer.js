import { ADD_RF,GET_RF,GET_OWNER_RF} from '../../actionCreators/index';
export default function(state={},action){    
    switch(action.type){
        case ADD_RF:
        return {...state,addRF:action.payload}
        case GET_RF:
        return {...state,rfList:action.payload}

        case GET_OWNER_RF:
        return {...state, ownerRf:action.payload}

        default:
        return state;
    }
} 