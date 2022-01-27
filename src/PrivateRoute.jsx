/* eslint-disable */ 
import React from 'react';
import { Route } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
		const authState = useOktaAuth();
		console.log(authState);
		return (<Component {...props} />)
	}} />
	);
export default PrivateRoute;
