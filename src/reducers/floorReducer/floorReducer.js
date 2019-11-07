import {GET_FLOOR,GET_FLOOR_TOWER} from '../../actionCreators/index';

export default function(state=[],action){
    switch(action.type){
        case GET_FLOOR:
        return {...state, floor: action.payload}
        case GET_FLOOR_TOWER:
        return {...state,floorDetails:action.payload}
        default:{
        return state;
        }
    }
}