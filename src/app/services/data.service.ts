import { Injectable } from '@angular/core';

import {aBook} from '../fixrures/book.fixtures';
import {IBook} from '../interfaces/IBook';

@Injectable()
export class DataService {

    private _isLocalStorage:boolean = ('localStorage' in window && !!window['localStorage']);
    private _data:{ books:IBook[] } = null;

    constructor() {

        if(this._isLocalStorage){
            let data = window.localStorage.getItem('data');

            try{
                this._data = JSON.parse(data);
            }catch (e){
                this._data = null;
            }
        }

        if(!this._data){
            this._data = {
                books:aBook
            };
        }
    }

    synchronize():void{
        if(this._isLocalStorage){
            try{
                window.localStorage.setItem('data', JSON.stringify(this._data));
            }catch (e){
                throw new Error('Can`t save data into browser local storage')
            }
        }
    }

    getBooks():IBook[]{
        return this._data.books;
    }
}