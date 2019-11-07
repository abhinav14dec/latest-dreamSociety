import axios from 'axios';
import { URN, ADD_PERSONAL_EVENT, GET_PERSONALEVENTS,PERSONAL_EVENT_SPACE_DETAILS,GET_PERSONAL_BOOKING,DELETE_PERSONAL_BOOKING,DELETE_SELECTED_PERSONAL_BOOKING,UPDATE_PERSONAL_BOOKING } from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';




export const addEventBooking=(values)=>{
  console.log(values)
   const request = axios.post(`${URN}/societyMemberEventBooking/tenantOrOwner` , values , {headers:authHeader()})
    .then(response => response.data)
 

    
    return{

        type:ADD_PERSONAL_EVENT,
        payload: request 
    }

}

export const  getMemberEvent=()=>{
  
    const request = axios.get(`${URN}/societyMemberEvent/tenantOrOwner`  , {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:GET_PERSONALEVENTS,
         payload: request 
     }
 
 }

 export  function getEventDetails(){
 
    const request = axios.get(`${URN}/eventSpaceMaster/tenantOrOwner`,{headers:authHeader()})
    .then(response => response.data)
    .then(console.log(request));
   
    return{

         type:PERSONAL_EVENT_SPACE_DETAILS,
         payload: request 
    }

}

export const getEventBooking=()=>{
  
    const request = axios.get(`${URN}/societyMemberEventBooking/user`, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:GET_PERSONAL_BOOKING,
         payload: request 
     }
 
 }


export const deleteEventBooking=(societyMemberEventBookingId)=>{
    const data={
        societyMemberEventBookingId,
        isActive:false
    }
    const request = axios.put(`${URN}/societyMemberEventBooking/tenantOrOwner/delete/${societyMemberEventBookingId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_PERSONAL_BOOKING,
         payload: request 
     }
 
 }

 export const deleteSelectEventBooking=(ids)=>{
    
    const request = axios.put(`${URN}/societyMemberEventBooking/tenantOrOwner/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECTED_PERSONAL_BOOKING,
         payload: request 
     }
 
 }

 export const updateEventBooking=(societyMemberEventBookingId, societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId)=>{
    console.log(societyMemberEventBookingId, societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId)
    const request = axios.put(`${URN}/societyMemberEventBooking/tenantOrOwner/`+ societyMemberEventBookingId ,{societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_PERSONAL_BOOKING,
         payload: request
     }
 
 }




