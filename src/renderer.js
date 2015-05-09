export class Renderer {

	constructor(env) {
		let self = this;

		self.env = env;
	}

	renderHtml(template, data = {}) {
		let self = this;

		return new Promise(function(resolve, reject) {
			resolve(self.env.render(`${template}.html`, data));
		});
	}
}
