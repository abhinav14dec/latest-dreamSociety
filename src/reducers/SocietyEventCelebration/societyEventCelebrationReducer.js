import {PAYMENT_DATA,GET_CARD} from '../../actionCreators';
export default function(state={},action){
    switch(action.type){
        case PAYMENT_DATA:
         return {...state, paymentData:action.payload}
        case GET_CARD:
            return {...state, getCard:action.payload}
         
         default:
         return state;
    }
}