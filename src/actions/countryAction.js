import {URN,ADD_COUNTRY,GET_COUNTRY_DETAILS,UPDATE_COUNTRY,DELETE_COUNTRY,ADD_STATE,
     GET_COUNTRY_DETAILS1,UPDATE_DETAILS,DELETE_DETAILS,DELETE_MULTIPLE_COUNTRY_DETAILS,
     DELETE_MULTIPLE_STATEMASTER_DETAILS} from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';
import axios from 'axios';


export function AddCountry(values){
    // console.log(values);
   const request = axios.post(`${URN}/country` , values , {headers:authHeader()})
    .then(response => response.data)
    .then(getCountry());

    return{

        type:ADD_COUNTRY,
        payload: request 
    }

}

export function addStates(values){
    console.log('hii');
    const request=axios.post(`${URN}/state`,values,{headers:authHeader()})
    .then(response => response.data)
    .then(getDetails());


    return{
        type:ADD_STATE,
        payload:request
    }
}

export function getCountry(){
    // console.log('hii');
    const request=axios.get(`${URN}/country`,{headers:authHeader()})
    .then(response => response.data)
    
    return{
       type: GET_COUNTRY_DETAILS,
       payload:request
    }
}

export function updateCountry(countryId,countryName,code,currency,phoneCode){
    console.log(countryId,countryName,code,currency,phoneCode);
    const request=axios.put(`${URN}/country/` + countryId, {countryName,code,currency,phoneCode}, {headers:authHeader()})
    .then(response => response.data)
    .then(getCountry());
    
    
    return{
       type: UPDATE_COUNTRY,
       payload:request
    }
}

export function deleteCountry(countryId,isActive){
    console.log(countryId,isActive);
    const request=axios.put(`${URN}/country/delete/` + countryId, {isActive}, {headers:authHeader()})
    .then(response => response.data)
    .then(getCountry());
    
    
    return{
       type: DELETE_COUNTRY,
       payload:request
    }
}
export function getDetails(){
    console.log('hii');
    const request=axios.get(`${URN}/state`, {headers:authHeader()})
    .then(response => response.data)
    
    
    return{
       type: GET_COUNTRY_DETAILS1,
       payload:request
    }
}

export function deleteDetails(stateId,isActive){
    // console.log(stateId,isActive);
    const request=axios.put(`${URN}/state/delete/` + stateId, {isActive}, {headers:authHeader()})
    .then(response => response.data)
    .then(getDetails());
    
    
    return{
       type: DELETE_DETAILS,
       payload:request
    }
}

export function updateDetails(stateId,countryId,countryName,stateName){
    console.log("gggggg",stateId,countryId,stateName);
    const request =axios.put(`${URN}/state/`+ stateId,{countryId,countryName,stateName},{headers:authHeader()})
    .then(response => response.data)
    .then(this.getDetails());

    return{
        type:UPDATE_DETAILS,
        payload:request
    }
}

export function deleteSelectedCountryDetail(ids){
    console.log(ids)
    const request = axios.put(`${URN}/country/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .catch(err => err)

    return {
        type: DELETE_MULTIPLE_COUNTRY_DETAILS,
        payload: request
    }
}

export function  deleteSelectedStateMasterDetail(ids){
    console.log(ids);
    const request = axios.put(`${URN}/state/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .catch(err => err)

    return {
        type: DELETE_MULTIPLE_STATEMASTER_DETAILS,
        payload: request
    }
}