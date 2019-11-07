import axios from 'axios';
import { URN, ADD_MEMBEREVENTS, GET_MEMBEREVENTS, DELETE_MEMBEREVENTS,UPDATE_MEMBEREVENTS, DELETE_SELECTEDMEMBEREVENTS } from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';




export const addSocietyMemberEvents=(values)=>{
  console.log(values)
   const request = axios.post(`${URN}/societyMemberEvent` , values , {headers:authHeader()})
    .then(response => response.data)
 

    
    return{

        type:ADD_MEMBEREVENTS,
        payload: request 
    }

}

export const  getMemberEvent=()=>{
  
   const request = axios.get(`${URN}/societyMemberEvent`  , {headers:authHeader()})
    .then(response => response.data)

    
    return{

        type:GET_MEMBEREVENTS,
        payload: request 
    }

}

export const deleteMemberEvent=(societyMemberEventId)=>{
    const data={
        societyMemberEventId,
        isActive:false
    }
    const request = axios.put(`${URN}/societyMemberEvent/delete/${societyMemberEventId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_MEMBEREVENTS,
         payload: request 
     }
 
 }

 export const deleteSelectMemberEvent=(ids)=>{
    
    const request = axios.put(`${URN}/societyMemberEvent/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECTEDMEMBEREVENTS,
         payload: request 
     }
 
 }

 export const updateMemberEvent=(societyMemberEventId,societyMemberEventName)=>{
    
    const request = axios.put(`${URN}/societyMemberEvent/`+ societyMemberEventId ,{societyMemberEventName}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_MEMBEREVENTS,
         payload: request
     }
 
 }

