import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN, GET_TOWER_NAME,GET_FLAT_TYPE,ADD_FLAT_DETAILS,GET_FLAT_DETAILS,DELETE_FLAT,DELETE_FLAT_DETAIL_IDS,UPDATE_FLAT_DETAILS,GET_FLOOR_DATA,GET_FLAT_PARKING,GET_PARKING_SLOT,GET_SLOTS} from '../actionCreators/index';

export  function getTowerName(){
    const request  = fetch(`${URN}/tower`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_TOWER_NAME,
          payload: request
        } 
    }

export function getFlatType(){
    const request = fetch(`${URN}/flat`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_FLAT_TYPE,
        payload:request
    }
}    

export function getFlatDetails(){
    const request =fetch(`${URN}/flatDetail`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_FLAT_DETAILS,
        payload:request
    }
}   


export function addFlatDetails( values){
    console.log("result", values)
     const request = axios.post(`${URN}/flatDetail` , values , {headers:authHeader()})
      .then(response => response.data)
   
      return{
  
        type:ADD_FLAT_DETAILS,
        payload:request
      }
  
  }

export function deleteSelectedFlat(ids){console.log(ids)
const request= axios.put(`${URN}/flatDetail/delete/deleteSelected`,{ids},{headers:authHeader()})
.then((response) => response.data)


return{
    type:DELETE_FLAT_DETAIL_IDS,
    payload:request
}
}


export function updateFlatDetails(flatDetailId,flatNo,flatId, floorId,towerId ){

    const request = axios.put(`${URN}/flatDetail/`+flatDetailId,{flatNo,flatId,floorId,towerId },{headers:authHeader()})
    .then((response) => response.data)
    return{
        type:UPDATE_FLAT_DETAILS,
        payload:request
    }
}

export  function getfloors(towerId){
    const request  = fetch(`${URN}/towerFloor/${towerId}`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_FLOOR_DATA,
          payload: request
        } 
    }

export function fetchParking (){
    const request = axios.get(`${URN}/parking`,{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:GET_FLAT_PARKING,
        payload:request
    }
}

export function getSlotId (parkingId,flatId){
    console.log(parkingId)
    const request = axios.get(`${URN}/slot/${parkingId}/${flatId}`,{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:GET_PARKING_SLOT,
        payload:request
    }
}

export function getSlots (id){
    console.log(id)
    const request = axios.get(`${URN}/flatDetail/${id}`,{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:GET_SLOTS,
        payload:request
    }
}

export function deleteFlat(flatDetailId,isActive){console.log(flatDetailId,"deleteAction")
    const request = axios.put(`${URN}/flatDetail/delete/`+flatDetailId,{isActive}, {headers:authHeader()})
     .then()     
     return{
 
         type:DELETE_FLAT,
         payload: request 
     }
}