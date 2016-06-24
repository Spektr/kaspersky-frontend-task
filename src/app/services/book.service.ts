
import { Injectable } from '@angular/core';

import {IBook} from "../interfaces/IBook";
import {DataService} from "./data.service";

@Injectable()
export class BookService {

    storedBooks:IBook[] = [];

    constructor(
        private _dataService:DataService
    ) { }


    list():IBook[]{
        return this.storedBooks = this._dataService.getBooks();
    }

    updateBook(book:IBook){

        let self = this,
            isEditable = false;

        self.storedBooks = self.storedBooks.map((item)=>{
            if(!self.equal(item, book))return item;

            isEditable = true;
            return book;
        });

        if(!isEditable)self.storedBooks.push(book);

        self._dataService.setBooks(self.storedBooks);
    }

    removeBook(book:IBook){

        let self = this;

        self.storedBooks.forEach((item)=>{
            if(!self.equal(item, book))return;

            self.storedBooks.splice(self.storedBooks.indexOf(item),1);
        });

        self._dataService.setBooks(self.storedBooks);
    }

    equal(first:IBook, second:IBook){
        return first.isbn === second.isbn;
    }
}