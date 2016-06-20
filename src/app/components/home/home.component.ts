import { Component, OnInit } from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {BookListComponent} from '../book/book-list.component';
import {BookDetailComponent} from '../book/book-detail.component';

@Component({
    moduleId: module.id,
    selector: 'home-component',
    directives:[BookListComponent, BookDetailComponent],
    styles:[`
        .home-component{}
        
            .home-component .center-block{
                margin-bottom: 3px;}        
    `],
    template: require('./home.component.html')
})
export class HomeComponent implements OnInit {

    public selectedBook:IBook = null;

    constructor() {}

    ngOnInit() {}

    selectBook(book:IBook){
        this.selectedBook = book;
    }

}