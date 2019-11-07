import axios from 'axios';
import { URN, ADD_EVENT_BOOKING, GET_EVENT_BOOKING, DELETE_EVENT_BOOKING,UPDATE_EVENT_BOOKING, DELETE_SELECTED_EVENT_BOOKING, GET_EVENT_SPACE_NAME } from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';



export const addEventBooking=(values)=>{
  console.log("result", values)
   const request = axios.post(`${URN}/societyMemberEventBooking` , values , {headers:authHeader()})
    .then(response => response.data)
 

    
    return{

        type:ADD_EVENT_BOOKING,
        payload: request 
    }

}

export const getEventBooking=()=>{
  
   const request = axios.get(`${URN}/societyMemberEventBooking`, {headers:authHeader()})
    .then(response => response.data)

    
    return{

        type:GET_EVENT_BOOKING,
        payload: request 
    }

}

export const getSpaceName=()=>{
    
    const request = axios.get(`${URN}/eventSpaceMaster`, {headers:authHeader()})
     .then(response => console.log(response.data))
 
     
     return{
 
         type:GET_EVENT_SPACE_NAME,
         payload: request 
     }
 
 }

export const deleteEventBooking=(societyMemberEventBookingId)=>{
    const data={
        societyMemberEventBookingId,
        isActive:false
    }
    const request = axios.put(`${URN}/societyMemberEventBooking/delete/${societyMemberEventBookingId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_EVENT_BOOKING,
         payload: request 
     }
 
 }

 export const deleteSelectEventBooking=(ids)=>{
    
    const request = axios.put(`${URN}/societyMemberEventBooking/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECTED_EVENT_BOOKING,
         payload: request 
     }
 
 }

 export const updateEventBooking=(societyMemberEventBookingId, societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId)=>{
    console.log(societyMemberEventBookingId, societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId)
    const request = axios.put(`${URN}/societyMemberEventBooking/`+ societyMemberEventBookingId ,{societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_EVENT_BOOKING,
         payload: request
     }
 
 }

