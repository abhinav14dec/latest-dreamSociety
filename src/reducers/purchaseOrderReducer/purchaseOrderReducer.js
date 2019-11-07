import {ADD_PURCHASE_ORDER,GET_PURCHASE_ORDER,GET_PDF,DELETE_PURCHASE_ORDER,MULTIPLE_DELETE_PURCHASE_ORDER, ASSET_TYPE_ID,UPDATE_PURCHASE,GET_ASSETS_ID,UPDATE_ASSETS_PURCHASE,UPDATE_SERVICE_PURCHASE,GET_SERVICES_ID,DELETE_PURCHASE_DETAILS,DELETE_ALL_DETAILS} from '../../actionCreators/index';

export default function (state={},action){
 
    switch(action.type){
        case ADD_PURCHASE_ORDER:
        return {...state,purchaseOrder:action.payload}
        case GET_PURCHASE_ORDER:
        return {...state,getpurchaseOrder:action.payload}
        case GET_PDF:
        return {...state,getPdf:action.payload}
        case DELETE_PURCHASE_ORDER:
        return {...state,deletePurchase:action.payload}
        case MULTIPLE_DELETE_PURCHASE_ORDER:
        return {...state,deleteMultiplePurchase:action.payload}
        case ASSET_TYPE_ID:
        return {...state, assetTypeData:action.payload}
        case UPDATE_PURCHASE:
                return {...state, updatePurchase:action.payload}
        case GET_ASSETS_ID:
                return {...state, updateAssets:action.payload}

        case UPDATE_ASSETS_PURCHASE:
                return {...state, updateAssetsDetails:action.payload}
        case UPDATE_SERVICE_PURCHASE:
                return {...state, updateServicesDetails:action.payload}
        case GET_SERVICES_ID:
                return {...state, getServiceDetails:action.payload}
        case DELETE_PURCHASE_DETAILS:
                        return {...state, deleteDetails:action.payload}

        case DELETE_ALL_DETAILS:
                        return {...state, deleteAllDetails:action.payload}

        default:
        return state;
    }
}