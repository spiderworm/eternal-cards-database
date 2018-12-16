
function SetItem(id, name) {
	this.id = id;
	this.name = name;
}

SetItem.create = function(props) {
	return new SetItem(props.id, props.name);
};

SetItem.setsMatch = function(set1, set2) {
	if (!set1) {
		if (!set2) {
			return true;
		}
		return false;
	} else {
		if (!set2) {
			return false;
		}
		if (set1 === set2 || set1.id === set2.id) {
			return true;
		}
		return false;
	}
};

module.exports = SetItem;
