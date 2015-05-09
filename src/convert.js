export class Convert {

	static objectToArray(obj) {
		var arr = new Array();

		for (let key in obj) {
			arr.push({ key: key, val: obj[key] });
		}

		return arr;
	}

}
