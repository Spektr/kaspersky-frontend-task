import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'home-component',
    template: require('./home.component.html')
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
    
}