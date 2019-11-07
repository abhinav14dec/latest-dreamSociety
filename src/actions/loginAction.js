 import axios from 'axios';
import{URN,USER_LOGIN} from '../actionCreators/index';
export function login(username, password) {
    const request = axios({
        method: 'post',
        url: `${URN}/auth/signin`,
        data: {
            userName: username,
            password:  password
        }
      });
         
    return {
        type: USER_LOGIN,
        payload: request
    }
}
export function userLogout() {
    console.log('logout function')
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    localStorage.removeItem('societyId');
    localStorage.removeItem('societyName');
    localStorage.removeItem('countryName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('stateName');
    localStorage.removeItem('cityName');
    localStorage.removeItem('locationName');
    localStorage.removeItem('userId');
    this.history.push('/');
    return {type:'',payload:''};

}



