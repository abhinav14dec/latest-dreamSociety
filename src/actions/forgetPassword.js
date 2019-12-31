   import axios from 'axios';
   import {URN,MATCH_USER,CLEAR_MESSAGE} from '../actionCreators/index';
//    import { authHeader } from '../helper/authHeader';

    export function matchUser(values){
       const request = axios.get(`${URN}/forgotPassword/` + values )
       .then(response => response.data)
        // .then(getCountry());
    
        return{
    
            type:MATCH_USER,
            payload: request 
        }
    
    }

    export function clearMessage(){
    //    const request = axios.get(`${URN}/forgotPassword/` + values )
    //    .then(response => response.data)
    //     // .then(getCountry());
    
        return{
    
            type:CLEAR_MESSAGE,
            
        }
    
    }
