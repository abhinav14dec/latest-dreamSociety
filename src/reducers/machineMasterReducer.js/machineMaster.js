import {GET_MACHINE,ADD_MACHINE,GET_MACHINE_ACTUAL_ID} from '../../actionCreators/index'


export default  function(state=[],action){
    switch(action.type){
      
        case ADD_MACHINE:
            return{...state, Add_machine:action.payload}
            case GET_MACHINE:
            return{...state,machine:action.payload}
            case GET_MACHINE_ACTUAL_ID:
            return{...state,machine1:action.payload}
        default :
         return state
    }
}