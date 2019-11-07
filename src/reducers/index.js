import { combineReducers } from 'redux';
import userDetail from './userDetail/userDetail';
import loginReducer from './loginReducer/loginReducer';
import flats from './flatMasterDetailReducer/flatMasterDetailReducer';
import flat from './flatMasterReducer/flatMasterReducer';
import TowerDetails from './towerReducer/towerReducer';
import EventDetails from './eventMasterReducer/eventMasterReducer';
import serviceMasterReducer from './vendorMasterReducer/serviceMasterReducer';
import displayServiceMasterReducer from './vendorMasterReducer/displayServiceMasterReducer';
import vendorMasterReducer from './vendorMasterReducer/vendorMasterReducer';
import SizeDetails from './sizeReducer/sizeReducer';
import societyReducer from './societyReducer/societyReducer';
import parkingDetail from './parkingReducer/parkingReducer';
import personDetails from './personReducer/personReducer';
import flatDetailMasterReducer from './flatDetailMasterReducer/flatDetailMasterReducer';
import locationMasterReducer from './locationMasterReducer/locationMasterReducer';
import cityMasterReducer from './cityMasterReducer/cityMasterReducer';
import employeeDetails from './employeeTypeMasterReducer/employeeTypeMasterReducer'
import AssetsReducer from './assetsReducer/assetsReducer';
import AssetsTypeReducer from './assetsReducer/assetsTypeReducer';
import countryDetails from './countryReducers/countryReducer';
import Inventory from './inventoryReducer/inventoryReducer';
import MaintenanceMasterReducer from './maintenanceMasterReducer/maintenanceMasterReducer';
import MaintenanceSubMaster from './maintenanceSubMasterReducer/maintenanceSubMasterReducer';
import EmpDetails from './employeeMasterReducer/employeeMasterReducer';
import DesignationMasterReducer from './designationMasterReducer/designationMasterReducer';
import RelationMasterReducer from './relationMasterReducer/relationMasterReducer'
import MachineDetails from './machineMasterReducer.js/machineMaster'
import societyMemberEventReducer from './societyMemberEventReducer/societyMemberEventReducer'
import memberEventsBookingReducer from './memberEventsBookingReducer/memberEventsBookingReducer';

import eventSpaceMasterReducer from './eventSpaceMasterReducer/eventSpaceMasterReducer';
import boardMemberReducer from './boardMemberReducer/boardMemberReducer';
import tenantReducer from './tenantReducer/tenantReducer';
import FlatOwnerReducer from './flatOwnerReducer/flatOwnerReducer'
import forgetPasswordReducer from './forgetPasswordReducer/forgetPasswordReducer';
// import FlatOwnerReducer from './flatOwnerReducer/flatOwnerReducer';
import FloorReducer from './floorReducer/floorReducer';

import FloorDetail from './floorReducer/floorReducer'

import ChangePassword from './changePasswordReducer.js/changePasswordReducer';
import resetPasswordReducer from './resetpasswordReducer/resetPasswordReducer';
import societyEventBookingReducer from './societyEventBooking/societyEventBookingReducer';
import activeDeactive from './activeDeactive/activeDeactiveReducer';

import AssignRolesReducer from './assignRolesReducer/assignRolesReducer';
import IndividualVendorReducer from './individualVendorReducer/individualVendorReducer';
import  MachineIdDetails from './MachineIdMasterReducer.js/machineIdMaster'
import registerComplaintReducer from './registerComplaintReducer/registerComplaintReducer';
import commonAreaReducer from './commonAreaReducer/commonAreaReducer';
import RFIdReducer from './rfReducer/rfReducer'
import commonAreaMachineReducer from './commonAreaMachineReducer/commonAreaMachineReducer';
import viewComplaintsReducer from './viewComplaintsReducer/viewComplaintsReducer';
import electricityExpenseReducer from './electricityExpenseMaster/electricityExpenseMasterReducer';
import monthlyElectricityExpenseReducer from './monthlyElectricityExpenseReducer/monthlyElectricityExpenseReducer';
import PurchaseOrder from './purchaseOrderReducer/purchaseOrderReducer';
import PersonalEventBookingReducer  from './personalEventBookingReducer/personalEventBookingReducer';
import fingerprintReducer  from './fingerprint/fingerprintMaster';
import FacilitySubMasterReducer from './facilitySubMasterReducer/facilitySubMasterReducer';
import  facilityReducer from  './facilityReducer/facilityReducer';
import  userFacilityReducer from  './userFacilityReducer/userFacilityReducer';
import  ownerAccessReducer from  './ownerAccessReducer/ownerAccessReducer';


const rootReducer = combineReducers({
    loginReducer,
    userDetail,
    TowerDetails,
    SizeDetails,
    flat,
    EventDetails,
    parkingDetail,
    cityMasterReducer,
    flats,
    serviceMasterReducer,
    displayServiceMasterReducer,
    vendorMasterReducer,
    societyReducer,
    personDetails,
    AssetsReducer,
    AssetsTypeReducer,
    flatDetailMasterReducer,
    locationMasterReducer,
    countryDetails,
    Inventory,
    MaintenanceMasterReducer,
    employeeDetails,
    MaintenanceSubMaster,
    EmpDetails,
    DesignationMasterReducer,
    RelationMasterReducer,

    societyMemberEventReducer,
    memberEventsBookingReducer,
    eventSpaceMasterReducer,
    boardMemberReducer,
    tenantReducer,
    FlatOwnerReducer,
    forgetPasswordReducer,
    FloorReducer,
    FloorDetail,
    societyEventBookingReducer,
    ChangePassword,
    resetPasswordReducer,
    activeDeactive,
    AssignRolesReducer,
    IndividualVendorReducer,
    registerComplaintReducer,
    MachineDetails,
    commonAreaReducer,
    commonAreaMachineReducer,
    RFIdReducer,
    MachineIdDetails,
    viewComplaintsReducer,
    electricityExpenseReducer,
    monthlyElectricityExpenseReducer,
    PurchaseOrder,
    PersonalEventBookingReducer,
    fingerprintReducer,
    FacilitySubMasterReducer,
    facilityReducer,
    userFacilityReducer,
    ownerAccessReducer
})
export default rootReducer;