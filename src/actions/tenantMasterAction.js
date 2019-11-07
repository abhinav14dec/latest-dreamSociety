import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import{URN,GET_OWNER_DETAIL_VIA_FLATID,GET_FLAT_DETAIL_VIA_TOWERID,UPDATE_TENANT_DETAIL,GET_TENANT_MEMBER_DETAILS,
    DELETE_SELECTED_TENANT,ADD_TENANT_DETAIL, GET_TENANT_DETAIL, DELETE_TENANT, DELETE_TENANT_MEMBER,
    DELETE_SELECTED_TENANT_MEMBER,EDIT_TENANT_MEMBER, ADD_NEW_TENANT, ADD_NEW_Flat,GET_FLATS,EDIT_FLATS,DELETE_FLATS,
    GET_RFID,CHECK_EMAIL,CHECK_CONTACT} from '../actionCreators/index';

export function addTenantDetail(values){
    console.log(values)
    const request = axios.post(`${URN}/tenant`, values, {headers: authHeader()})
    .then((response) => console.log(response.data))

    return {
        type: ADD_TENANT_DETAIL,
        payload:request
    }
}

export function getFlatDetailViaTowerId(towerId){
    console.log(towerId)
    const request = axios.get(`${URN}/tower/towerFloor/${towerId}`, {headers: authHeader()})
    .then((response) => response.data)

    return {
        type: GET_FLAT_DETAIL_VIA_TOWERID,
        payload:request
    }
}

export function getOwnerDetailViaFlatId(flatDetailId){
    console.log(flatDetailId)
    const request = axios.get(`${URN}/owner/getFlatDetail/${flatDetailId}`, {headers: authHeader()})
    .then((response) => response.data)

    return {
        type: GET_OWNER_DETAIL_VIA_FLATID,
        payload: request
    }
}

export function getTenantDetail(){
    const request = axios.get(`${URN}/tenant`, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: GET_TENANT_DETAIL,
        payload: request
    }

}

export function deleteTenant(id){
    const data = {
        isActive: false
    }

    let {isActive} = data;
    const request = axios.put(`${URN}/tenant/delete/` + id, {isActive}, {headers: authHeader()})
    .then(() => this.getTenantDetail());

    return {
        type: DELETE_TENANT,
        payload: request
    }
}

export function deleteSelectedTenant(ids){
    const request = axios.put(`${URN}/tenant/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: DELETE_SELECTED_TENANT,
        payload: request
    }
}

export function updateTenantDetail(firstName,lastName, gender, email, contact, aadhaarNumber, panCardNumber, bankName, IFSCCode,
    accountNumber,accountHolderName, dob, permanentAddress, fileName, towerName, flatNo, towerId, floorId, picture, flatDetailId, tenantId,
    countryId, stateId, cityId, locationId,rfidId){
        console.log(firstName,lastName, gender, email, contact, aadhaarNumber, panCardNumber, bankName, IFSCCode,
            accountNumber,accountHolderName, dob, permanentAddress, fileName, towerName, flatNo, towerId, floorId, picture, flatDetailId, tenantId,
            countryId, stateId, cityId, locationId,rfidId)
        
        const request = axios.put(`${URN}/tenant/` + tenantId, {firstName,lastName, gender, email, contact, aadhaarNumber, panCardNumber, bankName, IFSCCode,
            accountNumber,accountHolderName, dob, permanentAddress, fileName, towerName, flatNo, towerId, floorId, picture, flatDetailId, tenantId,
            countryId, stateId, cityId, locationId,rfidId},
             {headers: authHeader()})

            return {
                type: UPDATE_TENANT_DETAIL,
                payload:request
            }
    }

export function viewMember(id){
    const request = axios.get(`${URN}/tenant/members/` + id, {headers: authHeader()})
    .then(response => response.data)

    return {
        type: GET_TENANT_MEMBER_DETAILS,
        payload:request
    }
}

export function deleteTenantMember(id){
    const data = {
        isActive: false
    }

    let {isActive} = data;
    const request = axios.put(`${URN}/tenant/members/delete/` + id , {isActive}, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: DELETE_TENANT_MEMBER,
        payload: request
    }
}

export function deleteSelectedTenantMember(ids){
    const request = axios.put(`${URN}/tenant/members/delete/deleteSelected` , {ids}, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: DELETE_SELECTED_TENANT_MEMBER,
        payload: request
    }
}

export function editTenantMember(firstName, lastName, memberDob, gender, email, contact, aadhaarNumber, relationId, memberId,rfidId, flatDetailId){
    const request = axios.put(`${URN}/tenant/members/` + memberId , {firstName, lastName, memberDob, gender, email, contact, aadhaarNumber, relationId, memberId,rfidId,flatDetailId}, 
    {headers: authHeader()})
    .then(response => response.data);

    return {
        type: EDIT_TENANT_MEMBER,
        payload: request
    }
}

export function addNewTenantDetail(values){
    console.log(values)
    const request = axios.post(`${URN}/tenant/members`, values, {headers: authHeader()})
    .then((response) => response.data)

    return {
        type: ADD_NEW_TENANT,
        payload:request
    }
}

export function addNewFlatForTenant(values){
    console.log(values)
    const request = axios.post(`${URN}/tenant/addFlat`, values,  {headers: authHeader()})
    .then((response) => console.log(response.data))

    return {
        type: ADD_NEW_Flat,
        payload:request
    }
}

export function getFlats(tenantId){
    console.log(tenantId)
    const request = axios.get(`${URN}/tenant/getFlats/${tenantId}`,  {headers: authHeader()})
    .then((response) => response.data)
    return {
        type: GET_FLATS,
        payload:request
    }
}

export function editFlats(tenantId, flatDetailId, previousFlatDetailId){
    console.log(tenantId, flatDetailId, previousFlatDetailId)
    const request = axios.put(`${URN}/tenant/editFlat`, {tenantId, flatDetailId, previousFlatDetailId},  {headers: authHeader()})
    .then((response) => response.data)
    return {
        type: EDIT_FLATS,
        payload:request
    }
}

export function deleteFlat(values){
    const request = axios.put(`${URN}/tenant/deleteFlat`, values,  {headers: authHeader()})
    .then((response) => {response.data})
    return {
        type: DELETE_FLATS,
        payload:request
    }
}

export function rfid(){
    const request = axios.get(`${URN}/getRfid`, {headers: authHeader()})
    .then((response) => response.data)
    return {
        type: GET_RFID,
        payload:request
    }
}

export function validOnChangeEmail(email){
    const request = axios.post(`${URN}/check/email`, {email}, {headers: authHeader()})
    return {
        type: CHECK_EMAIL,
        payload:request
    }
}

export function validOnChangeContact(contact){
    const request = axios.post(`${URN}/check/contact`, {contact}, {headers: authHeader()})
    return {
        type: CHECK_CONTACT,
        payload:request
    }
}