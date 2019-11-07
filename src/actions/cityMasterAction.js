import axios from 'axios';
import { URN, COUNTRY_DETAIL, STATE_DETAIL,CITY_DETAIL,  ADD_CITY,DETAIL_CITY,DELETE_CITY , UPDATE_CITY, DELETE_SELECTEDCITY } from '../actionCreators/index'
import { authHeader } from './../helper/authHeader';



export const getCountry = () => {
   

    const request = axios.get(`${URN}/country`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: COUNTRY_DETAIL,
        payload: request
    }
}


export const getState = countryId => {
   

    const request = axios.get(`${URN}/getState/${countryId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: STATE_DETAIL,
        payload: request
    }
}

export const getCity = stateId => {

   
    const request = axios.get(`${URN}/city/${stateId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: CITY_DETAIL,
        payload: request
    }
}


export const addCity=(values)=>{

   const request = axios.post(`${URN}/city` , values , {headers:authHeader()})
    .then(response => response.data)
   

    
    return{

        type:ADD_CITY,
        payload: request 
    }

}

export const detailCity=()=>{
  
   const request = axios.get(`${URN}/city`  , {headers:authHeader()})
    .then(response => response.data)

    
    return{

        type:DETAIL_CITY,
        payload: request 
    }

}

export const deleteCity=(cityId)=>{
    const data={
        cityId,
        isActive:false
    }
    const request = axios.put(`${URN}/city/delete/${cityId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_CITY,
         payload: request 
     }
 
 }

 export const deleteSelectCity=(ids)=>{
    
    const request = axios.put(`${URN}/city/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECTEDCITY,
         payload: request 
     }
 
 }


 export const updateCity=(cityId, countryId, stateId, cityName)=>{
  
    
    const request = axios.put(`${URN}/city/`+ cityId ,{countryId, stateId, cityName}, {headers:authHeader()})
     .then(response => response.data)
    
           
 
     
     return{
 
         type:UPDATE_CITY,
         payload: request
     }
 
 }

