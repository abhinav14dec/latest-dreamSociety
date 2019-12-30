import axios from 'axios';
import { URN, ADD_VENDOR,GET_INDIVIDUAL_VENDOR, DELETE_INDIVIDUAL_VENDOR, DELETE_SELECT_INDIVIDUAL_VENDOR, UPDATE_INDIVIDUAL_VENDOR ,GET_INDIVIDUAL_SERVICEID,GET_INDIVIDUAL_DATA,ADD_VENDOR_BOOKING,GET_VENDOR_BOOKING,
    DELETE_VENDOR_BOOKING,DELETE_SELECT_INDIVIDUAL_VENDOR_BOOKING, UPDATE_INDIVIDUAL_VENDOR_BOOKING,GET_INDIVIDUAL_VENDOR_BOOKING_REQUEST,GET_INDIVIDUAL_VENDOR_CONFIRM,GET_TIME_SLOT} from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';



export const addVendor=(values)=>{   
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
    
    const request = axios.put(`${URN}/individualVendor/`+ individualVendorId ,{ firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId, fileName1,fileName2,fileName3}, {headers:authHeader()})
     .then(response => response.data)
    
           
 
     
     return{
 
         type:UPDATE_INDIVIDUAL_VENDOR,
         payload: request
     }
 
 }

 //individual vendor booking details by Id

 export const getVendorData=(id)=>{
    const request = axios.get(`${URN}/individualVendor/service/${id}` , {headers:authHeader()})
     .then(response => response.data)
  
     return{
 
         type:GET_INDIVIDUAL_DATA,
         payload: request 
     }
 
 }


    export const addVendorBooking=(values)=>{  
        const request = axios.post(`${URN}/individualVendor/booking` ,values , {headers:authHeader()})
        .then(response => response.data)

        return{
            type:ADD_VENDOR_BOOKING,
            payload: request 
        }
    
    }

    export const getVendorBooking=()=>{  
        const request = axios.get(`${URN}/individualVendor/booking/request` , {headers:authHeader()})
        .then(response => response.data)

        return{
            type:GET_VENDOR_BOOKING,
            payload: request 
        }
    
    }
 
    //delete vendor Booking 

    export const deleteIndividualVendorBooking=(individualVendorBookingId)=>{
        const data={
            individualVendorBookingId,
            isActive:false
        }
        const request = axios.put(`${URN}/individual/vendor/booking/delete/${individualVendorBookingId}`,data, {headers:authHeader()})
         .then(response => response.data)
     
       
         return{
     
             type:DELETE_VENDOR_BOOKING,
             payload: request 
         }
     
     }

     //delete selected vendor Booking 
    
     export const deleteSelectVendorBooking=(ids)=>{
        
        const request = axios.put(`${URN}/individualVendor/booking/delete/deleteSelected`,{ids}, {headers:authHeader()})
         .then(response => response.data)
     
       
         return{
     
             type:DELETE_SELECT_INDIVIDUAL_VENDOR_BOOKING,
             payload: request 
         }
     
     }
    
     //update vendor Booking 
     export const updateIndividualVendorBooking=(individualVendorBookingId,individualVendorId,serviceName,firstName,lastName,rateType,rate,startTimeSlotSelected,endTimeSlotSelected,enableSmsNotification,payOnline,enableFingerPrint,serviceId)=>{
       
        const request = axios.put(`${URN}/individualVendor/booking/`+ individualVendorBookingId ,{ individualVendorId,serviceName,firstName,lastName,rateType,rate,startTimeSlotSelected,endTimeSlotSelected,enableSmsNotification,payOnline,enableFingerPrint,serviceId}, {headers:authHeader()})
         .then(response => response.data)
        
               
     
         
         return{
     
             type:UPDATE_INDIVIDUAL_VENDOR_BOOKING,
             payload: request
         }
     
     }
    
    //  timeSlot by vendorid
    export const timeSlotData=(id)=>{
        const request = axios.get(`${URN}/vendor/slots/${id}` , {headers:authHeader()})
         .then(response => response.data)
      
         return{
     
             type:GET_TIME_SLOT,
             payload: request 
         }
     
     }


     //individual Vendor Booking request
     export const getVendorRequest=()=>{
        const request = axios.get(`${URN}/individualVendor/booking/request/societyMember` , {headers:authHeader()})
         .then(response => response.data)
         return{
             type:GET_INDIVIDUAL_VENDOR_BOOKING_REQUEST,
             payload: request 
         }
     
     }

     //confirm by vendor
     export const getVendorConfirmed=(type,id,token)=>{
        const request = axios.put(`${URN}/individualVendor/booking/${type}/${id}`,{}, {headers:token()})
         .then(response => response.data)
         return{
             type:GET_INDIVIDUAL_VENDOR_CONFIRM,
             payload: request 
         }
     
     }
    

