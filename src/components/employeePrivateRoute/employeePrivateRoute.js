import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const EmployeePrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>  (localStorage.getItem('token') && localStorage.getItem('role')=="EMPLOYEE"
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
} />
)
