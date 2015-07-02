export class MlRouter {

	constructor(opts) {
		let defaults = {
			app: {},
			controllers: []
		};

		opts = Object.assign(defaults, opts);

		this.app = opts.app;
		this.controllers = opts.controllers;
		this.routes = { $: {} };

		if (this.controllers.length) {
			this.attachControllers();
		}

		this.attachHandlers();
	}

	goTo(actionName, data) {
		let action = this.routes.$[actionName];

		if (action) {
			return this.controllerAction(action, data);
		}
		else {
			return this.switchTemplate(actionName);
		}
	}

	controllerAction(obj, ...args) {
		return obj.controller[obj.action].apply(obj.controller, args);
	}

	switchTemplate(href, data) {
		return this.app.renderer.render(href, data);
	}

	attachControllers() {
		let self = this;

		for (let controllerClass of self.controllers) {
			let controller = new controllerClass(self.app);

			for (let route of controller.routes) {
				var action, match;

				if (typeof route === 'string') {
					action = match = route;
				}
				else {
					action = route.action;
					match = route.match;
				}

				self.routes.$[match] = { controller: controller, action: action };

				if (!self.routes[controllerClass.name]) {
					self.routes[controllerClass.name] = {};
				}

				self.routes[controllerClass.name][match] = { controller: controller, action: action };
			}
		}
	}

	/**
	 * Override this function to attach handlers
	 * @return {undefined} Nothing returned
	 */
	attachHandlers() {

	}

}
