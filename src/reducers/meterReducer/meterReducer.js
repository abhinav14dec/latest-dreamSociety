import {GET_METER,GET_METER_DETAILS,UPDATE_MACHINE_DETAIL} from '../../actionCreators/index';
export default function(state={},action){


    switch(action.type){
        case GET_METER:
          return{...state, meterDetails:action.payload}
        case GET_METER_DETAILS:
          return{...state, meterMachineDetail:action.payload}
          case UPDATE_MACHINE_DETAIL:
            return{...state, meterMachineDetail:action.payload}
        default:
            return state;
    }
}