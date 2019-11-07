import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_MACHINE,GET_MACHINE,GET_MACHINE_ACTUAL_ID,UPDATE_MACHINE, DELETE_MACHINE,DELETE_MULTIPLE_MACHINE}  from '../actionCreators/index'


  
export  function addMachine(machineDetailId,flatDetailId){
    const request= axios.post(`${URN}/machine `,{flatDetailId,machineDetailId} ,{headers:authHeader()})
    return{
        type :ADD_MACHINE,
        payload:request
    }
}

export  function getMachine(){
    const request= axios.get(`${URN}/machineDetail`,{headers:authHeader()}).then(response=> response.data)
    return{
        type :GET_MACHINE_ACTUAL_ID,
        payload:request
    }
}

  
export  function viewMachine(){
    const request= axios.get(`${URN}/machine`,{headers:authHeader()}).then(response=> response.data)
    return{
        type :GET_MACHINE,
        payload:request
    }
}

export function updateMachine( flatDetailId,machineDetailId,machineId){
    console.log(flatDetailId,machineDetailId,machineId);
    const request =axios.put(`${URN}/machine/`+machineId,{flatDetailId,machineDetailId},{headers:authHeader()})
    return{
        type:UPDATE_MACHINE,
        payload:request
    }
}

export function deleteMachine(machineId,isActive){console.log("action",machineId)
    const request = axios.put(`${URN}/machine/delete/` +machineId,{ isActive }, {headers:authHeader()})
    return{
        type:DELETE_MACHINE,
        payload:request
    }
}

export function deleteMultipleMachine(ids){
    const request = axios.put(`${URN}/machine/delete/deleteSelected/`,{ids},   {headers:authHeader()})
 
  return{
      type:DELETE_MULTIPLE_MACHINE,
      payload:request
  }

 }