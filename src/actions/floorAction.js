import { ADD_FLOOR,GET_FLOOR,UPDATE_FLOOR,DELETE_FLOOR,DELETE_MULTIPLE_FLOOR,URN,GET_FLOOR_TOWER } from '../actionCreators/index';
import axios from 'axios';
import { authHeader } from '../helper/authHeader';

export function getFloor(){
   const request = axios.get(`${URN}/floor`, {headers: authHeader() })
   .then((response) =>response.data);

   return{
       type: GET_FLOOR,
       payload: request
   }
}

export function postFloor(values){
    console.log(values)
   const request = axios.post(`${URN}/floor`, values, {headers: authHeader()})
   return {
       type: ADD_FLOOR,
       payload: request
   }
}


export const deleteFloor=(floorId)=>{
    const data={
        floorId,
        isActive:false
    }
    const request = axios.put(`${URN}/floor/delete/${floorId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_FLOOR,
         payload: request 
     }
 
 }


export function deleteSelectedFloor(ids){
    const request = axios.put(`${URN}/floor/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .then(response => response.data)
    .then(error => error)

    return {
        type: DELETE_MULTIPLE_FLOOR,
        payload: request
    }
}

export const updateFloor=(floorId,floorName)=>{
    
    const request = axios.put(`${URN}/floor/`+ floorId ,{floorName}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_FLOOR,
         payload: request
     }
 
 }

 export function fetchFloor(){
    const request =axios.get(`${URN}/floor`,{headers:authHeader()})
    .then(response =>response.data)
    return{
        type:GET_FLOOR_TOWER,
        payload:request
    }
} 
