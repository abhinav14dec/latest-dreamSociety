import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { URN, UPDATE_ELECTRICITY_EXPENSE, DELETE_SELECTED_ELECTRICITY_EXPENSE, DELETE_ELECTRICITY_EXPENSE, GET_FLOOR_OF_TOWER, GET_ELECTRICITY_EXPENSE, GET_RATE_FOR_ELECTRICITY, ADD_ELECTRICITY_EXPENSE } from '../actionCreators/index';

export function getfloorsOfTowers(towerId) {
    console.log("towerId", towerId);
    const request = axios.get(`${URN}/towerFloor/${towerId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: GET_FLOOR_OF_TOWER,
        payload: request
    }
}

export function addElectricityExpense(values) {
    console.log(values);
    const request = axios.post(`${URN}/electricityConsumer`, values, { headers: authHeader() })

    return {
        type: ADD_ELECTRICITY_EXPENSE,
        payload: request
    }
}


export function getRateForElectricityExpense() {
    const request = axios.get(`${URN}/electricity/rate`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: GET_RATE_FOR_ELECTRICITY,
        payload: request
    }
}

export function getElectricityExpense() {
    const request = axios.get(`${URN}/electricityConsumer`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: GET_ELECTRICITY_EXPENSE,
        payload: request
    }
}

export const deleteElectricityExpense = (electricityConsumerId) => {
    const data = {
        // electricityConsumerId,
        isActive: false
    }
    const request = axios.put(`${URN}/electricityConsumer/delete/${electricityConsumerId}`, data, { headers: authHeader() })
        .then(response => response.data)
    return {
        type: DELETE_ELECTRICITY_EXPENSE,
        payload: request
    }
}

export function deleteSelectedElectricityExpense(ids) {
    console.log("ids in axios==>",ids);
    const request = axios.put(`${URN}/electricityConsumer/delete/deleteSelected`, { ids }, { headers: authHeader() })
        .then(response => response.data)
        .then(error => error)
    return {
        type: DELETE_SELECTED_ELECTRICITY_EXPENSE,
        payload: request
    }
}

export function updateElectricityExpense(electricityConsumerId,rate, amount, sanctionedLoad, lastReading, lastReadingDate,amountDue) {
    const request = axios.put(`${URN}/electricityConsumer/${electricityConsumerId}`,{ rate, amount, sanctionedLoad, lastReading, lastReadingDate,amountDue}, { headers: authHeader() })
        .then(response => response.data)
    .then(error => error)
    return {
        type: UPDATE_ELECTRICITY_EXPENSE,
        payload: request
    }
}


