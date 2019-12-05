import axios from 'axios';
import { URN, GET_MAINTENANCE_BILL,GET_ELECTRICITY_BILL} from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';

export const getMaintenanceBillInfo=(towerId)=>{
  
   const request = axios.get(`${URN}/calculate/maintenanceCharges/${towerId}`  , {headers:authHeader()})
    .then(response => response.data)
    return{
        type:GET_MAINTENANCE_BILL,
        payload: request 
    }

}

export const getElectricityBillInfo=()=>{
    const request = axios.get(`${URN}/calculate/elctricityCharges`  , {headers:authHeader()})
     .then(response => response.data)
     return{
         type:GET_ELECTRICITY_BILL,
         payload: request 
     }
 
 }




