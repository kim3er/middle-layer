var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Renderer = (function () {
	function Renderer(env) {
		_classCallCheck(this, Renderer);

		var self = this;

		self.env = env;
	}

	_createClass(Renderer, [{
		key: "renderHtml",
		value: function renderHtml(template) {
			var data = arguments[1] === undefined ? {} : arguments[1];

			var self = this;

			return new Promise(function (resolve, reject) {
				resolve(self.env.render("" + template + ".html", data));
			});
		}
	}]);

	return Renderer;
})();

exports.Renderer = Renderer;