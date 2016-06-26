
import { Injectable } from '@angular/core';
import {IBook} from "../interfaces/IBook";
import {DataService} from "./data.service";

/**
 * Сервис для работы с книгами
 * Жутко ненормализованный сервис, оперирует с полным массивом книг (т.к. задание тестовое)
 */
@Injectable()
export class BookService {

    // массив сохраненных книг
    storedBooks:IBook[] = [];

    /**
     * @constructor
     * @param {DataService} _dataService    - фейковый сервис данных
     */
    constructor(
        private _dataService:DataService
    ) { }

    /**
     * Возвращение списка книг
     *
     * @returns {Array<IBook>}  - список книг
     */
    list():IBook[]{
        return this.storedBooks = this._dataService.getBooks();
    }

    /**
     * Обновление/добавление новой книги
     *
     * @param {IBook} book  - книга
     */
    updateBook(book:IBook):void{

        let self = this,
            isEditable = false;

        self.storedBooks = self.storedBooks.map((item)=>{
            if(!self.equal(item, book))return item;

            isEditable = true;
            return book;
        });

        // если во всем массиве не изменилось ни одной книги, добавляем новую
        if(!isEditable)self.storedBooks.push(book);

        // сохраняем книги
        self._dataService.setBooks(self.storedBooks);
    }

    /**
     * Удаление книги
     *
     * @param {IBook} book  - книга
     */
    removeBook(book:IBook):void{

        let self = this;

        self.storedBooks.forEach((item)=>{
            if(!self.equal(item, book))return;

            self.storedBooks.splice(self.storedBooks.indexOf(item),1);
        });

        self._dataService.setBooks(self.storedBooks);
    }

    /**
     * Сличение книг
     * Для сравнения используется международный идентификатор (выступает в качестве id сущности)
     * Прямое сравнение объектов может давать сбой ввиду клонирования оных внутри приложения
     *
     * @param {IBook} first     - оригинальная книга
     * @param {IBook} second    - сравниваемая книга
     * @returns {boolean}       - результат сравнения
     */
    equal(first:IBook, second:IBook):boolean{
        return first.isbn === second.isbn;
    }
}