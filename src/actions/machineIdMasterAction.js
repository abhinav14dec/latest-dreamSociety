import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_MACHINE_ID,GET_MACHINE_ID,UPDATE_MACHINE_ID, DELETE_MACHINE_ID,DELETE_MULTIPLE_MACHINE_ID}  from '../actionCreators/index'


  
export  function addMachine(machineActualId){
    const request= axios.post(`${URN}/machineDetail `,{machineActualId} ,{headers:authHeader()})
    return{
        type :ADD_MACHINE_ID,
        payload:request
    }
}


  
export  function viewMachine(){
    const request= axios.get(`${URN}/machineDetail`,{headers:authHeader()}).then(response=> response.data)
    return{
        type :GET_MACHINE_ID,
        payload:request
    }
}

export function updateMachine( machineActualId,machineDetailId){
    const request =axios.put(`${URN}/machineDetail/`+machineDetailId,{machineActualId},{headers:authHeader()})
    return{
        type:UPDATE_MACHINE_ID,
        payload:request
    }
}

export function deleteMachine(machineDetailId,isActive){
    const request = axios.put(`${URN}/machineDetail/delete/` +machineDetailId,{ isActive }, {headers:authHeader()})
    return{
        type:DELETE_MACHINE_ID,
        payload:request
    }
}

export function deleteMultipleMachine(ids){
    const request = axios.put(`${URN}/machineDetail/delete/deleteSelected/`,{ids},   {headers:authHeader()})
 
  return{
      type:DELETE_MULTIPLE_MACHINE_ID,
      payload:request
  }

 }