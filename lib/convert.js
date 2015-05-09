var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Convert = (function () {
	function Convert() {
		_classCallCheck(this, Convert);
	}

	_createClass(Convert, null, [{
		key: "objectToArray",
		value: function objectToArray(obj) {
			var arr = new Array();

			for (var key in obj) {
				arr.push({ key: key, val: obj[key] });
			}

			return arr;
		}
	}]);

	return Convert;
})();

exports.Convert = Convert;