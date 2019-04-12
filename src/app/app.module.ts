import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Injector } from '@angular/core';

import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatInputModule
	],
	exports: [
		MatButtonModule,
		MatCheckboxModule,
		MatInputModule
	],
	providers: [],
	bootstrap: [],
	entryComponents: [AppComponent]
})

export class AppModule {
 	constructor(private injector: Injector) {
 		if (!customElements.get('custom-elements-widget')) {
 			const helloWorldElement = createCustomElement(AppComponent, {injector});
 			customElements.define('custom-elements-widget', helloWorldElement);
 		}
 	}
 	ngDoBootstrap(){} 
}