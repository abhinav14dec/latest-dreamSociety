import axios from 'axios';
import { URN, GET_COUNTRY, GET_STATE, GET_CITY, GET_LOCATION_DETAIL,  GET_SOCIETY, DETAIL_SOCIETY,POST_SOCIETY, DELETE_SOCIETY,UPDATE_SOCIETY,DELETE_SELECTEDSOCIETY } from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';



export const getCountry = () => {
  

    const request = axios.get(`${URN}/country`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {

        type: GET_COUNTRY,
        payload: request
    }
}


export const getState = countryId => {
    

    const request = axios.get(`${URN}/getState/${countryId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_STATE,
        payload: request
    }
}

export const getCity = stateId => {

   
    const request = axios.get(`${URN}/city/${stateId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_CITY,
        payload: request
    }
}

export const getLocation = cityId => {

    
    const request = axios.get(`${URN}/location/${cityId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_LOCATION_DETAIL,
        payload: request
    }
}


export const postSociety = (values) => {
   
    const request = axios.post(`${URN}/society`,values, { headers: authHeader() })
        .then(response => response.data)
      

    return {
        type: POST_SOCIETY,
        payload: request
    }
}

export const getSociety = () => {

  
    const request = axios.get(`${URN}/society`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_SOCIETY,
        payload: request
    }
}


export const deleteSociety=(societyId)=>{
    const data={
        societyId,
        isActive:false
    }
    
    const request = axios.put(`${URN}/society/delete/${societyId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
    
     return{
 
         type:DELETE_SOCIETY,
         payload: request 
     }
 
 }

 export const deleteSelectSociety=(ids)=>{
    console.log(ids)
    const request = axios.put(`${URN}/society/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_SELECTEDSOCIETY,
         payload: request 
     }
 
 }

 export const detailSociety = () => {

   
    const request = axios.get(`${URN}/society`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: DETAIL_SOCIETY,
        payload: request
    }
}

 export const updateSociety=(societyId, countryId, stateId,cityId, locationId, societyName, societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber,registrationNumber,totalBoardMembers)=>{
   
    
    const request = axios.put(`${URN}/society/`+ societyId ,{countryId, stateId,cityId, locationId, societyName, societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber,registrationNumber,totalBoardMembers}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:UPDATE_SOCIETY,
         payload: request
     }
 
 }

