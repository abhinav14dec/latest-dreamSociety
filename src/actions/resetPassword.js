import axios from 'axios';
import {URN,RESET_PASSWORD,CLEAR_MESSAGE} from '../actionCreators/index';
//    import { authHeader } from '../helper/authHeader';

 export function resetPassword(values){
     console.log('action',values);
    const request = axios.post(`${URN}/resetPassword/`, {values} )
    .then(response => response.data)
   
 
     return{
 
         type:RESET_PASSWORD,
         payload: request 
     }
 
 }

 export function clearMessage(){
    //     console.log('action',values);
    //    const request = axios.get(`${URN}/forgotPassword/` + values )
    //    .then(response => response.data)
    //     // .then(getCountry());
    
        return{
    
            type:CLEAR_MESSAGE,
            
        }
    
    }
