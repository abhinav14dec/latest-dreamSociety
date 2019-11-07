import axios from 'axios';
import { URN, ADD_MAINTENANCE, GET_MAINTENANCE, DELETE_MAINTENANCE,UPDATE_MAINTENANCE, DELETE_SELECTEDMAINTENANCE } from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';




export const addMaintenance=(values)=>{
  
   const request = axios.post(`${URN}/maintenance` , values , {headers:authHeader()})
    .then(response => response.data)
 

    
    return{

        type:ADD_MAINTENANCE,
        payload: request 
    }

}

export const getMaintenance=()=>{
  
   const request = axios.get(`${URN}/maintenance`  , {headers:authHeader()})
    .then(response => response.data)

    
    return{

        type:GET_MAINTENANCE,
        payload: request 
    }

}

export const deleteMaintenance=(maintenanceId)=>{
    const data={
        maintenanceId,
        isActive:false
    }
    const request = axios.put(`${URN}/maintenance/delete/${maintenanceId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_MAINTENANCE,
         payload: request 
     }
 
 }

 export const deleteSelectMaintenance=(ids)=>{
    
    const request = axios.put(`${URN}/maintenance/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECTEDMAINTENANCE,
         payload: request 
     }
 
 }

 export const updateMaintenance=(maintenanceId,category)=>{
    
    const request = axios.put(`${URN}/maintenance/`+ maintenanceId ,{category}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_MAINTENANCE,
         payload: request
     }
 
 }

