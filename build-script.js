const fs = require('fs-extra'); 
const concat = require('concat'); 
(async function build() { 
	const files = [ 
		'./dist/custom-elements-test/runtime.js', 
	    './dist/custom-elements-test/polyfills.js', 
	    './dist/custom-elements-test/main.js', 
	]
	await fs.ensureDir('elements')
	await concat(files, 'elements/your-app-name.js');
})()