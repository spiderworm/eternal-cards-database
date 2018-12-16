
function SetItem(id, name) {
	
}

SetItem.create = function(props) {
	return new SetItem({ id: props.id, name: props.name || null });
};

module.exports = SetItem;
