import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const TenantPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>  (localStorage.getItem('token') && localStorage.getItem('role')=="SOCIETY MEMBER TENANT"
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
} />
)
