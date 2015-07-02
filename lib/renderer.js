Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MlRenderer = (function () {
	function MlRenderer() {
		_classCallCheck(this, MlRenderer);
	}

	_createClass(MlRenderer, [{
		key: "render",
		value: function render(template) {
			var data = arguments[1] === undefined ? {} : arguments[1];
			return regeneratorRuntime.async(function render$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}
	}]);

	return MlRenderer;
})();

exports.MlRenderer = MlRenderer;