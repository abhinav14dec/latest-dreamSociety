
import {ADD_EMPLOYEE,GET_EMPLOYEE_TYPE,GET_EMPLOYEE_WORK_TYPE, GET_EMPLOYEE} from '../../actionCreators/index';

export default function(state={},action){

switch(action.type){
case GET_EMPLOYEE_TYPE:return{
    ...state,employeeType:action.payload
}
case GET_EMPLOYEE_WORK_TYPE:return{
    ...state,employeeWorkType:action.payload
}
case ADD_EMPLOYEE :return{
    ...state,AddEmployee :action.payload
}
case GET_EMPLOYEE:return{
    ...state,getEmployee :action.payload
}
default :
return state
}

}