import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function UserPictures(props) {
	// useEffect(() => {
	// }, [pictures]);

	let pictures = props.pictures;
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	console.log("pictures", pictures);
	
	if (pictures) {
		const userPicturesArray = pictures.map((text, index) => {
			return (
				<div>
					<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text.name} /> 
				</div>
			);
		});
		// src="http://matchapi.guillaumerx.fr/images/image-1584066883258.png"
		console.log("userPicturesArray", userPicturesArray);

		const UserImagesJsx = () => {
			return (
				<Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
					{ userPicturesArray }
				</Carousel>
			);
		}

		return (
			<ImagesContainer>
				<UserImagesJsx/>
			</ImagesContainer>
		);	
	} else {
		return ;
	}
}

export default UserPictures;