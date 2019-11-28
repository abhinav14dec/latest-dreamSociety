import {URN,ADD_METER,GET_METER,DELETE_METER,UPDATE_METER,DELETE_MULTIPLE_METER_DETAIL} from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';
import axios from 'axios';


export function AddMeter(values){
  const request = axios.post(`${URN}/meterDetail` , values , {headers:authHeader()})
//    .then(getCountry());

   return{
       type:ADD_METER,
       payload: request 
   }

}
export function getMeter(){
  const request = axios.get(`${URN}/meterDetail` , {headers:authHeader()})
   .then(response =>response.data)
//    .then(getCountry());

   return{

       type:GET_METER,
       payload: request 
   }

}
export function deleteMeter(meterDetailId,isActive){
    const request=axios.put(`${URN}/meterDetail/delete/` + meterDetailId, {isActive}, {headers:authHeader()})
    .then(response => response.data)
    .then(getMeter());
    
    
    return{
       type: DELETE_METER,
       payload:request
    }
}

export function updateMeter(meterDetailId,meterName,initialReading){
    const request=axios.put(`${URN}/meterDetail/` + meterDetailId, {meterName,initialReading}, {headers:authHeader()})
    .then(response => response.data)
    .then(getMeter());
    
    
    return{
       type: UPDATE_METER,
       payload:request
    }
}
export function deleteSelectedMeterDetails(ids){
   const request = axios.put(`${URN}/meterDetail/delete/deleteSelected`, {ids}, {headers: authHeader()})
   .catch(err => err)

   return {
       type: DELETE_MULTIPLE_METER_DETAIL,
       payload: request
   }
}