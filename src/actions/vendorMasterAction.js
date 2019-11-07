import {URN,ADD_VENDOR_MASTER,GET_VENDOR_MASTER,GET_RATE_TYPE,DELETE_VENDOR,UPDATE_VENDOR,DELETE_VENDOR_IDS,DELETE_VENDOR_SERVICE_IDS,UPDATE_VENDOR_SERVICE,DELETE_VENDOR_SERVICES} from '../actionCreators/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function addVendorMaster(formData){
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
    const request=axios.post(`${URN}/vendor`, formData,{headers:authHeader()},config)
    .then(getVendorMaster())


    return{
        type:ADD_VENDOR_MASTER,
        payload:request
    }
}

export function getVendorMaster(){
    
    const request =axios.get(`${URN}/vendor`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_VENDOR_MASTER,
        payload:request
    }
}

export function getRateType(){
    
    const request =axios.get(`${URN}/rate`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_RATE_TYPE,
        payload:request
    }
}

export function deleteVendor(vendorId,isActive){
    const request = axios.put(`${URN}/vendor/delete/`+vendorId,{isActive}, {headers:authHeader()})
     .then()     
     return{
 
         type:DELETE_VENDOR,
         payload: request 
     }
}

export function deleteVendorServices(vendorServiceId,isActive){console.log(vendorServiceId,"delete")
    const request = axios.put(`${URN}/vendorService/delete/`+vendorServiceId,{isActive}, {headers:authHeader()})
     .then()     
     return{
 
         type:DELETE_VENDOR_SERVICES,
         payload: request 
     }
}

export function deleteSelectedVendor(ids){
    const request= axios.put(`${URN}/vendor/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then((response) => response.data)
    .then(() => this.getVendorMaster());

    return{
        type:DELETE_VENDOR_IDS,
        payload:request
    }
}

export function deleteSelectedVendorServices(ids){
    const request= axios.put(`${URN}/vendorService/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then((response) => response.data)
    .then(() => this.getVendorMaster());

    return{
        type:DELETE_VENDOR_SERVICE_IDS,
        payload:request
    }
}


export function updateVendor(vendorId,formData){
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
        const request = axios.put(`${URN}/vendor/`+vendorId,formData, {headers:authHeader()},config)
         .then(this.getVendorMaster());
     
         
         return{
     
             type:UPDATE_VENDOR,
             payload: request 
         }
    }
    
    export function updateVendorServices(vendorId,vendorServiceId,serviceId,rateId,rate,dailyServices){
        console.log(vendorId,"vendorId",vendorServiceId,"vendorServiceId-------action------",rate,"rate")
            const request = axios.put(`${URN}/vendorService/`+vendorServiceId,{vendorId,serviceId,rateId,rate,dailyServices}, {headers:authHeader()})
             .then(this.getVendorMaster());
         
             
             return{
         
                 type:UPDATE_VENDOR_SERVICE,
                 payload: request 
             }
                     }
        
