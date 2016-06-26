/**
 * Стартовый компонент приложения
 * Прокомментирован подробно, следующие компоненты работают по аналогии с этим
 */
import {Component, ViewEncapsulation} from '@angular/core';     // импортируем анотации(конструкторы) и хелперы
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';      // импортируем роутинговые примочки
import {BookService} from './services/book.service';            // импортируем сервис для работы с книгами (для проброса)
import {DataService} from "./services/data.service";            // импортируем сервис для работы с данными (для проброса)
import {HomeComponent} from './components/home/home.component'; // импортируем компонент главной страницы

// анотация компонента
@Component({
    selector: 'app-component',              // селектор для представления
    encapsulation: ViewEncapsulation.None,  // настройка для стилей (чтоб не ограничивало их видимость компонентом)
    providers: [DataService, BookService],  // провайдим сервисы данных внутрь всего приложения
    inputs: [/** "имя" */],                 // для проброса объектов внутрь компонента
    outputs:[/** "имя" */],                 // для выстреливания событий из компонента
    pipes:  [/** "имя" */],                 // для парсинга данных внутри представления
    directives: [ROUTER_DIRECTIVES],        // расширение компонента другими компонентами (и не только)

    /**
     * Стили компонента (здесь расширены с помощью ViewEncapsulation.None)
     * Используется БЭМ конвенция наименования классов.
     * Досадно что с бутстраповской не смотрится
     *
     * @see {@link https://ru.bem.info/methodology/naming-convention/}
     */
    styles:[`                               
        html,body{height: 100%;}
        .ng-invalid{background-color: #ffc59f;}
         
        .app-component{
            min-height: 100%;
            min-width: 300px;
            background-color: #f5f5f5;}
            
            .app-component__header{
                margin-top: 10px;}
                
            .app-component__content{}
            
            .app-component__footer{
                margin: 10px 0;}
            
            .app-component__brand{}
                .app-component__brand img{
                    float:left;
                    padding-right: 5px;
                    max-height: 100%;}
            
            .app-component .container{
                background-color: white;}
    `],

    template: require('app/app.component.html') // подключаемый шаблон
})
@Routes([
  { path: '/',       component: HomeComponent } // роутинг на главную страницу
])
export class AppComponent {}
