import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { URN,GET_FINGERPRINT_DATA,GET_MACHINE_DATA,GET_MACHINE_DETAILS,DISABLE_MACHINE_DETAILS} from '../actionCreators/index';



export const getFingerprintData=(type)=>{
    console.log(type,"===========")
   
    const request = axios.get(`${URN}/fingerPrint/userFlats/${type}`, {headers:authHeader()})
     .then(response => response.data)
     .catch(error => error)
 
   
     return{
 
         type:GET_FINGERPRINT_DATA,
         payload: request 
     }
 
 }

export function getMachineData(flatDetailId) {
    const request = axios.get(`${URN}/machine/${flatDetailId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type:GET_MACHINE_DATA,
        payload: request
    }
}




export const getMachineDetails=(userId)=>{
    const data={
        userId,
       
    }
    const request = axios.put(`${URN}/fingerPrint/enable/${userId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:GET_MACHINE_DETAILS,
         payload: request 
     }
 
 }

 export const disableMachine=(userId)=>{
    const data={
        userId,
       
    }
    const request = axios.put(`${URN}/fingerPrint/disable/${userId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DISABLE_MACHINE_DETAILS,
         payload: request 
     }
 
 }

