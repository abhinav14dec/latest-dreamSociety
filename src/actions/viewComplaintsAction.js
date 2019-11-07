import {URN,GET_COMPLAINTS,REJECT_COMPLAINT,ACCEPT_COMPLAINT,SEND_COMPLAINT,COMPLAINT_COMPLETE,DELETE_COMPLAINTS,GET_FEEDBACK} from '../actionCreators/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function getComplaints(){
    
    const request =axios.get(`${URN}/vendorComplaints`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_COMPLAINTS,
        payload:request
    }
}   


export function getFeedback(complaintId){
    console.log(complaintId)
    const request =axios.get(`${URN}/vendorComplaints/feedback/${complaintId}`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_FEEDBACK,
        payload:request
    }
}   


export const rejectComplaint=(complaintId)=>{
  
   
       const request = axios.put(`${URN}/vendorComplaints/reject`,{complaintId}, {headers:authHeader()})
        .then(response => response.data)
    
        // .then(getDetails())
        return{
    
            type:REJECT_COMPLAINT,
            payload: request 
        }
    
    }

    export const acceptComplaint=(complaintId)=>{
  
   
        const request = axios.put(`${URN}/vendorComplaints/accept`,{complaintId}, {headers:authHeader()})
         .then(response => response.data)
     
         // .then(getDetnails())
         return{
     
             type:ACCEPT_COMPLAINT,
             payload: request 
         }
     
     }
 
     export const sendConfirmations=(complaintId,updatedSlots)=>{

   
        const request = axios.put(`${URN}/vendorComplaints/selectTime`,{complaintId,updatedSlots}, {headers:authHeader()})
         .then(response => response.data)
     
         // .then(getDetails())
         return{
      
             type:SEND_COMPLAINT,
             payload: request 
         }
     
     }

     
    export const complaintCompleted=(complaintId)=>{
  
   
        const request = axios.put(`${URN}/vendorComplaints/complete`,{complaintId}, {headers:authHeader()})
         .then(response => response.data)
     
         // .then(getDetails())
         return{
     
             type:COMPLAINT_COMPLETE,
             payload: request 
         }
     
     }
     
     export function deleteSelectedComplaints(ids){
        const request= axios.put(`${URN}/vendorComplaints/delete`,{ids},{headers:authHeader()})
        .then((response) => response.data)
        .then(() => this.getComplaints());
    
        return{
            type:DELETE_COMPLAINTS,
            payload:request
        }
    }
    