Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MlRouter = (function () {
	function MlRouter(opts) {
		_classCallCheck(this, MlRouter);

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

	_createClass(MlRouter, [{
		key: 'goTo',
		value: function goTo(actionName, data) {
			var action = this.routes.$[actionName];

			if (action) {
				return this.controllerAction(action, data);
			} else {
				return this.switchTemplate(actionName);
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
		key: 'switchTemplate',
		value: function switchTemplate(href, data) {
			return this.app.renderer.render(href, data);
		}
	}, {
		key: 'attachControllers',
		value: function attachControllers() {
			var self = this;

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
						for (var _iterator2 = controller.routes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

		/**
   * Override this function to attach handlers
   * @return {undefined} Nothing returned
   */
		value: function attachHandlers() {}
	}]);

	return MlRouter;
})();

exports.MlRouter = MlRouter;