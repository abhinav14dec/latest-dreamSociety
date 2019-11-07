import axios from 'axios';
import {URN,GET_TOKEN} from '../actionCreators/index';
//    import { authHeader } from '../helper/authHeader';

 export function  giveToken(values){
     console.log('action',values);
    const request = axios.get(`${URN}/tokenVerify/` + values)
    .then(response => response.data)
     
 
     return{
 
         type:GET_TOKEN,
         payload: request 
     }
 
 }