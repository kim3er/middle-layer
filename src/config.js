export class MlConfig {

	config() {
		return {

		};
	}

	constructor() {
		let config = this.config();
		for (let attr in config) {
			this[attr] = config[attr];
		}
	}

}
