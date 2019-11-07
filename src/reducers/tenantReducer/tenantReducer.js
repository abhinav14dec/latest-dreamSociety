import {GET_OWNER_DETAIL_VIA_FLATID,GET_FLAT_DETAIL_VIA_TOWERID, GET_TENANT_DETAIL, GET_TENANT_MEMBER_DETAILS,GET_FLATS,GET_RFID,DELETE_FLATS} from '../../actionCreators/index'
export default function(state=[], action){
    switch(action.type){
        case GET_TENANT_DETAIL:
            return {...state, getTenantDetail: action.payload}
        case GET_FLAT_DETAIL_VIA_TOWERID:
            return {...state, getFlatDetail: action.payload}
        case GET_OWNER_DETAIL_VIA_FLATID:
            return {...state, getOwnerDetail: action.payload}
        case GET_TENANT_MEMBER_DETAILS:
            return {...state, getMemberDetail: action.payload}
        case GET_FLATS:
            return {...state, getTenantFlats: action.payload}
        case DELETE_FLATS:
            return {...state, deletedFlats: action.payload}
        case GET_RFID:
            return {...state, getRFID: action.payload}
        default:
            return state;
    }
}