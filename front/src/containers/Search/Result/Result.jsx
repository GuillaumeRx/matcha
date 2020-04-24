import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../../../api/api'
import { notifSocket } from '../../../api/socket';
import { COLORS, SPACING, BREAK_POINTS } from '../../../config/style';
import { UserContext } from '../../../context/UserContext';
import findAge from '../../../helper/findAge'
import UserImages from '../../../helper/UserImages/UserImages';

const ResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > * {
		margin-top: 4vh;
	}
`

const UserContainer = styled.div`
	width: auto;
	min-height: 60%;
	border-radius: 15px;
	padding: ${SPACING.BASE};
	background-image: linear-gradient(90deg, ${COLORS.ORANGE_GRADIENT} 30%, ${COLORS.PINK_GRADIENT} 90%);
	box-shadow: 0px 0px 31px -5px rgba(0,0,0,0.75);
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		padding: ${SPACING.XS};
	}
`

const HeadContainer = styled.div`
	display: flex;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
		align-items: center;
	}
`

const ImagesContainer = styled.div`
	width: 40%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
	}
`

const Infos = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		align-items: start;
		justify-content: center;
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		margin-left: ${SPACING.BASE};
	}
`

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
		margin-left: ${SPACING.BASE}
	}
`

const GenderOrientationAgeContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
		margin-left: ${SPACING.BASE}
	}
`

const Text = styled.span`
	color: ${COLORS.BLACK};
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 0.8em;
	}
`

const Biography = styled.span`
	display: flex;
	justify-content: stretch;
	min-height: 50px;
	padding: ${SPACING.XXS} ${SPACING.XS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
`

const RowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`

const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 12px;
		width: 12px;
		margin-right: ${SPACING.XXS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 28px;
		width: 28px;
		margin-right: ${SPACING.XS};
	}
	border-radius: 50%;
	background-color: ${COLORS.PINK_FLASHY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
`

const Chip = styled.div`
	display: flex;
	align-items: center;
	color: white;
	background-color: ${COLORS.PURPLE};
	margin: ${SPACING.XXS};
	padding: ${SPACING.XXS} ${SPACING.XS};
	font-size: 0.5em;
	font-weight: 300;
	border-radius: 32px;
`

const ChipsContainer = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
	}
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
`

const Bottom = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		align-items: center;
	}
	margin-top: ${SPACING.BASE};
	display: flex;
	justify-content: space-evenly;
`
const Box = styled.div`
	padding: ${SPACING.XXS} ${SPACING.XS};
	background-color: ${COLORS.GREY};
	border-radius: 32px;
`

