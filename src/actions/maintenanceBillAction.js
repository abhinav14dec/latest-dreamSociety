import axios from 'axios';
import { URN, GET_MAINTENANCE_BILL,GET_ELECTRICITY_BILL,UPDATE_ELECTRICITY_BILL} from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';

export const getMaintenanceBillInfo=(towerId)=>{
  
   const request = axios.get(`${URN}/calculate/maintenanceCharges/${towerId}`  , {headers:authHeader()})
    .then(response => response.data)
    return{
        type:GET_MAINTENANCE_BILL,
        payload: request 
    }

}

export const getElectricityBillInfo=(towerId)=>{
    
    const request = axios.get(`${URN}/electricityCharges/${towerId}`  , {headers:authHeader()})
     .then(response => response.data)
     return{
         type:GET_ELECTRICITY_BILL,
         payload: request 
     }
 
 }

 export const getElectricityBillUpdate=(id,payload)=>{
     

    const request = axios.put(`${URN}/electricityCharges/${id}`,payload , {headers:authHeader()})
     .then(response => response.data)
     return{
         type:UPDATE_ELECTRICITY_BILL,
         payload: request 
     }
 
 }




