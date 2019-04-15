# hello-world-widget
MicroApplication and Widget Example for OpenDash360.
=======

This project creates an Angular-driven Hello World application packaged as a custom element ready to import to the OpenDash360 platform.

OpenDash360 is a framework neutral developer playground, allowing any type of application (from Angular to React, PHP to Java) to be easily imported and used. Applications must be packaged as an Angular Custom Element and configured. Read more at opendash360.com

## Application Example
For our example we've created a basic Angular-driven Hello World app using Google's Material Design components. Review /src/app/app.component.html for markup or check out https://material.angular.io.

## Package Custom Element
Once we have our application ready, we will need to create an Angular Custom Element. We'll walk through exporting your project in these steps:
* Install Dependencies
* Export Component
* Generate Custom Element

### Install Dependencies
#### Angular Custom Elements Module
To build a custom element, we'll need access to the Angular Custom Elements module:
>npm install @angular/elements
Then import `createCustomElement` from the module (in our case app.module.ts):
>import {createCustomElement} from '@angular/elements';
#### Custom Build Script
Later in the project we use these to optimize the rendered output:
>npm install fs-extra concat

### Export Component
Angular needs any components you want to be created dynamically to be declared in the module's entryComponents array.

#### entryComponents Declaration
Add your root component to this array, declaring it if necessary. Also remove the component from `bootstrap`:
>import { createCustomElement } from '@angular/elements';
>import { AppComponent } from './app.component';
>@NgModule({
>  declarations: [AppComponent],
>  imports: [BrowserModule],
>  providers: [],
>  bootstrap: [],
>  entryComponents: [AppComponent]
>})
>export class AppModule { }

#### Custom Element Delcaration
Your component's Javascript should automatically register itself after checking if it's defined. We'll also need to manually trigger bootstrapping via `ngDoBootstrap` in the module:
>import { Injector } from '@angular/core';
>export class AppModule {
>  constructor(private injector: Injector) {
>    if (!customElements.get('hello-world-widget')) {
>      const helloWorldElement = >createCustomElement(AppComponent, {injector});
>      customElements.define('hello-world-widget', helloWorldElement);
>    }
>  }
>  ngDoBootstrap(){}
>}

##### Angular Custom Webpack Builder
Next we build a custom webpack and redefine the webpackJsonp variable to avoid multiple custom elements colliding. Begin by installing the Angular Custom Webpack Builder:
>npm install @angular-builders/custom-webpack

#### Update Project Builder
Inside your project's `angular.json` find where your builder is defined. Replace the default builder with a custom webpack builder with the following options:
>"architect": {
>  "build": {
>    "builder": "@angular-builders/custom-webpack-browser",
>    "options": {
>      "customWebpackConfig": {
>        "path": "./extra-webpack.config.js",
>        "mergeStrategies": {
>          "externals": "replace"
>        }
>      },
>    }
>  }
>}

#### Create Custom webpackJsonp
This `extra-webpack.config.js` file we referenced above will provide a custom definition for the webpackJsonp variable. In the same directory as your `angular.json`, create a new file named `extra-webpack.config.js` with these contents:
>module.exports = {
>  output: {
>    jsonpFunction: 'webpackJsonpYourAppName',
>    library: 'yourAppName'
>  }
>};
*Replace references to `YourAppName` shown above with the name of your app.*

### Generate Custom Element
Our desired end result is a single Javascript file defining our custom element. By default Angular produces multiple Javascript files that we need to concatenate and consolidate. To achieve our goal we'll create a script that outputs a single file named your-app-name.js in an `/elements` folder in your project directory. This JS file defines your custom element when linked in the source of a script tag.

#### Write Build Script
Create a new file in your project directory named `build-script.js` with the following:
>const fs = require('fs-extra');
>const concat = require('concat');
>(async function build() {
>  const files = [
>    './dist/your-app-name/runtime.js',
>    './dist/your-app-name/polyfills.js',
>    './dist/your-app-name/main.js',
>  ]
>  await fs.ensureDir('elements')
>  await concat(files, 'elements/your-app-name.js');
>})()
*Replace references to `your-app-name` shown above with your app.*




## MicroApplication Configuration
