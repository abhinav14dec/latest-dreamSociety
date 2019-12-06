import axios from 'axios';

import{PAYMENT_DATA,ADD_CARD,VERIFY_SIGNATURE,GET_CARD,GET_CARD_DETAILS,URN} from '../actionCreators';


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

export function verifySignatureFun(data,authHeader){ 
  console.log(data,"verifySignature");

  const request = axios.post(`${URN}/card/verifySignature`,data,{headers:authHeader()})
    .then(response => response.data)
    return {
        type: VERIFY_SIGNATURE,
        payload: request
    }
}

export function getCardDetails(number,authHeader){
  const request = axios.post(`${URN}/existing/card`,{number},{headers:authHeader()})
    .then(response => response.data)
    return {
        type: GET_CARD_DETAILS,
        payload: request
    }
}