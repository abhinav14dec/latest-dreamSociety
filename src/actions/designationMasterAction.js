import axios from 'axios';
import { URN, ADD_DESIGNATION, GET_DESIGNATION, DELETE_DESIGNATION,UPDATE_DESIGNATION, DELETE_ALL_DESIGNATION } from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';




export const addDesignation=(values)=>{
  
   const request = axios.post(`${URN}/designation` , values , {headers:authHeader()})
    .then(response => response.data)
 

    
    return{

        type:ADD_DESIGNATION,
        payload: request 
    }

}

export const getDesignation=()=>{
  
   const request = axios.get(`${URN}/designation`  , {headers:authHeader()})
    .then(response => response.data)

    
    return{

        type:GET_DESIGNATION,
        payload: request 
    }

}

export const deleteDesignation=(designationId)=>{
    const data={
        designationId,
        isActive:false
    }
    const request = axios.put(`${URN}/designation/delete/${designationId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
         type:DELETE_DESIGNATION,
         payload: request 
     }
 }



 export const deleteSelectDesignation=(ids)=>{
   
    const request = axios.put(`${URN}/designation/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_ALL_DESIGNATION,
         payload: request 
     }
 
 }

 export const updateDesignation=(designationId,designationName)=>{
    
    const request = axios.put(`${URN}/designation/`+ designationId ,{designationName}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_DESIGNATION,
         payload: request
     }
 
 }

 

