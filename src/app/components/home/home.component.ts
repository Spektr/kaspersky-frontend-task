import { Component, OnInit } from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {BookService} from "../../services/book.service";
import {BookListComponent} from '../book/book-list.component';
import {BookDetailComponent} from '../book/book-detail.component';
import {Book} from "../../classes/Book";

/**
 * Компонент главной страницы
 * Соединяет в себе компоненты отображения списка всех книг и детальной информации по книге
 */
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

    aBook:IBook[] = null;       // список книг
    selectedBook:IBook = null;  // выбранная в таблице книга

    constructor(
        private _bookService:BookService
    ) {}

    /**
     * Метод инициализации компонента (формирует дефолтные условия)
     * Получает из сервиса все книги, сбрасывает выбранную
     */
    ngOnInit() {
        this.aBook = this._bookService.list();
        this.selectedBook = null;
    }

    /**
     * Выбор книги из таблицы
     * Обработчик события для компонента списка книг
     *
     * @param {IBook} book  - книга
     */
    selectBook(book:IBook):void{
        this.selectedBook = book;
    }

    /**
     * Обновление книги
     * Обработчик события для компонента информации о книге
     *
     * @param {IBook} book  - книга
     */
    updateBook(book:IBook):void{
        this._bookService.updateBook(book);
        this.ngOnInit();
    }

    /**
     * Удаление книги
     * Обработчик события для компонента информации о книге
     *
     * @param {IBook} book  - книга
     */
    removeBook(book:IBook):void{
        this._bookService.removeBook(book);
        this.ngOnInit();
    }

    /**
     * Добавление книги
     *
     */
    appendBook():void{
        this.selectBook(new Book("Новая книжке",[],null,null, null, null, null, null));
    }
}