import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';
import { UserContext } from '../../context/UserContext';

import api from '../../api/api'
import { colors, device } from '../../config/style'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { InputWrapper } from '../../components/Wrapper/Wrapper.jsx';
import { TextField } from '@material-ui/core';

import UserImages from './UserImages/UserImages'
import Birthdate from './Birthdate/Birthdate'
import GenderDropdown from './GenderDropdown/GenderDropdown'
import OrientationDropdown from './OrientationDropdown/OrientationDropdown'
import Hobby from './Hobby/Hobby'
import SubmitForm from './SubmitForm/SubmitForm'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
}));

const AccountContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 280vh;
	margin-top: 6vh;
	margin-bottom: 8vh;
	background-image: linear-gradient(90deg, ${colors.one} 30%, ${colors.one} 90%);
`

const AccountSubContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: scroll;
`

const UserForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 2em;
`

function Account() {
	const classes = useStyles();
	
	const { user, setUser } = useContext(UserContext);

	const [openGender, setOpenGender] = useState(false);
	const [openOrientation, setOpenOrientation] = useState(false);	
	const [openHobby, setOpenHobby] = useState(false);

	const dropdowns = {
		openGender: openGender, 
		setOpenGender: setOpenGender,
		openOrientation: openOrientation,
		setOpenOrientation : setOpenOrientation,
		openHobby: openHobby,
		setOpenHobby: setOpenHobby,	
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {console.log(res);})
		.catch((err) => {console.log(err);})
	}

	const handleEmail = (e) => {setUser({...user, email: e.target.value});}
	const handleUsername = (e) => {setUser({...user, username: e.target.value});}
	const handleFirstname = (e) => {setUser({...user, firstname: e.target.value});}
	const handleLastname = (e) => {setUser({...user, lastname: e.target.value});}
	const handleBirthdate = (e) => {setUser({...user, birthdate: e.target.value});}
	const handleBiography = (e) => {setUser({...user, biography: e.target.value});}

	return (
		<>
		<Header />
		<AccountContainer>
			<AccountSubContainer className={classes.root}>
				<UserImages />
				<UserForm id="edit-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
					<InputWrapper variant="outlined" label="email" value={ user && user.email ? user && user.email : "" } name="email" onChange={handleEmail}/>
					<InputWrapper variant="outlined" label="username" value={ user && user.username ? user && user.username : "" } name="username" onChange={handleUsername}/>
					<InputWrapper variant="outlined" label="firstname" value={ user && user.firstname ? user && user.firstname : "" } name="firstname" onChange={handleFirstname}/>
					<InputWrapper variant="outlined" label="lastname" value={ user && user.lastname ? user && user.lastname : "" } name="lastname" onChange={handleLastname}/>
					<TextField placeholder="biography" multiline rows={2} rowsMax={4} value={ user && user.biography ? user && user.biography : "" } name="biography" onChange={handleBiography}/>
					<Birthdate update={handleBirthdate}/>
					<GenderDropdown user={user} dropdowns={dropdowns} />
					<OrientationDropdown user={user} dropdowns={dropdowns}/>
					<Hobby dropdowns={dropdowns}/>
					<SubmitForm/>
				</UserForm>
			</AccountSubContainer>
		</AccountContainer>
		<Footer />
		</>
	);
}

export default Account;