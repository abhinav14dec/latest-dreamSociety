import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import {URN,ADD_RF,GET_RF,DELETE_RF,MULTIPLE_DELETE_RF,UPDATE_RF,GET_OWNER_RF} from '../actionCreators/index';

export function addRF(rfid) {
    const data={
        rfid:rfid
    }
    const request = axios.post(`${URN}/rfid`, data , { headers: authHeader() })
        .then(response => response.data)
    return {
        type: ADD_RF,
        payload: request
    }

}
export function fetchRf(){
    const request =axios.get(`${URN}/rfid`,{headers:authHeader()})
    .then(response=>response.data)
    .catch(error=>error)
    return{
        type:GET_RF,
        payload:request
    }
}

export function removeRf(rfidId){
    const request = axios.put(`${URN}/rfid/delete/${rfidId}`,{rfidId},{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:DELETE_RF,
        payload:request
    }
}

export function deleteMultipleRf(ids){
    const request= axios.put(`${URN}/rfid/delete/deleteSelected`,{ids},{ headers: authHeader()})
    .then(response=>response.data)
    return{
        type:MULTIPLE_DELETE_RF,
        payload:request
    }
}
 

export function updateRF(rfidId,rfid){
    console.log(rfidId,rfid)
    const data={
        rfid:rfid
    }
    const request=axios.put(`${URN}/rfid/`+rfidId,data,{headers:authHeader()})
    .then(response=>response.data)
    return{
        type:UPDATE_RF,
        payload:request
    }

 }

 export function getRfId(){
     const request = axios.get(`${URN}/getRfid`,{headers:authHeader()} )
     .then(response=>response.data)
     return {
         type:GET_OWNER_RF,
         payload:request
     }
 }