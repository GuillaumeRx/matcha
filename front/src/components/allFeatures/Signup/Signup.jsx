import React from 'react';
import { Link } from 'react-router-dom';

import './Signup.css';
import styled from "styled-components";
import snail from '../../../media/snail.jpg';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { makeStyles, styled as styledMaterial } from '@material-ui/core/styles';

import Login from '../../allFeatures/Login/Login';


const useStyles = makeStyles(theme => ({
  root: {
	'& > *': {
	  margin: theme.spacing(1),
	  width: 200,
	},
  },
}));

const TitleWrapper = styledMaterial(Typography)({
	fontSize: '2rem',
});

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	width: '20rem',
});

// const Test = styled.div`
// 	background-color: black;
// 	height: 1000px;
// 	width: auto;
// `
// const TestMod = styled(Test)`
// 	background-color: ${props => props.color};
// `

function Signup() {
	const classes = useStyles();

	return (
		<div id="signup-component">
			<div id="signup-container">
				<div id="signup-left">
					<img src={snail} alt=""/>
				</div>
				<div id="signup-right">
					<div id="signup-right-top">
						<TitleWrapper component='h1'>
							Matcha
						</TitleWrapper>	
					</div>
					<div id="signup-right-bottom">
						<form id="credentials-form" className={classes.root} noValidate autoComplete="off">
							<InputWrapper id="outlined-basic" label="username" variant="outlined" />
							<InputWrapper id="outlined-basic" label="password" variant="outlined" />
							<Button color="secondary" >submit</Button>
						</form>
						<div id="redirect-login">
							<p>Already have an account?</p>
							<Button color="secondary" >
								<Link to="/login" >
									login
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


export default Signup;