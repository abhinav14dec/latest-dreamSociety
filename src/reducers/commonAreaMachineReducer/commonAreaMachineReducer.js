import {ADD_COMMON_AREA_MACHINE,GET_COMMON_AREA_MACHINE,UPDATE_AREAS_MACHINE,DELETE_AREA_MACHINE,DELETE_AREA_MACHINE_IDS} from '../../actionCreators/index';

export default function(state={}, action) {

    switch(action.type){
        case ADD_COMMON_AREA_MACHINE:
            return {...state, addMachineAreas: action.payload}
        
        case GET_COMMON_AREA_MACHINE:
            return {...state, getMachineAreas: action.payload}

        case UPDATE_AREAS_MACHINE:
            return {...state, updateMachineAreas: action.payload}

        case DELETE_AREA_MACHINE:
            return {...state, deleteMachineAreas: action.payload}

        case DELETE_AREA_MACHINE_IDS:
            return {...state, deleteAllMachineAreas: action.payload}

        default:
            return state;
    
    }
    

}