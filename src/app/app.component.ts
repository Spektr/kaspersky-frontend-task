import {Component, ViewEncapsulation} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {BookService} from './services/book.service';
import {DataService} from "./services/data.service";
import {HomeComponent} from './components/home/home.component'

@Component({
    selector: 'app-component',
    encapsulation: ViewEncapsulation.None,
    providers: [DataService, BookService],
    pipes: [],
    directives: [ROUTER_DIRECTIVES],
    styles:[`
        html,body{
            height: 100%;}
                       
        .app-component{
            min-height: 100%;
            min-width: 300px;
            background-color: #f5f5f5;}
            
            .app-component__header{
                margin-top: 10px;}
                
            .app-component__content{}
            
            .app-component__footer{
                margin: 10px 0;}
            
            .app-component__brand{}
                .app-component__brand img{
                    float:left;
                    padding-right: 5px;
                    max-height: 100%;}
            
            .app-component .container{
                background-color: white;}
    `],
    template: require('app/app.component.html')
})
@Routes([
  { path: '/',       component: HomeComponent }
])
export class AppComponent {}
