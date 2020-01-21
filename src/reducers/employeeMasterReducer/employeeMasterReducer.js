import {ADD_EMP,GET_EMP,GET_LOCATION_DETAIL,GET_DASHBOARD_EMPLOYEE,POST_EMP_SALARY_DETAIL} from '../../actionCreators/index'

  export default function(state={}, action){
      switch(action.type){

          case ADD_EMP:
          return {...state,employee:action.payload}
          case GET_EMP:
          return {...state,getEmployee:action.payload}
          case GET_DASHBOARD_EMPLOYEE:
          return{...state,getDashboardEmployee:action.payload}
           
          case GET_LOCATION_DETAIL:
          return {  ...state, locationResult: action.payload};

          case POST_EMP_SALARY_DETAIL:
          return {  ...state, postEmpSal: action.payload};
          
           default: 
           return state;
      }
  }