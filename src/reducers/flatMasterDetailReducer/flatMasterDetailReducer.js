import {FETCH_DETAILS,FETCH_DROP,ADD_DETAILS,FETCH_SIZE_DROP,GET_ACTIVE_PAGE,GET_COUNT_PAGE,
    GET_TOTAL_ITEMS} from '../../actionCreators/index';
export default function(state={},action){

    switch(action.type){
        case ADD_DETAILS:
            return{...state,list:action.payload}
        case FETCH_DETAILS:
            return{...state,list1:action.payload}
        case FETCH_DROP:
            return{...state,list2:action.payload}
        case FETCH_SIZE_DROP:
            return{...state,list3:action.payload}
        case GET_ACTIVE_PAGE:
            return{...state,list1:action.payload}
        case GET_COUNT_PAGE:    
            return{...state,list1:action.payload}
        case GET_TOTAL_ITEMS:    
            return{...state,totalItems:action.payload}
           
        default:
            return state;
    }

}