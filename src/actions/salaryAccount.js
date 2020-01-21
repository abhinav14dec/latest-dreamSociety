import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { toasterMessage } from "../utils.js";
import { URN, ADD_EMPLOYEE_ACCOUNT, GET_EMPLOYEE_ACCOUNT, UPDATE_EMPLOYEE_ACCOUNT, DELETE_EMPLOYEE_ACCOUNT, DELETE_SELECTED_EMPLOYEE_ACCOUNT, ACTIVATE_EMPLOYEE_ACCOUNT ,GET_ACTIVE_EMPLOYEE_ACCOUNT} from '../actionCreators/index';

export function addEmployeeAccount(values) {
    const request = axios.post(`${URN}/salary/account`, values, { headers: authHeader() });
    return {
        type: ADD_EMPLOYEE_ACCOUNT,
        payload: request
    }
}

// export function getEmployeeAccount() {
//     const request = axios.get(`${URN}/salary/account`, { headers: authHeader() })
//         .then(response => response.data)
//         .catch(error => error)
//     return {
//         type: GET_EMPLOYEE_ACCOUNT,
//         payload: request
//     }
// }

export function viewAccounts(id) {
    const request = axios.get(`${URN}/salary/account/` + id, { headers: authHeader() })
        .then(response => response.data)
    return {
        type: GET_EMPLOYEE_ACCOUNT,
        payload: request
    }
}

export function viewActiveAccounts(id) {
    const request = axios.get(`${URN}/salary/active/account/` + id, { headers: authHeader() })
        .then(response => response.data)
    return {
        type: GET_ACTIVE_EMPLOYEE_ACCOUNT,
        payload: request
    }
}


export function updateAccount(accountId, bankName, accountNo, pan) {
    const request = axios.put(`${URN}/salary/account/${accountId}`, { bankName, accountNo, pan }, { headers: authHeader() })
        .then(response => response.data)
        .then(error => error)
    return {
        type: UPDATE_EMPLOYEE_ACCOUNT,
        payload: request
    }
}

export function deleteAccount(accountId) {
    const request = axios.put(`${URN}/salary/account/delete/${accountId}`, { headers: authHeader() })
        .then(response => response.data)
        .then(error => error)
    return {
        type: DELETE_EMPLOYEE_ACCOUNT,
        payload: request
    }
}

export function deleteSelectedAccount(ids) {
    const request = axios.put(`${URN}/salary/account/delete/deleteSelected`, { ids }, { headers: authHeader() })
        .then(response => response.data)
        .then(error => error)
    return {
        type: DELETE_SELECTED_EMPLOYEE_ACCOUNT,
        payload: request
    }
}

export function activateAccount(accountId, employeeId) {
    const request = axios.put(`${URN}/salary/account/activate/${accountId}/${employeeId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(err => {
            console.log("EWREWREr", err)
            if (err.isAxiosError) {
                toasterMessage("error", err.response.data.message);
            }
            else {
                toasterMessage("error", err.response.data.message);
            }
        });

    return {
        type: ACTIVATE_EMPLOYEE_ACCOUNT,
        payload: request
    }
}