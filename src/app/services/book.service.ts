
import { Injectable } from '@angular/core';

import {IBook} from "../interfaces/IBook";
import {DataService} from "./data.service";

@Injectable()
export class BookService {

    constructor(
        private _dataService:DataService
    ) { }


    list():IBook[]{
        return this._dataService.getBooks();
    }
}