import { Component, EventEmitter, OnInit } from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {DataService} from '../../services/data.service'

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
export class BookListComponent implements OnInit{

    selectBookChange:EventEmitter<IBook> = new EventEmitter();
    aBook:IBook[]=null;

    constructor(
        private _dataService:DataService
    ){}

    ngOnInit(){
        let sorting:string = this._dataService.getSorting();
    }

    selectBook(book:IBook){
        this.selectBookChange.emit(book);
    }

    sortBy(name:string, asc?:boolean){
        let self = this,
            negative = asc?1:-1;

        self.aBook.sort((first:IBook,second:IBook)=>{return negative*(first[name].trim()<second[name].trim()?1:-1);});
        self._dataService.setSorting(name);
    }
}