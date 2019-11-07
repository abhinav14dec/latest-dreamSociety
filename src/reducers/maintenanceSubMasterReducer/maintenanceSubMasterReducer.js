import { GET_SUB_MAINTENANCE,GET_SUB_MAINTENANCE_DETAILS, GET_MAINTENANCE_TYPE } from '../../actionCreators/index';

export default function(state=[], action){
    switch(action.type){
        case GET_SUB_MAINTENANCE:
            return {...state, size: action.payload}
        case GET_SUB_MAINTENANCE_DETAILS:
            return {...state, sizeDetails: action.payload}
        case GET_MAINTENANCE_TYPE:
            return {...state, maintenanceType: action.payload}
        default:
            return state;
    }
}

