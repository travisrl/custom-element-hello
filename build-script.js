const fs = require('fs-extra'); 
const concat = require('concat'); 
(async function build() { 
	const files = [ 
		'./dist/hello-world-widget2/runtime.js', 
	    './dist/hello-world-widget2/polyfills.js', 
	    './dist/hello-world-widget2/main.js', 
	]
	await fs.ensureDir('elements')
	await concat(files, 'elements/hello-world-widget2.js');
})()