import {URN,ADD_COMMON_AREA,GET_COMMON_AREA,UPDATE_AREAS,DELETE_AREA,DELETE_AREA_IDS, GET_MACHINES} from '../actionCreators/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function addCommonArea(commonArea){
    const request = axios.post(`${URN}/commonArea`,{commonArea}, {headers:authHeader()})
   
    return {
        type:ADD_COMMON_AREA,
        payload:request
    }
 
}

export function getCommonArea(){
    const request=axios.get(`${URN}/commonArea`,{headers:authHeader()})
    .then(response =>response.data)
    return {
        type:GET_COMMON_AREA,
        payload:request
    }
}


export function getMachines(machineDetailId){console.log(machineDetailId)
    const request=axios.get(`${URN}/getMachines`,{headers:authHeader()})
    .then(response =>response.data)
    return {
        type:GET_MACHINES,
        payload:request
    }
}

export function updateAreas(commonAreaId,commonArea){

    const request = axios.put(`${URN}/commonArea/`+commonAreaId,{commonArea},{headers:authHeader()})
    .then()
    return{
        type:UPDATE_AREAS,
        payload:request
    }
}

export const deleteCommonArea=(commonAreaId,isActive)=>{
    
   
       const request = axios.put(`${URN}/commonArea/delete/${commonAreaId}`,{isActive}, {headers:authHeader()})
        .then(response => response.data)
    
     
        return{
    
            type:DELETE_AREA,
            payload: request 
        }
    
    }


    export function deleteSelectedCommonArea(ids){
        const request= axios.put(`${URN}/commonArea/delete/deleteSelected`,{ids},{headers:authHeader()})
        .then((response) => response.data)
        .then(() => this.getCommonArea())
        ;
    
        return{
            type:DELETE_AREA_IDS,
            payload:request
        }
    }