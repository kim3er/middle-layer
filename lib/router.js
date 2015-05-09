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

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = self.controllers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var controllerClass = _step.value;

					var controller = new controllerClass(self.app);

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = controller.actions()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var route = _step2.value;

							var action, match;

							if (typeof route === 'string') {
								action = match = route;
							} else {
								action = route.action;
								match = route.match;
							}

							self.routes.$[match] = { controller: controller, action: action };

							if (!self.routes[controllerClass.name]) {
								self.routes[controllerClass.name] = {};
							}

							self.routes[controllerClass.name][match] = { controller: controller, action: action };
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'attachHandlers',
		value: function attachHandlers() {
			var self = this;

			$('body').on('click', 'a[href^="#"]:not([data-router-ignore])', function (evt) {
				evt.preventDefault();

				var $self = $(this),
				    href = $self.attr('href').replace('#', '');

				if (href === '') {
					return false;
				}

				if ($self.hasClass('is-active')) {
					return false;
				}

				if (!$self.hasClass('js-menu__trigger') && typeof ui.events.closeMenu != 'undefined') {
					ui.events.closeMenu();
				}

				// Update button bar active status - run it here so if there is a controller action, it can override
				if (typeof ui.events.updateButtonBar != 'undefined') {
					ui.events.updateButtonBar(href);
				}

				var action = self.routes.$[href];

				if (action !== undefined) {
					self.controllerAction(action, $self.data(), $self);
				} else {
					self.app.switchTemplate(href);
				}
			}).on('submit', 'form[action^="#"]:not([data-router-ignore])', function (evt) {
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