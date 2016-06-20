import { Component, OnInit } from '@angular/core';
import { ControlGroup, Control, Validators } from '@angular/common';
import {IBook} from '../../interfaces/IBook';

@Component({
    moduleId: module.id,
    selector: 'book-detail-component',
    inputs:['model'],
    template: require('./book-detail.component.html')
})
export class BookDetailComponent implements OnInit {
    public model:IBook = null;

    public formValidation:ControlGroup = new ControlGroup({
        title: new Control('title', Validators.maxLength(30)),
        authors: new Control('authors', function (controll){
            return {authors:true};
        }),
        pageCount: new Control('pageCount', Validators.compose([
                Validators.required,
                function (control) {
                    let value = parseInt(control.value);
                    return (0 > value || value > 10000)?{pageCount:true}:null;
                }
            ])
        ),
        publisher: new Control('publisher', function (control) {
            let value = control.value;
            return (value != '' && value.length > 30)?{publisher:true}:null;
        }),
        publicationDate: new Control('publicationDate', Validators.required),
        releaseDate: new Control('releaseDate', Validators.required),
        isbn: new Control('isbn', Validators.required),
        image: new Control('image', Validators.required)

    });

    constructor() { }

    ngOnInit() { }

    editBook(){
        alert('azaza');
    }

    get monitor(){
        return JSON.stringify(this.model);
    }
}