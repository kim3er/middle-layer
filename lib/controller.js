var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Controller = (function () {
	function Controller() {
		var app = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Controller);

		this.app = app;
	}

	_createClass(Controller, [{
		key: "actions",
		value: function actions() {
			return [];
		}
	}]);

	return Controller;
})();

exports.Controller = Controller;