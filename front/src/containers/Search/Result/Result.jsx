import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core'

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
	align-items: center;
`

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
	margin-top: 3vh;
`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '0.5rem',
	color: "#FFF",
	marginTop: '2vh',
	marginBottom: '1vh',
});

function User(props) {
	// const userHobbies = props.user.hobbies.slice(0, 2);

	let d1 = Date.now();
	let d2 = new Date(props.user.birthdate).getTime();
	let millisecondDiff = d2 - d1;
	

	return (
		<Link to="/profile" user={props.user} style={{ textDecoration: 'none' }}>
			<UserContainer>
				<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} />
				<TextWrapper>{ props.user.firstname }</TextWrapper>
				<TextWrapper>{ props.user.lastname }</TextWrapper>
				<TextWrapper>{ props.user.lastname }</TextWrapper>
			</UserContainer>
		</Link>
	);
}


function Result(props) {

	return (
		<ResultContainer>
			{
				props.result.map((user, index) =>
					<User user={user} key={index}/>	
				)
			}
		</ResultContainer>
	);
}

export default Result;