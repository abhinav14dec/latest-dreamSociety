import axios from 'axios';

import{PAYMENT_DATA,ADD_CARD,GET_CARD,URN} from '../actionCreators';


export function getData(){
    
  const request = axios.get(`${URN}/get/card/linked`)
    .then(response => response.data)
    return {
        type: PAYMENT_DATA,
        payload: request
    }
}

export function addCard(values,authHeader){
  console.log('action reached',values);
  
const request = axios.post(`${URN}/save/card/data`,values,{headers:authHeader()})
  .then(response => response.data)
  return {
      type: ADD_CARD,
      payload: request
  }
}

export function getCard(authHeader){
    // console.log(user);
  const request = axios.get(`${URN}/card`,{headers:authHeader()})
    .then(response => response.data)
    return {
        type: GET_CARD,
        payload: request
    }
}

export function verifySignature(authHeader){
    
  const request = axios.get(`${URN}/get/card/linked`,{headers:authHeader()})
    .then(response => response.data)
    return {
        type: PAYMENT_DATA,
        payload: request
    }
}