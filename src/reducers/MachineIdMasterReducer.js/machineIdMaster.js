import {GET_MACHINE_ID,ADD_MACHINE_ID} from '../../actionCreators/index'


export default  function(state=[],action){
    switch(action.type){
      
        case ADD_MACHINE_ID:
            return{...state, Add_machine_Id:action.payload}
            case GET_MACHINE_ID:
            return{...state,machine:action.payload}
        default :
         return state
    }
}