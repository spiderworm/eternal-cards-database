
function SetItem(id, name) {
	this.id = id;
	this.name = name;
}

SetItem.create = function(props) {
	return new SetItem(props.id, props.name);
};

module.exports = SetItem;
