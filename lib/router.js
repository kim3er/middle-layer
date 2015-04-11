var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var Router = (function () {
	function Router(opts) {
		_classCallCheck(this, Router);

		var defaults = {
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

	_createClass(Router, [{
		key: 'goTo',
		value: function goTo(actionName, data) {
			var action = this.routes.$[actionName];

			if (action) {
				return this.controllerAction(action, data);
			} else {
				return this.app.switchTemplate(actionName);
			}
		}
	}, {
		key: 'controllerAction',
		value: function controllerAction(obj) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			return obj.controller[obj.action].apply(obj.controller, args);
		}
	}, {
		key: 'attachControllers',
		value: function attachControllers() {
			var controllers = arguments[0] === undefined ? null : arguments[0];

			var self = this;

			if (controllers) {
				self.controllers = controllers;
			}

			self.controllers.forEach(function (controllerClass) {
				var controller = new controllerClass(self.app);
				controller.actions().forEach(function (action) {
					self.routes.$[action] = { controller: controller, action: action };

					if (!self.routes[controllerClass.name]) {
						self.routes[controllerClass.name] = {};
					}

					self.routes[controllerClass.name][action] = { controller: controller, action: action };
				});
			});
		}
	}, {
		key: 'attachHandlers',
		value: function attachHandlers() {
			var self = this;

			$('body').on('click', 'a[href^="#"]', function (evt) {
				evt.preventDefault();

				var $self = $(this),
				    href = $self.attr('href').replace('#', '');

				if (href === '') {
					return false;
				}

				var action = self.routes.$[href];
				if (action !== undefined) {
					self.controllerAction(action, $self.data(), $self);
				} else {
					self.app.switchTemplate(href);
				}
			}).on('submit', 'form[action^="#"]', function (evt) {
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
	}]);

	return Router;
})();

exports.Router = Router;