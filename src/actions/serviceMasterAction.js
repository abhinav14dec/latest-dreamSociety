import axios from 'axios';
import {authHeader} from '../helper/authHeader';
import {URN,GET_DETAIL,GET_SERVICE,ADD_SERVICE,DELETE_SERVICE_IDS,DELETE_SERVICE,UPDATE_SERVICES} from '../actionCreators/index';

export function getServiceDetail(){
    const request=axios.get(`${URN}/serviceDetail`,{headers:authHeader()})
    .then(response =>response.data)
    return {
        type:GET_DETAIL,
        payload:request
    }
}

export function getServiceType(){
    const request =axios.get(`${URN}/service`,{headers:authHeader()})
    .then(response => response.data)
    return {
        type:GET_SERVICE,
        payload:request
    }
}

export function updateServices(serviceId,serviceName, service_detail, serviceDetailId  ){

    const request = axios.put(`${URN}/service/`+serviceId,{serviceName, service_detail, serviceDetailId  },{headers:authHeader()})
    .then()
    return{
        type:UPDATE_SERVICES,
        payload:request
    }
}


export function addServiceType(serviceName,serviceDetailId){
    const request = axios.post(`${URN}/service`,{serviceName,serviceDetailId}, {headers:authHeader()})
   
    return {
        type:ADD_SERVICE,
        payload:request
    }
 
}

export function deleteSelectedService(ids){
    const request= axios.put(`${URN}/service/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then((response) => response.data)
    .then(() => this.getServiceType())
    ;

    return{
        type:DELETE_SERVICE_IDS,
        payload:request
    }
}


export const deleteService=(serviceId,isActive)=>{
 console.log(serviceId)

    const request = axios.put(`${URN}/service/delete/${serviceId}`,{isActive}, {headers:authHeader()})
     .then(response => response.data)
 
     // .then(getDetails())
     return{
 
         type:DELETE_SERVICE,
         payload: request 
     }
 
 }