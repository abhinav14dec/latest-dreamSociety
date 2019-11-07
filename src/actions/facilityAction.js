import axios from 'axios';
import {authHeader} from '../helper/authHeader';
import {URN,ADD_FACILITY,GET_FACILITY,UPDATE_FACILITY,DELETE_FACILITY_IDS,DELETE_FACILITY} from '../actionCreators/index';

export function addFacility(facilityName){
    const request = axios.post(`${URN}/facility`,{facilityName}, {headers:authHeader()})
   
    return {
        type:ADD_FACILITY,
        payload:request
    }
 
}

export function getFacility(){
    const request =axios.get(`${URN}/facility`,{headers:authHeader()})
    .then(response => response.data)
    return {
        type:GET_FACILITY,
        payload:request
    }
}


export function updateFacility(facilityId,facilityName){

    const request = axios.put(`${URN}/facility/`+facilityId,{facilityName },{headers:authHeader()})
    .then()
    return{
        type:UPDATE_FACILITY,
        payload:request
    }
}


export function deleteSelectedFacility(ids){console.log(ids)
    const request= axios.put(`${URN}/facility/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then((response) => response.data)
    .then(() => this.getFacility())
    ;

    return{
        type:DELETE_FACILITY_IDS,
        payload:request
    }
}


export const deleteFacility=(facilityId,isActive)=>{


    const request = axios.put(`${URN}/facility/delete/${facilityId}`,{isActive}, {headers:authHeader()})
     .then(response => response.data)
 
     return{
 
         type:DELETE_FACILITY,
         payload: request 
     }
 
 }
