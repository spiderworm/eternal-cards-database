
function Card(
	eternalID,
	setID,
	name,
	text,
	cost,
	influence,
	attack,
	health,
	rarity,
	type,
	imageURL,
	detailsURL,
	deckBuildable
) {
	this.eternalID = eternalID;
	this.setID = setID;
	this.name = name;
	this.text = text;
	this.cost = cost;
	this.influence = influence;
	this.attack = attack;
	this.health = health;
	this.rarity = rarity;
	this.type = type;
	this.imageURL = imageURL;
	this.detailsURL = detailsURL;
	this.deckBuildable = deckBuildable;
}

Card.prototype.toObject = function() {
	return JSON.parse(JSON.stringify(this));
};

Card.create = function(props) {
	return new Card(
		props.eternalID,
		props.setID,
		props.name,
		props.text,
		props.cost,
		props.influence,
		props.attack,
		props.health,
		props.rarity,
		props.type,
		props.imageURL,
		props.detailsURL,
		props.deckBuildable
	);
};

Card.cardsMatch = function(c1, c2) {
	return (
		c1 === c2 || (
			c1.eternalID === c2.eternalID &&
			c1.setID === c2.setID &&
			c1.name === c2.name &&
			c1.text === c2.text &&
			c1.cost === c2.cost &&
			c1.influence === c2.influence &&
			c1.attack === c2.attack &&
			c1.health === c2.health &&
			c1.rarity === c2.rarity &&
			c1.type === c2.type &&
			c1.imageURL === c2.imageURL &&
			c1.detailsURL === c2.detailsURL &&
			c1.deckBuildable === c2.deckBuildable
		)
	);
}

module.exports = Card;
