import { Config } from './config';

export class Service extends Config {

	config() {
		return {
			model: null,
			proxy: null
		};
	}

	convertor(val) {
		return this.model ? new this.model().convert(val) : val;
	}

	convertedPromise(promise) {
		var self = this;

		return promise.then((r) => { return self.convertor(r); });
	}

	proxyInstance() {
		var self = this;

		return new Promise((resolve) => { resolve(new self.proxy()); });
	}

	proxyCall(func) {
		var self = this;

		return new Promise(function(resolve, reject) {
				self.proxyInstance()
					.then((proxyInstance) => { resolve(proxyInstance); });
			})
			.then(func)
			.then(function(val) {
				return self.convertor(val);
			});
	}

}