import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_SOCIETY_EVENTS,GET_SOCIETY_EVENTS,UPDATE_SOCIETY_EVENTS ,DELETE_SOCIETY_EVENT,DELETE_EVENTS_IDS} from '../actionCreators/index';


export function addSocietyEvents( values){
     const request = axios.post(`${URN}/createEventBooking` , values , {headers:authHeader()})
      .then(response => response.data)
   
      return{
  
        type:ADD_SOCIETY_EVENTS,
        payload:request
      }
  
  }

  export function getSocietyEvents(){
    
    const request =axios.get(`${URN}/getEventBookings`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_SOCIETY_EVENTS,
        payload:request
    }
}

export function updateSocietyEvents(societyEventBookId,eventId,eventName,organisedBy,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description ,breakfast,lunch,eveningSnacks,dinner,dj,drinks){

  const request = axios.put(`${URN}/updateEventBookings/`+societyEventBookId,{eventId,eventName,organisedBy,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description,breakfast,lunch,eveningSnacks,dinner,dj,drinks },{headers:authHeader()})
  .then()
  return{
      type:UPDATE_SOCIETY_EVENTS,
      payload:request
  }
}

export function deleteEvents(societyEventBookId,isActive){
  console.log(societyEventBookId)
    const request = axios.put(`${URN}/deleteEventBooking/`+societyEventBookId,{isActive}, {headers:authHeader()})
     .then()     
     return{
 
         type:DELETE_SOCIETY_EVENT,
         payload: request 
     }
}

export function deleteSelectedEvent(ids){
  const request= axios.put(`${URN}/deleteEventBooking/deleteSelected`,{ids},{headers:authHeader()})
  .then((response) => response.data)
  .then(() => this.getSocietyEvents());

  return{
      type:DELETE_EVENTS_IDS,
      payload:request
  }
}
