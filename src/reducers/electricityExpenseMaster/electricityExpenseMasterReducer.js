import {DELETE_ELECTRICITY_EXPENSE,GET_FLOOR_OF_TOWER,GET_ELECTRICITY_EXPENSE,GET_RATE_FOR_ELECTRICITY } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch(action.type){
        case GET_FLOOR_OF_TOWER:
        return{
            ...state,floorDetails:action.payload
        }
        case GET_ELECTRICITY_EXPENSE:
        return{
            ...state,expenseDetail:action.payload
        }
        case GET_RATE_FOR_ELECTRICITY:
        return{
            ...state,rate:action.payload
        }
        case DELETE_ELECTRICITY_EXPENSE:
        return{
            ...state,expenseData:action.payload
        }

        default:
        return state
    }
}
