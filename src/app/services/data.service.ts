import { Injectable } from '@angular/core';
import {aBook} from '../fixrures/book.fixtures';
import {IBook} from '../interfaces/IBook';

/**
 * Сервис получения данных
 * Инкапсулирует в себе получение списка книг и сохраненной сортировки
 */
@Injectable()
export class DataService {

    // проверяет поддержку локального хранилища
    private _isLocalStorage:boolean = ('localStorage' in window && !!window['localStorage']);

    /**
     * @typedef _data
     * @type {Object}
     * @property {Array<IBook>} books   - массив книг
     * @property {string} sorting       - сохраненное имя поля, по которому идет сортировка (ASC)
     * @private
     */
    private _data:{
        books:IBook[];
        sorting:string;
    } = null;

    /**
     * При создании проверяет локальное хранилище, преобразует данные из него,
     * если ничего не получается подставляет фикстуры
     *
     * @constructor
     */
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
                books:aBook,
                sorting:null
            };
        }
    }

    /**
     * Синхронизация данных с локальным хранилищем (сохраняет данные)
     */
    synchronize():void{
        if(this._isLocalStorage){
            try{
                window.localStorage.setItem('data', JSON.stringify(this._data));
            }catch (e){
                throw new Error('Can`t save data into browser local storage')
            }
        }
    }

    /**
     * Получение списка книг
     *
     * @returns {Array<IBook>}      - массив книг
     */
    getBooks():IBook[]{
        return this._data.books;
    }

    /**
     * Сохранение списка книг
     *
     * @param {Array<IBook>} books  - массив книг
     */
    setBooks(books:IBook[]):void{
        this._data.books = books;
        this.synchronize();
    }

    /**
     * Получение поля по которому была сортировка
     *
     * @returns {string}    - наименование поля
     */
    getSorting():string{
        return this._data.sorting;
    }

    /**
     * Сохранение названия поля для сортировки
     *
     * @param {string} name - наименование поля
     */
    setSorting(name:string):void{
        this._data.sorting = name;
        this.synchronize();
    }
}