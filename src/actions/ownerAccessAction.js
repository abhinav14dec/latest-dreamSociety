import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { URN, GET_OWNER_ACCESS_DATA} from '../actionCreators/index';

export const getAccessData=(type)=>{
    console.log(type,"===========")
   
    const request = axios.get(`${URN}/owner/access/${type}`, {headers:authHeader()})
     .then(response => response.data)
     .catch(error => error)
 
   
     return{
 
         type:GET_OWNER_ACCESS_DATA,
         payload: request 
     }
 
 }