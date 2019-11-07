import axios from 'axios';
import { URN, ADD_VENDOR,GET_INDIVIDUAL_VENDOR, DELETE_INDIVIDUAL_VENDOR, DELETE_SELECT_INDIVIDUAL_VENDOR, UPDATE_INDIVIDUAL_VENDOR ,GET_INDIVIDUAL_SERVICEID} from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';



export const addVendor=(values)=>{
   
    console.log(values)
   
    const request = axios.post(`${URN}/individualVendor` ,values , {headers:authHeader()})
     .then(response => response.data)
  
 
     return{
 
         type:ADD_VENDOR,
         payload: request 
     }
 
 }

 export const getIndividualVendor=()=>{
   
    const request = axios.get(`${URN}/individualVendor` , {headers:authHeader()})
     .then(response => response.data)
  
 
     return{
 
         type:GET_INDIVIDUAL_VENDOR,
         payload: request 
     }
 
 }

 export const getServiceVendor=(id)=>{
   console.log(id)
    const request = axios.get(`${URN}/individualVendor/${id}` , {headers:authHeader()})
     .then(response => response.data)
  
 
     return{
 
         type:GET_INDIVIDUAL_SERVICEID,
         payload: request 
     }
 
 }

 export const deleteIndividualVendor=(individualVendorId)=>{
    const data={
        individualVendorId,
        isActive:false
    }
    const request = axios.put(`${URN}/individualVendor/delete/${individualVendorId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_INDIVIDUAL_VENDOR,
         payload: request 
     }
 
 }

 export const deleteSelectVendor=(ids)=>{
    
    const request = axios.put(`${URN}/individualVendor/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECT_INDIVIDUAL_VENDOR,
         payload: request 
     }
 
 }


 export const updateIndividualVendor=(individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId, fileName1,fileName2,fileName3)=>{
    console.log(individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId, fileName1,fileName2,fileName3)
    
    const request = axios.put(`${URN}/individualVendor/`+ individualVendorId ,{ firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId, fileName1,fileName2,fileName3}, {headers:authHeader()})
     .then(response => response.data)
    
           
 
     
     return{
 
         type:UPDATE_INDIVIDUAL_VENDOR,
         payload: request
     }
 
 }

 
