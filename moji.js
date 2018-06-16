

const moji = document.getElementById("moji");
const okButton = document.getElementById("ok");
const ngButton = document.getElementById("ng");

const storageKey = "hiragana";

const stored = localStorage.getItem(storageKey);
let score;
try {
	const parsed = JSON.parse(stored);
	if (!parsed) throw "failed to parse";
	score = new Map(parsed);
} catch (e) {
	const hiragana = document.getElementById('list').textContent.replace(/\s/g, "").split('');
	console.log('failed to load score');
	score = hiragana.reduce( (r, i) => {
		r.set(i, 1);
		return r;
	}, new Map());
}

console.log(score);

var current;

function nextMoji () {
	const total = Array.from(score.values()).reduce( (r, i) => r + i);
	const target = Math.random() * total;
	console.log(total);

	let n = 0;
	for (let [key, value] of score) {
		n += value;
		if (target < n) {
			return key;
		}
	}
}

function newTest () {
	current = nextMoji();
	const dump = JSON.stringify([...score]);
	localStorage.setItem(storageKey, dump);
	console.log('newTest', current, dump);
	moji.textContent = current;
}

okButton.onclick = () => {
	const s = score.get(current);
	const newScore = s / 2;
	score.set(current, newScore);
	newTest();
};

ngButton.onclick = () => {
	const s = score.get(current);
	const newScore = s * 2;
	score.set(current, newScore);
	newTest();
};

newTest();
