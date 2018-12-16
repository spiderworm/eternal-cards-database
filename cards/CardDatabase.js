const Card = require('./Card.js');

function CardDatabase() {
	this._byName = {};
	this._byId = {};
	this._noId = [];
	this._all = [];
}

CardDatabase.prototype.import = function(exported) {
	this.version = exported.eternalVersion;
	exported.cards.forEach(obj => {
		const card = Card.create(obj);
		this.addCard(card);
	});
};

CardDatabase.prototype.export = function() {
	const cards = Object.keys(this._byId).sort((a, b) => {
		if (a < b) return -1;
		if (a > b) return 1;
		return 0;
	}).map(id => {
		return this._byId[id].toObject();
	});
	cards.concat(this._noId.map(card => card.toObject()));
	const exported = { "eternalVersion": this.version, "cards": cards };
	return exported;
};

CardDatabase.prototype.forEach = function(callback) {
	return this._all.forEach(callback);
};

CardDatabase.prototype.addCard = function(card) {
	if (!this.cardCanBeAdded(card)) {
		throw new Error(`Card cannot be added: ${JSON.stringify(card.toObject())}`);
	}

	this._all.push(card);

	if (!this._byName[card.Name]) {
		this._byName[card.Name] = [];
	}
	this._byName[card.Name].push(card);


	if (card.eternalID || card.eternalID === 0) {
		this._byId[card.eternalID] = card;
	} else {
		this._noId.push(card);
	}
};

CardDatabase.prototype.cardCanBeAdded = function(card) {
	if (this._byName[card.Name]) {
		if (this._byName[card.Name].find(card2 => Card.cardsMatch(card, card2))) {
			return false;
		}
	}
	return true;
}

CardDatabase.create = () => {
	const db = new CardDatabase();

	db.import(require('../built/eternal-cards-1.42.json'));

	return db;
};

module.exports = CardDatabase;
