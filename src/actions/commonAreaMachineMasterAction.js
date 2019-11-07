import {URN,ADD_COMMON_AREA_MACHINE,GET_COMMON_AREA_MACHINE,UPDATE_AREAS_MACHINE,DELETE_AREA_MACHINE,DELETE_AREA_MACHINE_IDS} from '../actionCreators/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function addCommonAreaMachine(commonAreaId,machineDetailId,machines){console.log("action",commonAreaId,machineDetailId,machines)
    const request = axios.post(`${URN}/commonAreaDetail`,{commonAreaId,machineDetailId,machines}, {headers:authHeader()})
   
    return {
        type:ADD_COMMON_AREA_MACHINE,
        payload:request
    }
 
}

export function getCommonAreaMachine(){
    const request=axios.get(`${URN}/commonAreaDetail`,{headers:authHeader()})
    .then(response =>response.data)
    return {
        type:GET_COMMON_AREA_MACHINE,
        payload:request
    }
}

export function updateMachineAreas(commonAreaDetailId,commonAreaId,machines){

    const request = axios.put(`${URN}/commonAreaDetail/`+commonAreaDetailId,{commonAreaId,machines},{headers:authHeader()})
    .then()
    return{
        type:UPDATE_AREAS_MACHINE,
        payload:request
    }
}

export const deleteCommonAreaMachine=(commonAreaDetailId,isActive)=>{
    
       const request = axios.put(`${URN}/commonAreaDetail/delete/${commonAreaDetailId}`,{isActive}, {headers:authHeader()})
        .then(response => response.data)
    
     
        return{
    
            type:DELETE_AREA_MACHINE,
            payload: request 
        }
    
    }


    export function deleteSelectedCommonAreaMachine(ids){
        const request= axios.put(`${URN}/commonAreaDetail/delete/deleteSelected`,{ids},{headers:authHeader()})
        .then((response) => response.data)
        .then(() => this.getCommonArea())
        ;
    
        return{
            type:DELETE_AREA_MACHINE_IDS,
            payload:request
        }
    }