import { Renderer } from './renderer';

export class AsyncRenderer extends Renderer {

	constructor(env) {
		super(env);
		let self = this;


		self.instructions = [];
	}

	instruct(opts = {}) {
		let self = this;

		opts = Object.assign({
			template: null,
			selector: null,
			promise: null
		}, opts);

		self.instructions.push(opts);

		return self;
	}

	renderInstructions($target) {
		let self = this;

		return new Promise(function(resolve, reject) {
			if (!self.instructions.length) {
				resolve();
				return false;
			}

			async.each(
				self.instructions,
				function(instruction, callback) {
					instruction.promise
						.then(function(data) {
							return self.renderHtml(instruction.template, data);
						})
						.then(function(html) {
							$target
								.find(instruction.selector)
									.replaceWith(html);

							callback();
						});
				},
				function(err) {
					resolve();
				});
		});
	}
}
