import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import {URN,GET_DETAILS,FETCH_DETAILS,FETCH_DROP,FETCH_SIZE_DROP,FETCH_SOCIETY_DROP,FETCH_SIZEMASTER_DROP,
    GET_ACTIVE_PAGE,GET_COUNT_PAGE,
    DELETE_MULTIPLE_FLATMASTER_DETAILS,GET_TOTAL_ITEMS} from '../actionCreators/index';


export  function AddDetails(values){
  
    const request= axios.post(`${URN}/flat`,values,{headers:authHeader()})
    .then(response => response.data)
    // .then(getDetails())
    // .then(getDetails())
    
    return{
        type:GET_DETAILS,
        payload:request
    }

}

export  function getDetails(defaultPage){

    const request = axios.get(`${URN}/flat/pagination/${defaultPage}`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_DETAILS,
         payload: request 
    }

}

export function getPageDetails(activePage){
     const request = axios.get(`${URN}/flat/pagination/${activePage}`,{headers:authHeader()})
     .then(response => response.data)

     return{
         type:GET_ACTIVE_PAGE,
         payload:request
     }
}

export function noOfCount(countPerPage,activePage){
    const request= axios.get(`http://192.168.1.103:5000/api/flat/test/?page=${activePage}&&limit=${countPerPage}`,{headers:authHeader()})
    
    return{
        type:GET_COUNT_PAGE,
        payload:request
    }
}

export  function getDrop(){

    const request = axios.get(`${URN}/society`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_DROP,
         payload: request 
    }

}

export  function getSizeDrop(){

    const request = axios.get(`${URN}/size/`,{headers:authHeader()})
    .then(response => response.data)

    return{

         type:FETCH_SIZE_DROP,
         payload: request 
    }

}

export  function getSocietyNameDetails(){

    const request = axios.get(`${URN}/society`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_SOCIETY_DROP,
         payload: request 
    }

}

export  function getSizeTypeDetails(){

    const request = axios.get(`${URN}/size/`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_SIZEMASTER_DROP,
         payload: request 
    }

}

export function deleteSelectedFlatMasterDetail(ids){
    const request = axios.put(`${URN}/flat/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .catch(err => err)

    return {
        type: DELETE_MULTIPLE_FLATMASTER_DETAILS,
        payload: request
    }
}

export function getTotalItems(){

    const request = axios.get(`${URN}/flat`, {headers: authHeader()})
    .catch(err => err)

    return {
        type: GET_TOTAL_ITEMS,
        payload: request
    }
}