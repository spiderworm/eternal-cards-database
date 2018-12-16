const setDatabase = require('../sets/setDatabase.js');
const SetItem = require('../sets/Set.js');

function Card(
	eternalID,
	set,
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
	this.set = set;
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

Card.prototype.export = function() {
	const exported = JSON.parse(JSON.stringify(this));
	if (exported.set) {
		exported.setID = exported.set.id;
	}
	delete exported.set;
	return exported;
};

Card.create = function(props) {
	let set = null;
	if (props.setID || props.setID === 0) {
		set = setDatabase.getByID(props.setID);
	}

	return new Card(
		props.eternalID,
		set,
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
			SetItem.setsMatch(c1.set, c2.set) &&
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
