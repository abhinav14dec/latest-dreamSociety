import axios from 'axios';
import { URN, ASSIGN_ROLES, ASSIGN_OWNER, ASSIGN_CHANGES, ASSIGN_POST,ASSIGN_DISPLAY } from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';


export const assignRole=()=>{
    const request = axios.get(`${URN}/role/assign` , {headers:authHeader()})
     .then(response => response.data)
     .catch((err)=>{
         return err;
     })
  
     return{
 
         type:ASSIGN_ROLES,
         payload: request 
     }
 
 }


 export const assignOwner=(Id)=>{
    const request = axios.get(`${URN}/user/active/${Id}` , {headers:authHeader()})
     .then(response => response.data)
  
     return{
 
         type:ASSIGN_OWNER,
         payload: request 
     }
 
 }

 export const assignChanges=()=>{
    const request = axios.get(`${URN}/user/role/assign` , {headers:authHeader()})
     .then(response => response.data)
  
     return{
 
         type:ASSIGN_CHANGES,
         payload: request 
     }
 
 }

 export const assignPost=(values)=>{
     console.log(values)
    const request = axios.post(`${URN}/assignRoles`, values , {headers:authHeader()})
     .then(response => response.data)
  
     return{
 
         type:ASSIGN_POST,
         payload: request 
     }
 
 }

 export const assignRoleData=()=>{
     console.log('djhduhcudsu');
    const request = axios.get(`${URN}/rolesAssigned` , {headers:authHeader()})
     .then(response => response.data)
  
     return{
 
         type:ASSIGN_DISPLAY,
         payload: request 
     }
 
 }