import React, { useState, useMemo } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Homepage from '../containers/Homepage/Homepage';
import Account from '../containers/Account/Account';
import Match from '../containers/Match/Match';
import Search from '../containers/Search/Search';
import Profile from '../containers/Profile/Profile';

import Signup from '../containers/Signup/Signup';
import Login from '../containers/Login/Login';
import NoMatch from '../containers/NoMatch/NoMatch';

import { UserContext } from '../context/UserContext'

import { usePosition } from '../hooks/usePosition';
import api from '../api/api';

const AuthenticatedRoute = ({ component: Component, ...rest}) => {
	return (
	<Route 
		{...rest}
		render = { props => {
			if (localStorage.getItem("token"))
				return (<Component {...props} />)
			return (<Redirect to={{pathname: '/login', state: {from: props.location }}} />);
		}}
	/>
	)
}

function App() {
	const [user, setUser] = useState(null);
	const [userLocation, setUserLocation] = useState();
	const {latitude, longitude, error} = usePosition();
	const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);

	if (localStorage.getItem('token') && !api.defaults.headers.common['Authorization']) {
		api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
		api.get('/user/me').then((res) => {setUser(res.data);}).catch(err => console.log(err));
	}

	// const handleUserLocation = (position) => {
	// 	console.log(position);
	// 	console.log('handleUserLocation');
	// 	setUserLocation(position);
	// }
	
	// if (localStorage.getItem('token')) {
	// 	fetch(`http://www.geoplugin.net/json.gp?jsoncallback=?`)
	// 	.then((response) => {
	// 		setUserLocation(response)
	// 		console.log(response);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err)
	// 	})
	// }

	console.log("userLocation");
	console.log(userLocation);
	console.log("latitude");
	console.log(latitude);
	console.log("longitude");
	console.log(longitude);
	console.log("error");
	console.log(error);

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
			<UserContext.Provider value={ userMemo }>
				<BrowserRouter>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
					<Switch>
						<AuthenticatedRoute exact path="/" component={Homepage} />
						<AuthenticatedRoute exact path="/home" component={Homepage} />
						<AuthenticatedRoute exact path="/account" component={Account} />
						<AuthenticatedRoute exact path="/match" component={Match} />
						<AuthenticatedRoute exact path="/search" component={Search} />
						<AuthenticatedRoute exact path="/profile" component={Profile} />
						<Route path="*" component={NoMatch} />
					</Switch>
				</BrowserRouter>
			</UserContext.Provider>
		</SnackbarProvider>
	)
}

export default App;

/*
use ...state because setState overwrite ancient state ()
	const eventHandler = (value) => {
		setState({ ...state, property: value})
	}
*/

	// 	if (userIsLog == false && localStorage.token)
	// 		setUserIsLog(true);
	
	// 	if (userIsLog === false)	
	// 		return <Connexion />;
	// 	else if (userIsLog === true)
	// 		return <Application />;
	// 	return <Application />;
	