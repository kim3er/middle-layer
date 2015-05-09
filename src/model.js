import { Config } from './config';

export class Model extends Config {

	convertResource(obj) {
		let self = this;

		var resource = Object.assign({}, obj);

		for (let fieldType in self.fieldTypes) {
			if (!resource[fieldType]) {
				continue;
			}

			let convertor = self.fieldTypes[fieldType];

			if (typeof convertor === 'string') {
				switch (convertor) {
					case 'date':
						let m = `${fieldType}Moment`;

						resource[m] = moment(resource[fieldType]);
						resource[fieldType] = resource[m].format('lll');

						break;
				}
			}
			else {
				resource[fieldType] = convertor(resource[fieldType]);
			}
		}

		return resource;
	}

	convertCollection(arr) {
		let self = this;

		var collection = [];

		arr.forEach(function(obj) {
			collection.push(self.convertResource(obj));
		});

		return collection;
	}

	convert(val) {
		if (Array.isArray(val)) {
			return this.convertCollection(val);
		}
		else {
			return this.convertResource(val);
		}
	}
}
