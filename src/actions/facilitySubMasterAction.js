import axios from 'axios';
import { URN, POST_FACILITY_SUBMASTER,GET_FACILITY_SUBMASTER,DELETE_SUB_FACILITY,DELETE_SUB_SELECTEDCITY,UPDATE_SUB_FACILITY,GET_FACILITY_USER } from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';



export const postFacilitySubMaster = (facilityId,monthlyRate, unitRate,monthlyRateType,rateType) => {
   
   console.log(facilityId,monthlyRate, unitRate,monthlyRateType,rateType)
    const request = axios.post(`${URN}/facilityDetail`,{facilityId,monthlyRate, unitRate,monthlyRateType,rateType}, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: POST_FACILITY_SUBMASTER,
        payload: request
    }
}

export const getFacilitySubMaster = () => {
   

    const request = axios.get(`${URN}/facilityDetail`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_FACILITY_SUBMASTER,
        payload: request
    }
}




export const deleteFacilityRate=(facilityDetailId)=>{
    const data={
        facilityDetailId,
        isActive:false
    }
    console.log(data)
    const request = axios.put(`${URN}/facilityDetail/delete/${facilityDetailId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SUB_FACILITY,
         payload: request 
     }
 
 }

 export const deleteSelectSubFacility=(ids)=>{
    
    const request = axios.put(`${URN}/facilityDetail/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SUB_SELECTEDCITY,
         payload: request 
     }
 
 }


 export const updateSubFacilty=(facilityDetailId, faciltyId,monthlyRate, unitRate)=>{
     console.log(facilityDetailId, faciltyId,monthlyRate, unitRate,"update Facility===============")
  
    
    const request = axios.put(`${URN}/facilityDetail/`+ facilityDetailId ,{ faciltyId,monthlyRate, unitRate}, {headers:authHeader()})
     .then(response => response.data)
    
           
 
     
     return{
 
         type:UPDATE_SUB_FACILITY,
         payload: request
     }
 
  }

  export const getFacilityUser = () => {
   

    const request = axios.get(`${URN}/facilityDetail/user`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_FACILITY_USER,
        payload: request
    }
}

