const CardDatabase = require('../cards/CardDatabase.js');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const request = require('request');
const CURRENT_RELEASE = require('../CURRENT_RELEASE.js');



const db = CardDatabase.createFromReleaseExport(CURRENT_RELEASE);

const baseDir = path.resolve(__dirname, '../built/assets/');

fs.removeSync(baseDir); 

const writes = prepareWrites();

doWrite(writes, 0);

writeIndexFile();





function doWrite(writes, i) {
	const doNext = () => doWrite(writes, i+1);
	if (writes[i]) {
		w = writes[i];
		mkdirp.sync(w.dir);
		writeCopyright(w.dir);
		fs.writeFileSync(w.json, JSON.stringify(w.card.export(), null, "\t"));
		downloadFile(w.card.imageURL, w.image, doNext);
	}
}

function prepareWrites() {
	const results = {};

	function createResult(card, name) {
		const setDir = sanitizeDirectoryName(card.set ? card.set.name : "none");
		const sanitizedName = sanitizeDirectoryName(name)
		const dir = path.join(baseDir, setDir, sanitizedName);
		const fileBase = path.join(dir, sanitizedName);

		results[name] = {
			card: card,
			dir: dir,
			set: setDir,
			json: `${fileBase}.json`,
			image: `${fileBase}.png`,
		};
	}

	db.forEach(card => {
		const nameSimple = card.name;
		let nameArrayed = `${nameSimple}-1`;
		let name;

		if (results[nameArrayed]) {
			let i = 1;
			while (results[nameArrayed]) {
				i++;
				nameArrayed = `${nameSimple}-${i}`;
			}
			name = nameArrayed;
		} else if (results[nameSimple]) {
			createResult(results[nameSimple].card, nameArrayed, results[nameSimple].set);
			delete results[nameSimple];
			nameArrayed = `${nameSimple}-2`;
			name = nameArrayed;
		} else {
			name = nameSimple;
		}

		createResult(card, name);
	});

	return Object.keys(results).map(key => results[key]);
}

function sanitizeDirectoryName(name) {
	return name.replace(/,|'|"/g, '').replace(/\s/g, '_');
}

function downloadFile(url, dest, onDone) {
	request.head(url, function(){
		request(url).pipe(fs.createWriteStream(dest)).on('close', onDone);
	});
}

function writeIndexFile() {
	function getLocalJsonPath(w) {
		return w.json.replace(baseDir, '.');
	}

	const filePath = path.join(baseDir, 'eternal-cards-dev.js');
	const text = (
`const exported = {
	eternalVersion: 'dev',
	cards: [
${
writes.map(w => {
return (
`		require('${getLocalJsonPath(w)}'),`
)
}).join('\n')
}
	]
};

module.exports = exported;`
	);

	fs.writeFileSync(filePath, text);
}

function writeCopyright(dir) {
	const copyPath = path.join(dir, 'LICENSE');
	const text = (
`This project is not affiliated with Eternal or Dire Wolf Digital.
This is just a tool for the developers of the community.
All card data contained herein, including card images, card names, and card text, is property of and used by permission of Dire Wolf Digital.`
	);
	fs.writeFileSync(copyPath, text);
}
