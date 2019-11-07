import axios from 'axios';
import { URN, CHANGE_PASSWORD } from '../actionCreators/index'
import { authHeader } from '../helper/authHeader';



export const changePassword=(values)=>{
   
    console.log(values)
   
    const request = axios.post(`${URN}/user/changePassword` ,values , {headers:authHeader()})
     .then(response => response.data)
  
 
     
     return{
 
         type:CHANGE_PASSWORD,
         payload: request 
     }
 
 }
