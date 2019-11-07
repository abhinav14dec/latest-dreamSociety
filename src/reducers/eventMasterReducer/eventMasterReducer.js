import {GET_EVENT,GET_EVENT_ORGANISER,ADD_EVENT} from '../../actionCreators/index';

 export default function (state={},action){
  switch(action.type){
      case GET_EVENT:  return{
          ...state, getEvent: action.payload
      }
      case GET_EVENT_ORGANISER: return{
          ...state, events :action.payload
      }
      case ADD_EVENT: return{
          ...state,add_event:action.payload
      }
      default : return state
      
  }
 }




//   }