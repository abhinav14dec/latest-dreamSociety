import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import {URN,ADD_PURCHASE_ORDER,GET_PURCHASE_ORDER,GET_PDF,DELETE_PURCHASE_ORDER,MULTIPLE_DELETE_PURCHASE_ORDER,ASSET_TYPE_ID,UPDATE_PURCHASE,GET_ASSETS_ID,UPDATE_ASSETS_PURCHASE,GET_SERVICES_ID,UPDATE_SERVICE_PURCHASE,DELETE_PURCHASE_DETAILS,DELETE_ALL_DETAILS} from '../actionCreators/index';

export function addPurchaseOrder(vendorId,expDate,purchaseOrderAssetsArray,purchaseOrderServiceArray) {
    console.log(vendorId,expDate,purchaseOrderAssetsArray,purchaseOrderServiceArray)
    const data={issuedBy:"Arihant Society",vendorId,expectedDateOfDelievery:expDate,purchaseOrderAssetsArray,purchaseOrderServiceArray}
    const request = axios.post(`${URN}/purchaseOrder`,data, { headers: authHeader() })
        .then(response => response.data)
    return {
        type: ADD_PURCHASE_ORDER,
        payload: request
    }

}
export function getPurchaseOrder(){
    const request=axios.get(`${URN}/purchaseOrder`,{ headers: authHeader() })
    .then(response=>response.data)
    return{
        type:GET_PURCHASE_ORDER,
        payload:request
    }
}
 export function pdf(purchaseOrderId){
     console.log(purchaseOrderId)
     const request= axios.get(`${URN}/downloadPdfClient/${purchaseOrderId}`,{ headers: authHeader() })
     return{
         type:GET_PDF,
         payload:request,
     }
 }
 export function removePurchaseOrder(purchaseOrderId){
     console.log(purchaseOrderId)
     const request = axios.put(`${URN}/deletePurchaseOrder/${purchaseOrderId}`,{ headers: authHeader() })
     return{
         type:DELETE_PURCHASE_ORDER,
         payload:request
     }
     
 }
 export function deleteMultiple(ids){
     console.log(ids)
     const request=axios.put(`${URN}/deletePurchaseOrders`,{ids},{headers:authHeader()})
     return{
         type:MULTIPLE_DELETE_PURCHASE_ORDER,
         payload:request
     }
 }

 export const assetTypeId =assetId => {

    const request = axios.get(`${URN}/assetsTypeByAssetId/${assetId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: ASSET_TYPE_ID,
        payload: request
    }
}

export const updatePurchaseOrderData=(purchaseOrderId, issuedBy, vendorId,expDateOfDelievery)=>{
  
    console.log(purchaseOrderId, issuedBy, vendorId,expDateOfDelievery)
    const request = axios.put(`${URN}/updatePurchaseOrder/`+ purchaseOrderId ,{ issuedBy, vendorId,expDateOfDelievery}, {headers:authHeader()})
     .then(response => response.data)
    
           
 
     
     return{
 
         type:UPDATE_PURCHASE,
         payload: request
     }
 
 }

 export const getAssetsId=(id)=>{
    console.log(id)
     const request = axios.get(`${URN}/getAssets/${id}` , {headers:authHeader()})
      .then(response => response.data)
   
  
      return{
  
          type:GET_ASSETS_ID,
          payload: request 
      }
  
  }

  export const updateAssetsDetails=(purchaseOrderId,purchaseOrderType,purchaseOrderSubType,purchaseOrderName,rate,quantity,amount,purchaseOrderDetailId)=>{
  
     console.log(purchaseOrderId,purchaseOrderType,purchaseOrderSubType,purchaseOrderName,rate,quantity,amount,purchaseOrderDetailId)
    const request = axios.put(`${URN}/updatePurchaseOrderDetails/`+ purchaseOrderDetailId ,{purchaseOrderDetailId,purchaseOrderType,purchaseOrderSubType,purchaseOrderName,rate,quantity,amount}, {headers:authHeader()})
     .then(response => response.data)
    
           
 
     
     return{
 
         type:UPDATE_ASSETS_PURCHASE,
         payload: request
     }
 
 }

 export const getServicesId=(id)=>{
    console.log(id)
     const request = axios.get(`${URN}/getServices/${id}` , {headers:authHeader()})
      .then(response => response.data)
   
  
      return{
  
          type:GET_SERVICES_ID,
          payload: request 
      }
  
  }

 export const updateServiceDetails=(purchaseOrderDetailId, purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate, serviceEndDate)=>{
  
    console.log(purchaseOrderDetailId,purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate,serviceEndDate)
   const request = axios.put(`${URN}/updatePurchaseOrderDetails/`+ purchaseOrderDetailId ,{purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate,serviceEndDate}, {headers:authHeader()})
    .then(response => response.data)
   
          

    
    return{

        type:UPDATE_SERVICE_PURCHASE,
        payload: request
    }

}


export const deletePurchaseDetails=(purchaseOrderDetailId)=>{
    const data={
        purchaseOrderDetailId,
        isActive:false
    }
    const request = axios.put(`${URN}/deletePurchaseOrderDetails/${purchaseOrderDetailId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_PURCHASE_DETAILS,
         payload: request 
     }
 
 }

 export const deleteAllDetails=(ids)=>{
    
    const request = axios.put(`${URN}/deleteSelectedPurchaseOrderDetails/`,{ids}, {headers:authHeader()})
     .then(response => response.data)
 
   
     return{
 
         type:DELETE_ALL_DETAILS,
         payload: request 
     }
 
 }


 