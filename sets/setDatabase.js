const SetItem = require('./Set.js');

let instance;

function SetDatabase() {
	if (instance) {
		return instance;
	}
	instance = this;
	this._items = [
		SetItem.create({ id: 0, name: 'The Empty Throne' }),
		SetItem.create({ id: 1, name: 'The Empty Throne' }),
		SetItem.create({ id: 2, name: 'Omens of the Past' }),
		SetItem.create({ id: 3, name: 'The Dusk Road' }),
		SetItem.create({ id: 4, name: 'The Fall of Argenport' }),
		SetItem.create({ id: 5, name: 'Defiance' }),
		SetItem.create({ id: 1001, name: 'Jekk’s Bounty' }),
		SetItem.create({ id: 1002, name: 'The Tale of Horus Traver' }),
		SetItem.create({ id: 1003, name: 'Dead Reckoning' }),
		SetItem.create({ id: 1004, name: 'Into Shadow' }),
	];
}

SetDatabase.prototype.getByID = function(id) {
	const result = this._items.find(set => set.id === id);
	return result;
};

module.exports = new SetDatabase();
