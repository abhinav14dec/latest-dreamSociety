import { GET_BOARD_MEMBER_DESIGNATION_DETAIL, GET_BOARD_MEMBER_DETAILS,GET_BOARD_ID } from '../../actionCreators/index';

export default function(state=[], action) {
    switch(action.type){
        case GET_BOARD_MEMBER_DESIGNATION_DETAIL:
            return {...state, designation: action.payload}
        case GET_BOARD_MEMBER_DETAILS:
            return {...state, memberDetails: action.payload}
            case GET_BOARD_ID:
            return {...state, boardId: action.payload}
        default: return state;
    }
}