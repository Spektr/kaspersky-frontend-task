import { Component, EventEmitter, OnInit } from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {BookService} from '../../services/book.service';

@Component({
    moduleId: module.id,
    selector: 'book-list-component',
    outputs:['bookChanges'],
    styles:[`
        .book-list-component{}
        
            .book-list-component .center-block{
                margin-bottom: 3px;}        
    `],
    template: require('./book-list.component.html')
})
export class BookListComponent implements OnInit {

    bookChanges:EventEmitter<IBook> = new EventEmitter();
    aBook:IBook[]=null;

    constructor(
        private _bookService:BookService
    ) {}

    ngOnInit() {
        this.aBook = this._bookService.list();
    }

    selectBook(book:IBook){
        this.bookChanges.emit(book);
    }
}