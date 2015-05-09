var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

Object.defineProperty(exports, '__esModule', {
	value: true
});
/**
 * Class for enabling infinite scroll on an element.
 */

var InfiniteScroll =

/**
 * Initialise with an options object.
 * @param  {Object} opts container: containing element,
 *                       content: inner element,
 *                       route: route to be triggered
 * @return {undefined}      Nothing is returned
 */
function InfiniteScroll(opts) {
	_classCallCheck(this, InfiniteScroll);

	var self = this;

	opts = Object.assign({
		container: '',
		content: '',
		route: '',
		app: window.app
	}, opts);

	self.loadingMore = false;
	self.scrollTop = -1;

	$(opts.container).on('scroll', function (evt) {
		if (self.loadingMore) {
			return;
		}

		self.loadingMore = true;

		var $self = $(this);

		var scrollTop = $self.scrollTop();

		/**
   * Prevents Ajax on reverse scroll
   */
		if (scrollTop <= self.scrollTop) {
			self.loadingMore = false;
			self.scrollTop = scrollTop;

			return;
		}

		self.scrollTop = scrollTop;

		var $wrapper = $self.children(opts.content);

		var containerHeight = $self.height(),
		    wrapperHeight = $wrapper.height();

		var pixelsFromBottom = wrapperHeight - (containerHeight + scrollTop);

		/**
   * Only trigger Ajax after threshold is hit
   */
		if (pixelsFromBottom < containerHeight / 2) {
			opts.app.goTo(opts.route).then(function () {
				self.loadingMore = false;
			});
		} else {
			self.loadingMore = false;
		}
	});
};

exports.InfiniteScroll = InfiniteScroll;