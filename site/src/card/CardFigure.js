import React from 'react';
import imagePreloader from '../imagePreloader.js';
import './CardFigure.css';

const CardFigure = ({ card }) => {
	imagePreloader.prioritize(card.imageURL);

	return (
		<figure className="CardFigure" title={card.name}>
			<img src={card.imageURL} alt={card.name} />
		</figure>
	);
};

export default CardFigure;
