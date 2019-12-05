import {GET_MAINTENANCE_BILL,GET_ELECTRICITY_BILL} from '../../actionCreators/index'


export default  function(state=[],action){
    switch(action.type){
      
        case GET_MAINTENANCE_BILL:
        return{...state, getMaintenanceBill:action.payload}

        case GET_ELECTRICITY_BILL:
        return{...state, getElectricityBill:action.payload}
            
        default :
         return state
    }
}