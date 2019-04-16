Hello World Angular Custom Element
=======

This project creates an Angular-driven Hello World application packaged as an Angular custom element.

# Application Example
For our example we created a basic Angular-driven Hello World app using Google's Material Design components. Review `/src/app/app.component.html` for markup or check out https://material.angular.io.

# Create Custom Element
Once our application is ready, we need to create an Angular Custom Element. We'll walk through exporting your project in these steps:
* Install Dependencies
* Export Component
* Generate Custom Element

## Install Dependencies
Install Angular Elements:
`npm install @angular/elements`

Then import `createCustomElement` from the module (in our case `app.module.ts`):

`import {createCustomElement} from '@angular/elements';`

Install Angular Builders Custom Webpack:
`npm i -D @angular-builders/custom-webpack`

Install the Angular Custom Webpack Builder:
`npm install @angular-builders/custom-webpack`

Install optimization packages:
`npm install fs-extra concat`

## Export Component

### entryComponents Declaration
In our module file, we add our root component and clear `bootstrap` as shown:
```javascript
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent]
})
export class AppModule { }
```

### Custom Element Declaration
Manually trigger bootstrapping via `ngDoBootstrap` in our `app.module.ts` like shown:
```javascript
import { Injector } from '@angular/core';
export class AppModule {
  constructor(private injector: Injector) {
    if (!customElements.get('hello-world-widget')) {
      const helloWorldElement = >createCustomElement(AppComponent, {injector});
      customElements.define('hello-world-widget', helloWorldElement);
    }
  }
  ngDoBootstrap(){}
}
```
*Replace mentions of `hello-world-widget` to your application*

#### Update Project Builder
In your `angular.json` replace the default builder with a custom webpack builder such as:
```javascript
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "customWebpackConfig": {
        "path": "./extra-webpack.config.js",
        "mergeStrategies": {
          "externals": "replace"
        }
      },
      ...
    }
  }
}
```
*Only add the above to the your builder; do not replace it entirely.*

### Create Custom webpackJsonp
Create a file named `extra-webpack.config.js` in the same directory as your `angular.json` with:
```javascript
module.exports = {
  output: {
    jsonpFunction: 'webpackJsonpHelloWorldWidget',
    library: 'helloWorldWidget'
  }
};
```
*Replace references to `helloWorldWidget` with your app.*

## Generate Custom Element

### Write Build Script
Create a new file in your project directory named `build-script.js` with:
```javascript
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
```
*Replace references to `hello-world-widget` shown above with your app.*

#### Update package.json
Add the build script to your project in the `package.json` with this addition:

`"build:element": "ng build --prod --output-hashing none && node build-script.js"`

#### Export Custom Element
Generate the concatenated JS file containing your application as a custom element with:

`npm run build:element`

This file is located in the /dist folder of your project named as defined above.