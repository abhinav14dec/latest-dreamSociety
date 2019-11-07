import axios from 'axios';
import { URN, ADD_BOARD_MEMBER_DETAIL,GET_BOARD_MEMBER_DESIGNATION_DETAIL,
   GET_BOARD_MEMBER_DETAILS,GET_BOARD_ID,UPDATE_BOARD_MEMBER_DETAIL,
 DELETE_BOARD_MEMBER_DETAIL,DELETE_MULTIPLE_BOARD_MEMBER_DETAIL } from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';

 export function addMemberDetails(values){
    const request = axios.post(`${URN}/societyBoardMember`, values, {headers: authHeader()});
    return {
      type: ADD_BOARD_MEMBER_DETAIL,
      payload: request
  }
 }

 export function getMemberDesignation(){
    const request = axios.get(`${URN}/designation`, {headers: authHeader()})
    .then((response) => response.data);
    return {
       type: GET_BOARD_MEMBER_DESIGNATION_DETAIL,
       payload: request
    }
 }

 export function getMemberDetails(){
    const request = axios.get(`${URN}/societyBoardMember`, {headers: authHeader()})
    .then((response) => response.data);
    return {
       type: GET_BOARD_MEMBER_DETAILS,
       payload: request
    }
 }

 export function getSocietyId(){
   const request = axios.get(`${URN}/society`, {headers: authHeader()})
   .then((response) => response.data);
   return {
      type: GET_BOARD_ID,
      payload: request
   }
}



export function updateSocietyMemberDetails(societyId, firstName,lastName, designationId,gender,
   countryId, stateId, cityId,
   locationId, currentAddress, permanentAddress,
   contactNumber, email, bankName,
   accountNumber, panCardNumber, dob, IFSCCode, accountHolderName, societyBoardMemberId){
   const request = axios.put(`${URN}/societyBoardMember/` + societyBoardMemberId, {societyId,firstName, lastName, designationId
      ,gender, countryId,stateId,cityId,
      locationId,currentAddress,permanentAddress,
      contactNumber,email,bankName,
      accountNumber,panCardNumber,dob, IFSCCode, accountHolderName,societyBoardMemberId}, {headers: authHeader()})
      .then(() => this.getMemberDetails());

   return {
      payload: request,
      type: UPDATE_BOARD_MEMBER_DETAIL
   }
}

export function deleteSocietyMemberDetail(societyMemberId){
   const data = {
      isActive: false
   }
   let {isActive} = data;
   const request = axios.put(`${URN}/societyBoardMember/delete/` + societyMemberId, {isActive}, {headers: authHeader()})
   .then(() => this.getMemberDetails());

   return {
      payload: request,
      type: DELETE_BOARD_MEMBER_DETAIL
   }
}

export function deleteMultipleSocietyMemberDetail(ids){
   const request = axios.put(`${URN}/societyBoardMember/delete/deleteSelected`, {ids}, {headers: authHeader()})
   .then(() => this.getMemberDetails());

   return{
      payload:request,
      type: DELETE_MULTIPLE_BOARD_MEMBER_DETAIL
   }
}