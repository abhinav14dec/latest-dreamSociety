import axios from 'axios'
import { URN, GET_ASSETS, UPDATE_ASSETS_SUB,ADD_ASSETS_TYPE, GET_ASSETS_SUB, REMOVE_ASSETS_SUB,DELETE_MULTIPLE_ASSETS_SUB_LIST } from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';

export function getAssets() {

    const request = axios.get(`${URN}/assets/`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error=>error)
    return {
        type: GET_ASSETS,
        payload: request
    }
}

export function addAssetsSubType(addAssetsSubType, description, assetsId) {
    const data = {
        assetId: assetsId,
        assetType: addAssetsSubType,
        description: description
    }
 
    const request = axios.post(`${URN}/assetsType/`, data, { headers: authHeader() })
        .then(response => response.data)
        .catch(error=>error)
    return {
        type: ADD_ASSETS_TYPE,
        payload: request
    }

}

export function fetchAssets() {
    const request = axios.get(`${URN}/assetsType/`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error=>error)
    return {
        type: GET_ASSETS_SUB,
        payload: request
    }
}

export function updateAssetsSub(id, assets,assetName, description) {
    console.log(assets)
    const data = {
        assetId:assets,
        assetTypeId: id,
        assetType: assetName,
        description: description,
    }
    
    const request = axios.put(`${URN}/assetsType/${id}`, data, { headers: authHeader() })
        .then(response => response.data)
        .catch(error=>error)
    return {
        type: UPDATE_ASSETS_SUB,
        payload: request
    }
}
export function removeAssetsSub(id) {
   
    const data = {
        assetTypeId: id,
        isActive: false
    }
    const request = axios.put(`${URN}/assetsType/delete/` + id, data, { headers: authHeader() })
        .then(reponse => reponse.data)
        .catch(error=>error)
    return {
        type: REMOVE_ASSETS_SUB,
        payload: request
    }
}

export function deleteMultiple(ids){
    console.log(ids)
    const request=axios.put(`${URN}/assetsType/delete/deleteSelected`,{ids},{ headers: authHeader() })
    .then(response=>response.data)
    .catch(error=>error)
    return{
        type:DELETE_MULTIPLE_ASSETS_SUB_LIST,
        payload:request
    }
}