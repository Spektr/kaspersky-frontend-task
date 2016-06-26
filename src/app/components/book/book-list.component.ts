import { Component, EventEmitter} from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {DataService} from '../../services/data.service'

/**
 * Компонент отображения списка книг
 *
 * @example {
 *  <book-list-component
 *      [aBook]="aBook"
 *      (selectBookChange)="selectBook($event)"
 *  ></book-list-component>
 *
 *   param {Array<Object>} aBook         - список книг для отображения
 *   param {Function} selectBook($event) - функция для обработки события выбора конкретной книги
 * }
 */
@Component({
    moduleId: module.id,
    selector: 'book-list-component',
    inputs:['aBook'],
    outputs:['selectBookChange'],
    styles:[`
        .book-list-component{}
        
            .book-list-component .center-block{
                margin-bottom: 3px;}   
                
            .book-list-component td{
                vertical-align: middle;}    
                 
            .book-list-component th{
                text-align:center;
                vertical-align: middle;}        
    `],
    template: require('./book-list.component.html')
})
export class BookListComponent{

    // список книг
    aBook:IBook[]=null;

    // эмитер события выбора книги
    selectBookChange:EventEmitter<IBook> = new EventEmitter();


    constructor(
        private _dataService:DataService
    ){}

    /**
     * Выбор книги из таблицы
     * Выстреливает событие выбора
     *
     * @param {IBook} book  - выбранная книга
     */
    selectBook(book:IBook):void{
        this.selectBookChange.emit(book);
    }

    /**
     * Сортировка таблицы
     *
     * @param {string} name - поле по которому будет сортировка
     * @param {boolean} asc - направление сортировки (если потребуется)
     */
    sortBy(name:string, asc?:boolean):void{
        let self = this,
            negative = asc?1:-1;

        self.aBook.sort((first:IBook,second:IBook)=>{return negative*(first[name].trim()<second[name].trim()?1:-1);});
        self._dataService.setSorting(name);
    }
}