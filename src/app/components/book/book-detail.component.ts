import { Component, OnInit } from '@angular/core';
import { ControlGroup, Control, Validators } from '@angular/common';
import {Validators as CustomValidators} from '../../extensions/validators';
import {IBook} from '../../interfaces/IBook';
import {DynamicListComponent} from '../dynamic-list/dynamic-list.component';

@Component({
    moduleId: module.id,
    selector: 'book-detail-component',
    inputs:['model'],
    directives:[DynamicListComponent],
    template: require('./book-detail.component.html')
})
export class BookDetailComponent implements OnInit {
    public model:IBook = null;

    public formValidation:ControlGroup = new ControlGroup({
        title: new Control(
            'title',
            Validators.compose([Validators.required, Validators.maxLength(30)])
        ),
        authors: new Control(
            'authors',
            function (control):{ [key:string]:any } { /* TODO: <- */
                return {authors: true};
            }
        ),
        pageCount: new Control(
            'pageCount',
            Validators.compose([Validators.required, CustomValidators.minMax(0, 10000)])
        ),
        publisher: new Control(
            'publisher',
            Validators.maxLength(30)
        ),
        publicationDate: new Control(
            'publicationDate',
            CustomValidators.yearFrom(1800)
        ),
        releaseDate: new Control(
            'releaseDate',
            CustomValidators.date(new Date('01.01.1800'))
        ),
        isbn: new Control(
            'isbn',
            CustomValidators.isbn()
        ),
        image: new Control(
            'image',
            Validators.required
        )

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