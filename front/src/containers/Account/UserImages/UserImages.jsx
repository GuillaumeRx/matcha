import React from 'react';
import { useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../../context/UserContext';
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button, styled as styledMaterial } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import logo from '../../../media/cerisier.jpg';
import './UserImages.css'

// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';
import { Slide } from 'react-slideshow-image'

const InputWrapper = styledMaterial(TextField)({
	fontSize: '1rem',
	color: '#OOB7FF'
});

const useStyles = makeStyles({
	root: {
		background: '#FF3860',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	}, img: {
		marginTop: '2em',
	}, imageContainerStyle: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: theme.palette.background.paper,
	}, imageStyle: {
		// width: 500,
		// height: 450,
	},
});

function UserImages() {
	const classes = useStyles();
	
	// const { user, setUser } = useContext(UserContext);
	const [userPictures, setUserPictures] = useState([]);
	const [selectedFile, setSelectedFile] = useState();
	
	// Add a picture in the application state
	const addPictureFile = (e) => {
		setSelectedFile({
			...selectedFile, 
			file: e.target.files[0],
			loaded: 0,
		});	
	}

	// Upload the picture from app to server
	const uploadPicture = () => {
		if (selectedFile && selectedFile.file) {
			if (userPictures.length < 5) {
				const data = new FormData()
				data.append('picture', selectedFile.file, {})
				api.post('/user/picture', data)
				.then((res) => {
					getUserPictures();
				})
				.catch((err) => {
					console.log(err);
				})
			}
			else
				alert('you cant have more than 5 pictures');
		}
	}

	const getUserPictures = () => {
		api.get('/user/picture')
		.then((res) => {
			setUserPictures(res.data);
			console.log(res.data)
			console.log(`getUserPictures ${res.data}`);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const deleteUserPicture = (id) => {
		console.log(id);
		api.delete('/user/picture', { data: { _id: id } })
		.then((res) => {
			getUserPictures();
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	// const slider = (
	// 	  <div data-src="/path/to/image-0.png" />
	// 	  <div data-src="/path/to/image-1.png" />
	// 	  <div data-src="/path/to/image-2.jpg" />
	//   );
	  
	//   const UserImagesJsx = () => {
	// 	return (
	// 		<AwesomeSlider>
	// 		{
	// 			userPictures.map(text =>
	// 				<div data-src={text.url} />
	// 				// <img src={text.url} alt={text.name} onClick={() => deleteUserPicture(text._id)}/>
	// 			)
	// 		}
	// 		</AwesomeSlider>
	// 	);
	// }
	  
	const properties = {
		duration: 5000,
		transitionDuration: 500,
	}

	const SlideShow = () => {
		return (
			<div className="main-container-slide">
				<Slide {...properties}>
					<div className="one-slide">
						<div>
						{
							userPictures.map((text, index) =>
								<img id={`profile-image-${index}`} src={text.url} alt={text.name} onClick={() => deleteUserPicture(text._id)}/>
							)
						}
						</div>
					</div>
				</Slide>
			</div>
		);
	}

	const UserImagesJsx = () => {
		return (
			<div className={classes.imageContainerStyle}>
				<GridList className={classes.imageStyle} cols={3}>
					{
						userPictures.map((text, index) =>
							<GridListTile key={text._id} cols={1}>
								<img id={`profile-image-${index}`} src={text.url} alt={text.name} onClick={() => deleteUserPicture(text._id)}/>
							</GridListTile>
						)
					}
				</GridList>
			</div>
		);
	}

	// const UserImagesJsx = () => {
	// 	return (
	// 		<div className={classes.imageContainerStyle}>
	// 			<GridList className={classes.imageStyle} cols={3}>
	// 				{
	// 					userPictures.map((text, index) =>
	// 						<GridListTile key={text._id} cols={1}>
	// 							<img id={`profile-image-${index}`} src={text.url} alt={text.name} onClick={() => deleteUserPicture(text._id)}/>
	// 						</GridListTile>
	// 					)
	// 				}
	// 			</GridList>
	// 		</div>
	// 	);
	// }
	// <img src={text.url} alt="alt" key={text.id} className={classes.img} onClick={() => deleteUserPicture(text.id)}/>

	if (!userPictures.length)
		getUserPictures();

		return (
		<div id="main-container">
			<div id="user-images-display-small">
			{ userPictures.length && <SlideShow /> }
			</div>
			<div id="user-images-upload-small">
				{ userPictures.length < 5 && <InputWrapper type="file" name="file" label="" onChange={addPictureFile} variant="filled"/> }
				{ userPictures.length < 5 && <Button type="button" className={classes.root} onClick={uploadPicture}>Upload</Button> }
			</div>
		</div>
	);
}

export default UserImages;