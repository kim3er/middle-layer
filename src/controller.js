export function route(route) {
	return function(target, key, descriptor) {
		var fn = descriptor.value;

		delete descriptor.value;
		delete descriptor.writable;

		if (!route) {
			route = key;
		}

		descriptor.get = function() {
			var bound = fn.bind(this, route);

			Object.defineProperty(this, key, {
				configurable: true,
				writable: true,
				value: bound
			});

			return bound;
		};

		if (!target.routes) {
			target.routes = [];
		}

		target.routes.push({ match: route, action: key });

	};
}

export class MlController {

	actions() {
		return [];
	}

	constructor(app = {}) {
		this.app = app;
	}

	render(template, data = {}) {
		return this.app.renderer.render(template, data);
	}

}
