import { FETCH_EXPENSE_VIA_FLAT,CALCULATE_ELECTRICITY_EXPENSE,GET_ELECT_EXPENSE_DETAIL,FILTER_VIA_DATE } from '../../actionCreators/index';

export default function(state=[],action){
    switch(action.type){
        case FETCH_EXPENSE_VIA_FLAT:
            return {...state, getExpenseDetail:action.payload}
        case CALCULATE_ELECTRICITY_EXPENSE:
            return {...state, getCharges:action.payload}
        case GET_ELECT_EXPENSE_DETAIL:
            return {...state, getMonthlyElectricityExpense:action.payload}
        case FILTER_VIA_DATE:
            return {...state, filtered:action.payload}
        default:
            return state;
    }
}