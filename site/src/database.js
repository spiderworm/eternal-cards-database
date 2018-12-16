import database from 'eternal-cards-database/index.js';
import imagePreloader from './imagePreloader.js';

database.forEach(card => {
	imagePreloader.enqueue(card.imageURL);
});

export default database;
