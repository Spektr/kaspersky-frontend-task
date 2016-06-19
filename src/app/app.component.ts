import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {HomeComponent} from './components/home/home.component'

@Component({
  selector: 'app-component',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  template: require('app/app.component.html')
})
@Routes([
  { path: '/',       component: HomeComponent }
])
export class AppComponent {

  constructor() {}

}
