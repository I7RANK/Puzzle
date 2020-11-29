function toJson() {
	var levels = {
		"lvl_1": [
			["", "", "", "", "fin", "", "", "", "", "rec", "curv", "curv", "", "", "rec", "rec", "curv", "rec", "rec", "curv", "ini", "", "", "", ""],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 1, 1, 3, 2, 2, 2, 3, 0, 0, 0, 0]
		],
		"lvl_2": [
			["", "", "", "", "fin", "", "", "", "", "rec", "curv", "curv-x2", "", "", "rec", "rec", "curv", "rec", "rec", "curv", "ini", "", "", "", ""],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 1, 1, 3, 2, 2, 2, 3, 0, 0, 0, 0]
		],
		"lvl_3": [
			["curv", "rec", "rec", "curv", "", "rec", "curv", "rec", "curv", "", "rec", "curv", "rec", "curv", "fin", "curv", "rec", "rec", "curv-x2", "curv", "", "", "", "ini", ""],
			[4, 2, 2, 1, 0, 1, 4, 2, 2, 0, 1, 3, 2, 1, 1, 3, 2, 2, 1, 2, 0, 0, 0, 3, 0]
		]
	}

	for (var key in levels) {
		var value = levels[key];

		console.log(value);
	}

	fetch("./levels_file.json")
	.then(response => {
		return response.json();
	})
	.then(data => console.log(data));
}
