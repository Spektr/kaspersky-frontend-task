import { Component, EventEmitter, OnChanges } from '@angular/core';
import { ControlGroup, Control, Validators } from '@angular/common';
import {Validators as CustomValidators} from '../../extensions/validators';
import {IBook} from '../../interfaces/IBook';
import {DynamicListComponent} from '../dynamic-list/dynamic-list.component';

@Component({
    moduleId: module.id,
    selector: 'book-detail-component',
    inputs:['model'],
    outputs:['modelChange', 'modelRemove'],
    directives:[DynamicListComponent],
    template: require('./book-detail.component.html')
})
export class BookDetailComponent implements OnChanges {
    public model:IBook = null;
    public modelChange:EventEmitter<IBook> = new EventEmitter();
    public modelRemove:EventEmitter<IBook> = new EventEmitter();
    
    public editedModel:IBook = null;

    public isDataValid:boolean = true;
    public authorValidator = Validators.compose([Validators.required, Validators.maxLength(20)]);

    public styles:{
        image:Object;
        content:Object;
    };

    public formValidation:ControlGroup = new ControlGroup({
        title: new Control(
            'title',
            Validators.compose([Validators.required, Validators.maxLength(30)])
        ),
        authors: new ControlGroup({}),
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

    constructor() {
        let self = this;

        self.formValidation.valueChanges.subscribe(()=>{
            self.isDataValid = self.formValidation.valid;
        });

    }

    ngOnChanges() {
        this.editedModel = <IBook> JSON.parse(JSON.stringify(this.model));
        this.setStyles();
    }

    setStyles(){
        this.styles = {
            image: {
                "hidden": !this.editedModel.imageBase64,
                "col-xs-offset-0 col-sm-offset-2 col-md-offset-0 col-lg-offset-0 col-xs-12 col-sm-8 col-md-4 col-lg-4 text-center": this.editedModel.imageBase64
            },
            content:{
                "col-xs-12 col-sm-12 col-md-12 col-lg-12": !this.editedModel.imageBase64,
                "col-xs-12 col-sm-12 col-md-8 col-lg-8": this.editedModel.imageBase64
            }
        }
    }

    editBook(){
        this.model = this.editedModel;
        this.modelChange.emit(this.editedModel);
        this.ngOnChanges();
    }
    
    removeBook(){
        this.modelRemove.emit(this.model);
    }

    loadImage(event:any){
        let self = this,
            input = event.target,
            reader = new FileReader();

        if(input.files && input.files[0]){
            reader.onload = function (e:any) {
                let result = e.target.result;
                if(!/^data:image\/(png|jpg|jpeg);base64,/.test(result))return alert("Добавлять можно только PNG и JPG");
                self.editedModel.imageBase64 = e.target.result;
                self.setStyles();
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    removeImage(){
        let self = this;
        self.editedModel.imageBase64 = null;
        self.setStyles();
    }
}