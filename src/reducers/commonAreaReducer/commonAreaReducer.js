import {ADD_COMMON_AREA,GET_COMMON_AREA,DELETE_AREA_IDS,DELETE_AREA,GET_MACHINES} from '../../actionCreators/index';

export default function(state={}, action) {

    switch(action.type){
        case ADD_COMMON_AREA:
            return {...state, addAreas: action.payload}
        
        case GET_MACHINES:
            return {...state, getMachines: action.payload}
        
        case GET_COMMON_AREA:
            return {...state, getAreas: action.payload}

        case DELETE_AREA:
            return {...state, deleteAreas: action.payload}

        case DELETE_AREA_IDS:
            return {...state, deleteAllAreas: action.payload}

        default:
            return state;
    
    }
    

}