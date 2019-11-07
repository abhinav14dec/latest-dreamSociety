import axios from 'axios';
import { URN, ADD_RELATION, GET_RELATION, DELETE_RELATION,UPDATE_RELATION, DELETE_ALL_RELATION } from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';




export const addRelation=(values)=>{
  
   const request = axios.post(`${URN}/relation` , values , {headers:authHeader()})
    .then(response => response.data)
 

    
    return{

        type:ADD_RELATION,
        payload: request 
    }

}

export const getRelation=()=>{
  
   const request = axios.get(`${URN}/relation`  , {headers:authHeader()})
    .then(response => response.data)

    
    return{

        type:GET_RELATION,
        payload: request 
    }

}

export const deleteRelation=(relationId)=>{
    const data={
        relationId,
        isActive:false
    }
    const request = axios.put(`${URN}/relation/delete/${relationId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_RELATION,
         payload: request 
     }
 
 }



 export const deleteSelectRelation=(ids)=>{
   
    const request = axios.put(`${URN}/relation/delete/deleteSelected`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_ALL_RELATION,
         payload: request 
     }
 
 }

 export const updateRelation=(relationId,relationName)=>{
    
    const request = axios.put(`${URN}/relation/`+ relationId ,{relationName}, {headers:authHeader()})
     .then(response => response.data)
 
     
     return{
 
         type:UPDATE_RELATION,
         payload: request
     }
 
 }

 

