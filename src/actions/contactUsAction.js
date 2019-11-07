import axios from 'axios';
import { URN, CONTACT_US } from '../actionCreators/index';

export function contactUsPost(email, name, message) {
    const request = axios.post(`${URN}/contactUs`, { email, name, message })
        .then((response => response.data))

    return {
        type: CONTACT_US,
        payload: request
    }
}