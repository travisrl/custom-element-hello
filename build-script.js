const fs = require('fs-extra'); 
const concat = require('concat'); 
(async function build() { 
	const files = [ 
		'./dist/hello-world-widget/runtime.js', 
	    './dist/hello-world-widget/polyfills.js', 
	    './dist/hello-world-widget/main.js', 
	]
	await fs.ensureDir('elements')
	await concat(files, 'elements/hello-world-widget.js');
})()