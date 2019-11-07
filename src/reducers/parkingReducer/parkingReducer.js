import { FETCH_PARKING,FETCH_BASEMENT } from '../../actionCreators/index';

const INITIAL_STATE = {all:[], parking: null};

export default function(state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_BASEMENT:
            return {...state, all: action.payload.data}
        case FETCH_PARKING:
            return {...state, parking:action.payload.data}
        default:
            return state
    }
}