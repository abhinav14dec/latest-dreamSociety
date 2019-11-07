import {ADD_FACILITY,GET_FACILITY,UPDATE_FACILITY,DELETE_FACILITY_IDS,DELETE_FACILITY} from '../../actionCreators/index';


export default function(state={}, action) {

    switch(action.type){
        case ADD_FACILITY:
            return {...state, addFacility: action.payload}

        case GET_FACILITY:
            return {...state, getFacility: action.payload}

        case UPDATE_FACILITY:
                return {...state, updateFacility: action.payload}

        case DELETE_FACILITY_IDS:
                    return {...state, deleteAllFacility: action.payload}

        case DELETE_FACILITY:
                        return {...state, deleteFacility: action.payload}

            default:
            return state;
    
    }
    

}