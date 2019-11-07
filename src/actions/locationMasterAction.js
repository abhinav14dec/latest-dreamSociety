import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN, GET_COUNTRY_NAME,GET_STATE_NAME,GET_CITY_NAME,ADD_LOCATION_DETAILS,GET_LOCATION_NAME,GET_LOCATION,DELETE_LOCATION_IDS,DELETE_LOCATION,UPDATE_LOCATION} from '../actionCreators/index';



export  function getCountryName(){
    const request  = fetch(`${URN}/country`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_COUNTRY_NAME,
          payload: request
        } 
    }

    


export function getStateName(countryId){
    const request =fetch(`${URN}/getState/${countryId}`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())

    return{
        type:GET_STATE_NAME,
        payload:request
    }
}    
export function getCityName(stateId){
    const request =fetch(`${URN}/city/${stateId}`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_CITY_NAME,
        payload:request
    }
}  

export function getLocationName(cityId){

    const request =fetch(`${URN}/location/${cityId}`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_LOCATION_NAME,
        payload:request
    }
}

export function addLocationDetails( countryId,stateId,cityId,locationName){
    

    const request = axios.post(`${URN}/location`, {countryId,stateId,cityId,locationName},{headers:authHeader()})
    .then(getLocation())
    return{
        type:ADD_LOCATION_DETAILS,
        payload:request
    }
}

export  function getLocation(){
    const request  = fetch(`${URN}/location`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_LOCATION,
          payload: request
        } 
    }

    
export function updateLocation(locationId, countryId, stateId, cityId, locationName ){
    console.log("action",locationId,locationName);
    const request = axios.put(`${URN}/location/`+locationId,{countryId, stateId, cityId, locationName },{headers:authHeader()})
    .then()
    return{
        type:UPDATE_LOCATION,
        payload:request
    }
}

export const deleteLocation=(locationId,isActive)=>{

    const request = axios.put(`${URN}/location/delete/${locationId}`,{isActive}, {headers:authHeader()})
     .then(response => response.data)
  
     
     return{
 
         type:DELETE_LOCATION,
         payload: request 
     }
 
 }

 export function deleteSelectedLocation(ids){
    const request= axios.put(`${URN}/location/delete/deleteSelected`,{ids},{headers:authHeader()})

    return{
        type:DELETE_LOCATION_IDS,
        payload:request
    }
}
