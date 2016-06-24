import { Component, OnInit } from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {BookService} from "../../services/book.service";
import {BookListComponent} from '../book/book-list.component';
import {BookDetailComponent} from '../book/book-detail.component';
import {Book} from "../../classes/Book";

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
    aBook:IBook[] = null;
    selectedBook:IBook = null;

    constructor(
        private _bookService:BookService
    ) {}

    ngOnInit() {
        this.aBook = this._bookService.list();
        this.selectedBook = null;
    }

    selectBook(book:IBook){
        this.selectedBook = book;
    }

    updateBook(book:IBook){
        let self = this;

        self._bookService.updateBook(book);
        self.ngOnInit();
    }

    removeBook(book:IBook){
        let self = this;

        self._bookService.removeBook(book);
        self.ngOnInit();
    }

    appendBook(){
        this.selectBook(new Book("Новая книжке",[],null,null, null, null, null, null));
    }
}