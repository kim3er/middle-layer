Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.route = route;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function route(route) {
	return function (target, key, descriptor) {
		var fn = descriptor.value;

		delete descriptor.value;
		delete descriptor.writable;

		if (!route) {
			route = key;
		}

		descriptor.get = function () {
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

var MlController = (function () {
	_createClass(MlController, [{
		key: "actions",
		value: function actions() {
			return [];
		}
	}]);

	function MlController() {
		var app = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, MlController);

		this.app = app;
	}

	_createClass(MlController, [{
		key: "render",
		value: function render(template) {
			var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			return this.app.renderer.render(template, data);
		}
	}]);

	return MlController;
})();

exports.MlController = MlController;