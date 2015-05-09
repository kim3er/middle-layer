/**
 * Class for enabling infinite scroll on an element.
 */
export class InfiniteScroll {

	/**
	 * Initialise with an options object.
	 * @param  {Object} opts container: containing element,
	 *                       content: inner element,
	 *                       route: route to be triggered
	 * @return {undefined}      Nothing is returned
	 */
	constructor(opts) {
		let self = this;

		opts = Object.assign({
			container: '',
			content: '',
			route: '',
			app: window.app
		}, opts);

		self.loadingMore = false;
		self.scrollTop = -1;

		$(opts.container)
			.on('scroll', function(evt) {
				if (self.loadingMore) {
					return;
				}

				self.loadingMore = true;

				let $self = $(this);

				let scrollTop = $self.scrollTop();

				/**
				 * Prevents Ajax on reverse scroll
				 */
				if (scrollTop <= self.scrollTop) {
					self.loadingMore = false;
					self.scrollTop = scrollTop;

					return;
				}

				self.scrollTop = scrollTop;

				let $wrapper = $self.children(opts.content);

				let containerHeight = $self.height(),
					wrapperHeight = $wrapper.height();

				let pixelsFromBottom = wrapperHeight - ( containerHeight + scrollTop );

				/**
				 * Only trigger Ajax after threshold is hit
				 */
				if (pixelsFromBottom < ( containerHeight / 2 )) {
					opts.app.goTo(opts.route)
						.then(function() {
							self.loadingMore = false;
						});
				}
				else {
					self.loadingMore = false;
				}
			});
	}

}
