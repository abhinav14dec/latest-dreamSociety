import axios from 'axios';
import {authHeader} from '../helper/authHeader';
import {URN,GUEST_DETAILS_FOR_EVENT,VIEW_INVITATION_LIST} from '../actionCreators/index'

export function guestDetails(data){
     return dispatch=>{
         dispatch({type:GUEST_DETAILS_FOR_EVENT,payload:data})
     }
 
 }
 
 export function getInvitationList(){
    return dispatch=>{
      axios
      .get(`${URN}/event/booking`,{headers:authHeader()})
      .then(response=>{
        dispatch({type:VIEW_INVITATION_LIST,payload:response.data})
      })
    }
  }
