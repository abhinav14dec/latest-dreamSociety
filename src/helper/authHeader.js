export function authHeader(){
    let userToken=localStorage.getItem('token');
     if(userToken){
         return {'x-access-token': userToken};
     }
     else {
         return {};
     }

}
