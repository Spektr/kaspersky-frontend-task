import { Component, EventEmitter, OnChanges } from '@angular/core';
import { ControlGroup, Control, Validators } from '@angular/common';        // цепляем стандартные валидаторы
import {Validators as CustomValidators} from '../../extensions/validators'; // цепляем собственные валидаторы
import {IBook} from '../../interfaces/IBook';
import {DynamicListComponent} from '../dynamic-list/dynamic-list.component';

/**
 * Компонент для отображения детальной информации о книге.
 * Включает в себя валидацию, действия по редактированию, удалению выбранного экземпляра книги и ее изображения
 * пс: самый нагруженный компонент
 *
 * @example {
 *  <book-detail-component
 *      [model]="selectedBook"
 *      (modelChange)="updateBook($event)"
 *      (modelRemove)="removeBook($event)"
 *  ></book-detail-component>
 *
 *   param {IBook} selectedBook             - текущая книга
 *   param {Function} updateBook($event)    - функция для обработки события редактирования книги
 *   param {Function} removeBook($event)    - функция для обработки события удаления книги
 * }
 */
@Component({
    moduleId: module.id,
    selector: 'book-detail-component',
    inputs:['model'],
    outputs:['modelChange', 'modelRemove'],
    directives:[DynamicListComponent],
    template: require('./book-detail.component.html')
})
export class BookDetailComponent implements OnChanges {
    public model:IBook = null;                                      // текущая книга
    public modelChange:EventEmitter<IBook> = new EventEmitter();    // событие на изменение книги
    public modelRemove:EventEmitter<IBook> = new EventEmitter();    // событие на удаление книги
    public editedModel:IBook = null;                                // редактируемый инстанс текущей книги
    public isDataValid:boolean = true;                              // флаг валидности данных

    // объект классов для представления (нужен для адаптивной верстки)
    public styles:{
        image:Object;   // для контейнера где лежит изображение
        content:Object; // для контейнера где лежит основное содержимое книги
    };

    // валидация авторов
    public authorValidator = Validators.compose([Validators.required, Validators.maxLength(20)]);

    // валидация всей формы
    public formValidation:ControlGroup = new ControlGroup({
        // авторы, пустая группа контролов (о валидации позаботится компонент списка)
        authors: new ControlGroup({}),
        // заголовок обязательный, не более 30 символов
        title: new Control(
            'title',
            Validators.compose([Validators.required, Validators.maxLength(30)])
        ),
        // ... все прочие по аналогии
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
            CustomValidators.date(new Date(1800, 0, 1))
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

    /**
     * @constructor
     */
    constructor() {
        let self = this;

        // синхронизируем флаг валидности при изменении формы
        self.formValidation.valueChanges.subscribe(()=>{
            self.isDataValid = self.formValidation.valid;
        });

    }

    /**
     * Хук на изменеия
     * Клонирует модель для редактирования и перестраивает стили
     */
    ngOnChanges() {
        this.editedModel = <IBook> JSON.parse(JSON.stringify(this.model));
        this.setStyles();
    }

    /**
     * Перестройка стилей
     * Отображение зависит от наличия изображения в сущности и ширины экрана
     */
    setStyles():void{
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

    /**
     * Обновление модели
     */
    editBook():void{
        this.model = this.editedModel;
        this.modelChange.emit(this.editedModel);
        this.ngOnChanges();
    }

    /**
     * Удаление модели
     */
    removeBook():void{
        this.modelRemove.emit(this.model);
    }

    /**
     * Загрузка изображения
     * Использует возможности FileReader для получения кода изображения
     *
     * @param {*} event - стандартное событие DOM
     */
    loadImage(event:any):void{
        let self = this,
            input = event.target,
            reader = new FileReader();

        // если файл был загружен
        if(input.files && input.files[0]){

            // лямбда на загрузчик
            reader.onload = function (e:any) {
                let result = e.target.result;

                // проверяем на то что это изображение
                if(!/^data:image\/(png|jpg|jpeg);base64,/.test(result))return alert("Добавлять можно только PNG и JPG");

                self.editedModel.imageBase64 = e.target.result;
                self.setStyles();
            };

            // выстреливаем загрузкой
            reader.readAsDataURL(input.files[0]);
        }
    }

    /**
     * Удаление изображения
     */
    removeImage():void{
        let self = this;
        self.editedModel.imageBase64 = null;
        self.setStyles();
    }
}