function User(props) {
	const { user } = useContext(UserContext);
	const [like, setLike] = useState(props.user.liked);
	const [block, setBlock] = useState(false);

	const likeMatch = () => {
		api.post(`/user/like/${props.user._id}`)
		.then((res) => {setLike(true)})
		.catch((err) => {console.log(err)})
		notifSocket.emit('notification', {
			type: 'like',
			to: props.user._id,
			from: user._id
		})
	}

	const unlikeMatch = () => {
		api.post(`/user/unlike/${props.user._id}`)
		.then((res) => {setLike(false)})
		.catch((err) => {console.log(err)})
	}

	const blockMatch = () => {
		api.post(`/user/block/${props.user._id}`)
		.then((res) => {
			document.getElementById(props.user.username).style.display = "none";
			setBlock(true)})
		.catch((err) => {console.log(err)})
	}

	const unblockMatch = () => {
		api.post(`/user/unblock/${props.user._id}`)
		.then((res) => {setBlock(false)})
		.catch((err) => {console.log(err)})
	}

	let hobbiesArray = [];
	
	if (props.user.hobbies.length <= 5)
		hobbiesArray = props.user.hobbies; 
	else 
		hobbiesArray = props.user.hobbies.splice(5, props.user.hobbies.length);
	
	const userHobbies = hobbiesArray.map((hobby, index) => {
		if (index < hobbiesArray.length - 1)
			return ("#" + hobby.name + " - ")
		else
			return ("#" + hobby.name)
	})

	return (
		<UserContainer id={props.user.username}>
			<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
				<HeadContainer id="HeadContainer">
					<ImagesContainer id="ImagesContainer">
						<UserImages match={props.user} id="UserImages"/>
					</ImagesContainer>
					<Infos id="Infos">
						<NameContainer id="NameContainer">
							<Text>{`@${props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}`}</Text>
							<Text>{`${props.user.firstname.charAt(0).toUpperCase() + props.user.firstname.slice(1)} ${props.user.lastname.charAt(0).toUpperCase() + props.user.lastname.slice(1)}`}</Text>
						</NameContainer>
						<GenderOrientationAgeContainer id="GenderOrientationAgeContainer">
							<Text>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</Text>
							<Text>{props.user.orientation.name.charAt(0).toUpperCase() + props.user.orientation.name.slice(1)}</Text>
							<Text>{`${findAge(props.user.birthdate)} Yo`}</Text>
						</GenderOrientationAgeContainer>
					</Infos>
				</HeadContainer>
				<RowContainer id="RowContainer">
					<ChipsContainer id="ChipsContainer">
					{
						props.user.hobbies.map(hobby =>
							<Chip id="Chip">
								<Icon>
									<i class="fab fa-slack-hash"></i>
								</Icon>
								<span>{hobby.name}</span>
							</Chip>
						)
					}
					</ChipsContainer>
				</RowContainer>
				<Biography id="Biography">
					{`${props.user.biography}`}
				</Biography>
				<Bottom id="Bottom">
					{props.user.likes && <Box>{"Already likes you"}</Box>}
					{props.user.isSeen && <Box>{"Already saw your profile"}</Box>}
				</Bottom>
				{/* <ButtonsContainer>
					<div onClick={previousMatch}>
						<i className="fas fa-chevron-left fa-3x"></i>
					</div>
					<div onClick={likeMatch}>
						{like ? <Favorite fontSize="large"/> : <FavoriteBorder fontSize="large"/>}
					</div>
					<div onClick={nextMatch}>
						<i className="fas fa-chevron-right fa-3x"></i>
					</div>
				</ButtonsContainer> */}
			</Link>
		</UserContainer>

		// <UserContainer id={props.user.username}>
		// 	<PaperContainer elevation={3} component="div">
		// 		<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
		// 			<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} style={{width: '70vw'}}/>
		// 			<Name>{props.user.firstname} {props.user.lastname}</Name>
		// 			<InfoContainer>
		// 				<Info>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</Info>
		// 				<Info style={{marginLeft: '2vw'}}>{findAge(props.user.birthdate)} years old</Info>
		// 				<Info style={{marginLeft: '2vw'}}>{props.user.orientation.name}</Info>
		// 			</InfoContainer>
		// 			<Hobbies>Interested in {userHobbies}</Hobbies>
		// 			<Biography>{props.user.biography}</Biography>
		// 		</Link>
		// 		<ActionContainer>
		// 			{ like === false ? <FavoriteIcon onClick={likeMatch} htmlColor='#FAE3D9' /> : <CancelIcon onClick={unlikeMatch} htmlColor='#FAE3D9' />}
		// 			{ block === false ? <BlockIcon onClick={blockMatch} style={{marginLeft: "1.5em"}}></BlockIcon> : <ReplayIcon onClick={unblockMatch} style={{marginLeft: "1.5em"}}></ReplayIcon>}
		// 		</ActionContainer>
		// 	</PaperContainer>
		// </UserContainer>
	);
}

function Result(props) {
	const Users = () => {
		return (
			props.result.map((user, index) => {
				return (<User user={user} key={index}/>);
			}
		));
	}

	return (
		<ResultContainer id="ResultContainer">
			<Users/>
		</ResultContainer>
	);
}

export default Result;