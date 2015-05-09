export class Router {

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
			return this.app.switchTemplate(actionName);
		}
	}

	controllerAction(obj, ...args) {
		return obj.controller[obj.action].apply(obj.controller, args);
	}

	attachControllers(controllers = null) {
		var self = this;

		if (controllers) {
			self.controllers = controllers;
		}

		for (let controllerClass of self.controllers) {
			let controller = new controllerClass(self.app);

			for (let route of controller.actions()) {
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

	attachHandlers() {
		var self = this;

		$('body')
			.on('click', 'a[href^="#"]:not([data-router-ignore])', function(evt) {
				evt.preventDefault();

				var $self = $(this),
					href = $self.attr('href').replace('#', '');

				if (href === '') {
					return false;
				}

				if($self.hasClass('is-active')) {
					return false;
				}

				if(!$self.hasClass('js-menu__trigger') && typeof(ui.events.closeMenu) != 'undefined') {
					ui.events.closeMenu();
				}

				// Update button bar active status - run it here so if there is a controller action, it can override
				if(typeof(ui.events.updateButtonBar) != 'undefined') {
					ui.events.updateButtonBar(href);
				}

				var action = self.routes.$[href];

				if (action !== undefined) {
					self.controllerAction(action, $self.data(), $self);
				}
				else {
					self.app.switchTemplate(href);
				}

			})
			.on('submit', 'form[action^="#"]:not([data-router-ignore])', function(evt) {
				evt.preventDefault();

				var $self = $(this),
					href = $self.attr('action').replace('#', '');

				if (href === '') {
					return false;
				}

				var action = self.routes.$[href];
				if (action !== undefined) {
					var o = $self.serializeObject();

					self.controllerAction(action, o, $self.data(), $self);
				}
			});
	}

}
