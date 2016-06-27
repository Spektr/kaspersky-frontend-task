webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Файл для старта приложения
	 * Провайдит глобальные сервисы, так же является точкой входа
	 * Импорт Http необязателен, т.к. в данном задании не используется
	 */
	var common_1 = __webpack_require__(1);
	var platform_browser_dynamic_1 = __webpack_require__(160);
	var core_1 = __webpack_require__(4);
	var http_1 = __webpack_require__(280);
	var router_1 = __webpack_require__(301);
	var app_component_1 = __webpack_require__(323);
	// Функция включения продуктового окружения (убирает консольные ошибки)
	// enableProdMode()
	platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
	    http_1.HTTP_PROVIDERS,
	    router_1.ROUTER_PROVIDERS,
	    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
	])
	    .catch(function (err) { return console.error(err); });
	

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Стартовый компонент приложения
	 * Прокомментирован подробно, следующие компоненты работают по аналогии с этим
	 */
	var core_1 = __webpack_require__(4); // импортируем анотации(конструкторы) и хелперы
	var router_1 = __webpack_require__(301); // импортируем роутинговые примочки
	var book_service_1 = __webpack_require__(324); // импортируем сервис для работы с книгами (для проброса)
	var data_service_1 = __webpack_require__(325); // импортируем сервис для работы с данными (для проброса)
	var home_component_1 = __webpack_require__(328); // импортируем компонент главной страницы
	// анотация компонента
	var AppComponent = (function () {
	    function AppComponent() {
	    }
	    AppComponent = __decorate([
	        // импортируем компонент главной страницы
	        core_1.Component({
	            selector: 'app-component',
	            encapsulation: core_1.ViewEncapsulation.None,
	            providers: [data_service_1.DataService, book_service_1.BookService],
	            inputs: [],
	            outputs: [],
	            pipes: [],
	            directives: [router_1.ROUTER_DIRECTIVES],
	            /**
	             * Стили компонента (здесь расширены с помощью ViewEncapsulation.None)
	             * Используется БЭМ конвенция наименования классов.
	             * Досадно что с бутстраповской не смотрится
	             *
	             * @see {@link https://ru.bem.info/methodology/naming-convention/}
	             */
	            styles: ["                               \n        html,body{height: 100%;}\n        .ng-invalid{background-color: #ffc59f;}\n         \n        .app-component{\n            min-height: 100%;\n            min-width: 300px;\n            background-color: #f5f5f5;}\n            \n            .app-component__header{\n                margin-top: 10px;}\n                \n            .app-component__content{}\n            \n            .app-component__footer{\n                margin: 10px 0;}\n            \n            .app-component__brand{}\n                .app-component__brand img{\n                    float:left;\n                    padding-right: 5px;\n                    max-height: 100%;}\n            \n            .app-component .container{\n                background-color: white;}\n    "],
	            template: __webpack_require__(337) // подключаемый шаблон
	        }),
	        router_1.Routes([
	            { path: '/', component: home_component_1.HomeComponent } // роутинг на главную страницу
	        ]), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;
	

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var data_service_1 = __webpack_require__(325);
	/**
	 * Сервис для работы с книгами
	 * Жутко ненормализованный сервис, оперирует с полным массивом книг (т.к. задание тестовое)
	 */
	var BookService = (function () {
	    /**
	     * @constructor
	     * @param {DataService} _dataService    - фейковый сервис данных
	     */
	    function BookService(_dataService) {
	        this._dataService = _dataService;
	        // массив сохраненных книг
	        this.storedBooks = [];
	    }
	    /**
	     * Возвращение списка книг
	     *
	     * @returns {Array<IBook>}  - список книг
	     */
	    BookService.prototype.list = function () {
	        return this.storedBooks = this._dataService.getBooks();
	    };
	    /**
	     * Обновление/добавление новой книги
	     *
	     * @param {IBook} book  - книга
	     */
	    BookService.prototype.updateBook = function (book) {
	        var self = this, isEditable = false;
	        self.storedBooks = self.storedBooks.map(function (item) {
	            if (!self.equal(item, book))
	                return item;
	            isEditable = true;
	            return book;
	        });
	        // если во всем массиве не изменилось ни одной книги, добавляем новую
	        if (!isEditable)
	            self.storedBooks.push(book);
	        // сохраняем книги
	        self._dataService.setBooks(self.storedBooks);
	    };
	    /**
	     * Удаление книги
	     *
	     * @param {IBook} book  - книга
	     */
	    BookService.prototype.removeBook = function (book) {
	        var self = this;
	        self.storedBooks.forEach(function (item) {
	            if (!self.equal(item, book))
	                return;
	            self.storedBooks.splice(self.storedBooks.indexOf(item), 1);
	        });
	        self._dataService.setBooks(self.storedBooks);
	    };
	    /**
	     * Сличение книг
	     * Для сравнения используется международный идентификатор (выступает в качестве id сущности)
	     * Прямое сравнение объектов может давать сбой ввиду клонирования оных внутри приложения
	     *
	     * @param {IBook} first     - оригинальная книга
	     * @param {IBook} second    - сравниваемая книга
	     * @returns {boolean}       - результат сравнения
	     */
	    BookService.prototype.equal = function (first, second) {
	        return first.isbn === second.isbn;
	    };
	    BookService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [data_service_1.DataService])
	    ], BookService);
	    return BookService;
	}());
	exports.BookService = BookService;
	

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var book_fixtures_1 = __webpack_require__(326);
	/**
	 * Сервис получения данных
	 * Инкапсулирует в себе получение списка книг и сохраненной сортировки
	 */
	var DataService = (function () {
	    /**
	     * При создании проверяет локальное хранилище, преобразует данные из него,
	     * если ничего не получается подставляет фикстуры
	     *
	     * @constructor
	     */
	    function DataService() {
	        // проверяет поддержку локального хранилища
	        this._isLocalStorage = ('localStorage' in window && !!window['localStorage']);
	        /**
	         * @typedef _data
	         * @type {Object}
	         * @property {Array<IBook>} books   - массив книг
	         * @property {string} sorting       - сохраненное имя поля, по которому идет сортировка (ASC)
	         * @private
	         */
	        this._data = null;
	        if (this._isLocalStorage) {
	            var data = window.localStorage.getItem('data');
	            try {
	                this._data = JSON.parse(data);
	            }
	            catch (e) {
	                this._data = null;
	            }
	        }
	        if (!this._data) {
	            this._data = {
	                books: book_fixtures_1.aBook,
	                sorting: null
	            };
	        }
	    }
	    /**
	     * Синхронизация данных с локальным хранилищем (сохраняет данные)
	     */
	    DataService.prototype.synchronize = function () {
	        if (this._isLocalStorage) {
	            try {
	                window.localStorage.setItem('data', JSON.stringify(this._data));
	            }
	            catch (e) {
	                throw new Error('Can`t save data into browser local storage');
	            }
	        }
	    };
	    /**
	     * Получение списка книг
	     *
	     * @returns {Array<IBook>}      - массив книг
	     */
	    DataService.prototype.getBooks = function () {
	        return this._data.books;
	    };
	    /**
	     * Сохранение списка книг
	     *
	     * @param {Array<IBook>} books  - массив книг
	     */
	    DataService.prototype.setBooks = function (books) {
	        this._data.books = books;
	        this.synchronize();
	    };
	    /**
	     * Получение поля по которому была сортировка
	     *
	     * @returns {string}    - наименование поля
	     */
	    DataService.prototype.getSorting = function () {
	        return this._data.sorting;
	    };
	    /**
	     * Сохранение названия поля для сортировки
	     *
	     * @param {string} name - наименование поля
	     */
	    DataService.prototype.setSorting = function (name) {
	        this._data.sorting = name;
	        this.synchronize();
	    };
	    DataService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], DataService);
	    return DataService;
	}());
	exports.DataService = DataService;
	

/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Book_1 = __webpack_require__(327);
	/**
	 * Массив дефолтных значений для заполнения таблицы
	 *
	 * @module aBook
	 * @type {Book[]}
	 */
	exports.aBook = [
	    new Book_1.Book("Совершенный код", [
	        { firstName: "Стив", lastName: "Макконел" }
	    ], 896, "Питер, Русская Редакция", '2007', '01.01.2007', "5-469-00822-3", "data:image/jpeg;base64,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"),
	    new Book_1.Book("Рефакторинг", [
	        { firstName: "Мартин", lastName: "Фаулер" },
	        { firstName: "Кент", lastName: "Бек" }
	    ], 432, "Символ-Плюс", '2008', '01.01.2008', "978-5-93286-045-8", "data:image/jpeg;base64,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"),
	    new Book_1.Book("Паттерны проектирования", [
	        { firstName: "Эрих", lastName: "Гамма" },
	        { firstName: "Ричард", lastName: "Хелм" },
	        { firstName: "Ральф", lastName: "Джонсон" },
	        { firstName: "Джон", lastName: "Влиссидес" }
	    ], 366, "Питер", '2016', '01.01.2016', "978-5-459-01720-5", "data:image/jpeg;base64,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")
	];
	

/***/ },

/***/ 327:
/***/ function(module, exports) {

	"use strict";
	/**
	 * Класс Книга
	 *
	 * @class
	 * @implements {IBook}
	 */
	var Book = (function () {
	    /**
	     * Конструктор сущности
	     *
	     * @constructor
	     * @param title {string}            - заголовок
	     * @param authors {Array<IAuthor>}  - массив авторов
	     * @param pageCount {number}        - количество страниц
	     * @param publisher {string}        - издательство
	     * @param publicationDate {string}  - дата публикации
	     * @param releaseDate {string}      - дата выхода в тираж
	     * @param isbn {string}             - международный идентификатор
	     * @param imageBase64 {string}      - Base64 код ака изображение
	     */
	    function Book(title, authors, pageCount, publisher, publicationDate, releaseDate, isbn, imageBase64) {
	        this.title = title;
	        this.authors = authors;
	        this.pageCount = pageCount;
	        this.publisher = publisher;
	        this.publicationDate = publicationDate;
	        this.releaseDate = releaseDate;
	        this.isbn = isbn;
	        this.imageBase64 = imageBase64;
	    }
	    return Book;
	}());
	exports.Book = Book;
	

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var book_service_1 = __webpack_require__(324);
	var book_list_component_1 = __webpack_require__(329);
	var book_detail_component_1 = __webpack_require__(331);
	var Book_1 = __webpack_require__(327);
	/**
	 * Компонент главной страницы
	 * Соединяет в себе компоненты отображения списка всех книг и детальной информации по книге
	 */
	var HomeComponent = (function () {
	    function HomeComponent(_bookService) {
	        this._bookService = _bookService;
	        this.aBook = null; // список книг
	        this.selectedBook = null; // выбранная в таблице книга
	    }
	    /**
	     * Метод инициализации компонента (формирует дефолтные условия)
	     * Получает из сервиса все книги, сбрасывает выбранную
	     */
	    HomeComponent.prototype.ngOnInit = function () {
	        this.aBook = this._bookService.list();
	        this.selectedBook = null;
	    };
	    /**
	     * Выбор книги из таблицы
	     * Обработчик события для компонента списка книг
	     *
	     * @param {IBook} book  - книга
	     */
	    HomeComponent.prototype.selectBook = function (book) {
	        this.selectedBook = book;
	    };
	    /**
	     * Обновление книги
	     * Обработчик события для компонента информации о книге
	     *
	     * @param {IBook} book  - книга
	     */
	    HomeComponent.prototype.updateBook = function (book) {
	        this._bookService.updateBook(book);
	        this.ngOnInit();
	    };
	    /**
	     * Удаление книги
	     * Обработчик события для компонента информации о книге
	     *
	     * @param {IBook} book  - книга
	     */
	    HomeComponent.prototype.removeBook = function (book) {
	        this._bookService.removeBook(book);
	        this.ngOnInit();
	    };
	    /**
	     * Добавление книги
	     *
	     */
	    HomeComponent.prototype.appendBook = function () {
	        this.selectBook(new Book_1.Book("Новая книжке", [], null, null, null, null, null, null));
	    };
	    HomeComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'home-component',
	            directives: [book_list_component_1.BookListComponent, book_detail_component_1.BookDetailComponent],
	            styles: ["\n        .home-component{}\n        \n            .home-component .center-block{\n                margin-bottom: 3px;}        \n    "],
	            template: __webpack_require__(336)
	        }), 
	        __metadata('design:paramtypes', [book_service_1.BookService])
	    ], HomeComponent);
	    return HomeComponent;
	}());
	exports.HomeComponent = HomeComponent;
	

/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var data_service_1 = __webpack_require__(325);
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
	var BookListComponent = (function () {
	    function BookListComponent(_dataService) {
	        this._dataService = _dataService;
	        // список книг
	        this.aBook = null;
	        // эмитер события выбора книги
	        this.selectBookChange = new core_1.EventEmitter();
	    }
	    /**
	     * Выбор книги из таблицы
	     * Выстреливает событие выбора
	     *
	     * @param {IBook} book  - выбранная книга
	     */
	    BookListComponent.prototype.selectBook = function (book) {
	        this.selectBookChange.emit(book);
	    };
	    /**
	     * Сортировка таблицы
	     *
	     * @param {string} name - поле по которому будет сортировка
	     * @param {boolean} asc - направление сортировки (если потребуется)
	     */
	    BookListComponent.prototype.sortBy = function (name, asc) {
	        var self = this, negative = asc ? 1 : -1;
	        self.aBook.sort(function (first, second) { return negative * (first[name].trim() < second[name].trim() ? 1 : -1); });
	        self._dataService.setSorting(name);
	    };
	    BookListComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'book-list-component',
	            inputs: ['aBook'],
	            outputs: ['selectBookChange'],
	            styles: ["\n        .book-list-component{}\n        \n            .book-list-component .center-block{\n                margin-bottom: 3px;}   \n                \n            .book-list-component td{\n                vertical-align: middle;}    \n                 \n            .book-list-component th{\n                text-align:center;\n                vertical-align: middle;}        \n    "],
	            template: __webpack_require__(330)
	        }), 
	        __metadata('design:paramtypes', [data_service_1.DataService])
	    ], BookListComponent);
	    return BookListComponent;
	}());
	exports.BookListComponent = BookListComponent;
	

/***/ },

/***/ 330:
/***/ function(module, exports) {

	module.exports = "<div class=\"book-list-component\">\r\n    <table class=\"table\">\r\n        <thead>\r\n        <tr>\r\n            <th class=\"hidden-xs hidden-sm\">Изображение</th>\r\n            <th class=\"\" (click)=\"sortBy('title')\">\r\n                Заголовок\r\n                <span class=\"glyphicon glyphicon-sort-by-attributes\"\r\n                      [class.text-danger]=\"_dataService.getSorting()=='title'\" aria-hidden=\"true\"\r\n                ></span>\r\n            </th>\r\n            <th class=\"hidden-xs\">Авторы</th>\r\n            <th class=\"hidden-xs\">Страниц</th>\r\n            <th class=\"hidden-xs hidden-sm\">Издательство</th>\r\n            <th class=\"\" (click)=\"sortBy('publicationDate')\">\r\n                Год публикации\r\n                <span class=\"glyphicon glyphicon-sort-by-attributes\"\r\n                      [class.text-danger]=\"_dataService.getSorting()=='publicationDate'\" aria-hidden=\"true\"\r\n                ></span>\r\n            </th>\r\n            <th class=\"hidden-xs hidden-sm\">Дата выхода в тираж</th>\r\n            <th class=\"\">ISBN</th>\r\n        </tr>\r\n        </thead>\r\n        <tr *ngFor=\"let book of aBook\" (click)=\"selectBook(book)\">\r\n            <td class=\"hidden-xs hidden-sm text-center\">\r\n                <span *ngIf=\"book.imageBase64\" class=\"glyphicon glyphicon-picture\" aria-hidden=\"true\"></span>\r\n            </td>\r\n            <td>{{book.title}}</td>\r\n            <td class=\"hidden-xs\">\r\n                <div class=\"label label-default center-block\" *ngFor=\"let author of book.authors\">{{author.firstName}} {{author.lastName}}</div>\r\n            </td>\r\n            <td class=\"hidden-xs\">{{book.pageCount}}</td>\r\n            <td class=\"hidden-xs hidden-sm\">{{book.publisher}}</td>\r\n            <td class=\"\">{{book.publicationDate}}</td>\r\n            <td class=\"hidden-xs hidden-sm\">{{book.releaseDate}}</td>\r\n            <td>{{book.isbn}}</td>\r\n        </tr>\r\n    </table>\r\n</div>"

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var common_1 = __webpack_require__(1); // цепляем стандартные валидаторы
	var validators_1 = __webpack_require__(332); // цепляем собственные валидаторы
	var dynamic_list_component_1 = __webpack_require__(333);
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
	var BookDetailComponent = (function () {
	    /**
	     * @constructor
	     */
	    function BookDetailComponent() {
	        this.model = null; // текущая книга
	        this.modelChange = new core_1.EventEmitter(); // событие на изменение книги
	        this.modelRemove = new core_1.EventEmitter(); // событие на удаление книги
	        this.editedModel = null; // редактируемый инстанс текущей книги
	        this.isDataValid = true; // флаг валидности данных
	        // валидация авторов
	        this.authorValidator = common_1.Validators.compose([common_1.Validators.required, common_1.Validators.maxLength(20)]);
	        // валидация всей формы
	        this.formValidation = new common_1.ControlGroup({
	            // авторы, пустая группа контролов (о валидации позаботится компонент списка)
	            authors: new common_1.ControlGroup({}),
	            // заголовок обязательный, не более 30 символов
	            title: new common_1.Control('title', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.maxLength(30)])),
	            // ... все прочие по аналогии
	            pageCount: new common_1.Control('pageCount', common_1.Validators.compose([common_1.Validators.required, validators_1.Validators.minMax(0, 10000)])),
	            publisher: new common_1.Control('publisher', common_1.Validators.maxLength(30)),
	            publicationDate: new common_1.Control('publicationDate', validators_1.Validators.yearFrom(1800)),
	            releaseDate: new common_1.Control('releaseDate', validators_1.Validators.date(new Date(1800, 0, 1))),
	            isbn: new common_1.Control('isbn', validators_1.Validators.isbn()),
	            image: new common_1.Control('image', common_1.Validators.required)
	        });
	        var self = this;
	        // синхронизируем флаг валидности при изменении формы
	        self.formValidation.valueChanges.subscribe(function () {
	            self.isDataValid = self.formValidation.valid;
	        });
	    }
	    /**
	     * Хук на изменеия
	     * Клонирует модель для редактирования и перестраивает стили
	     */
	    BookDetailComponent.prototype.ngOnChanges = function () {
	        this.editedModel = JSON.parse(JSON.stringify(this.model));
	        this.setStyles();
	    };
	    /**
	     * Перестройка стилей
	     * Отображение зависит от наличия изображения в сущности и ширины экрана
	     */
	    BookDetailComponent.prototype.setStyles = function () {
	        this.styles = {
	            image: {
	                "hidden": !this.editedModel.imageBase64,
	                "col-xs-offset-0 col-sm-offset-2 col-md-offset-0 col-lg-offset-0 col-xs-12 col-sm-8 col-md-4 col-lg-4 text-center": this.editedModel.imageBase64
	            },
	            content: {
	                "col-xs-12 col-sm-12 col-md-12 col-lg-12": !this.editedModel.imageBase64,
	                "col-xs-12 col-sm-12 col-md-8 col-lg-8": this.editedModel.imageBase64
	            }
	        };
	    };
	    /**
	     * Обновление модели
	     */
	    BookDetailComponent.prototype.editBook = function () {
	        this.model = this.editedModel;
	        this.modelChange.emit(this.editedModel);
	        this.ngOnChanges();
	    };
	    /**
	     * Удаление модели
	     */
	    BookDetailComponent.prototype.removeBook = function () {
	        this.modelRemove.emit(this.model);
	    };
	    /**
	     * Загрузка изображения
	     * Использует возможности FileReader для получения кода изображения
	     *
	     * @param {*} event - стандартное событие DOM
	     */
	    BookDetailComponent.prototype.loadImage = function (event) {
	        var self = this, input = event.target, reader = new FileReader();
	        // если файл был загружен
	        if (input.files && input.files[0]) {
	            // лямбда на загрузчик
	            reader.onload = function (e) {
	                var result = e.target.result;
	                // проверяем на то что это изображение
	                if (!/^data:image\/(png|jpg|jpeg);base64,/.test(result))
	                    return alert("Добавлять можно только PNG и JPG");
	                self.editedModel.imageBase64 = e.target.result;
	                self.setStyles();
	            };
	            // выстреливаем загрузкой
	            reader.readAsDataURL(input.files[0]);
	        }
	    };
	    /**
	     * Удаление изображения
	     */
	    BookDetailComponent.prototype.removeImage = function () {
	        var self = this;
	        self.editedModel.imageBase64 = null;
	        self.setStyles();
	    };
	    BookDetailComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'book-detail-component',
	            inputs: ['model'],
	            outputs: ['modelChange', 'modelRemove'],
	            directives: [dynamic_list_component_1.DynamicListComponent],
	            template: __webpack_require__(335)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BookDetailComponent);
	    return BookDetailComponent;
	}());
	exports.BookDetailComponent = BookDetailComponent;
	

/***/ },

/***/ 332:
/***/ function(module, exports) {

	"use strict";
	/**
	 * Кастомные валидаторы
	 *
	 * @module Validators
	 * @example
	 * new Control('', Validators.minMax(0,10000)) - навешивает на контрол валидатор диапазона значений
	 */
	exports.Validators = {
	    /**
	     * Валидация диапазона значений
	     *
	     * @param min {number}          - начинающиеся с (не менее, включая)
	     * @param max {number}          - заканчивающиеся до (не более, включая)
	     * @returns {function(any): {}} - лямбда для проверки значения контрола
	     */
	    minMax: function (min, max) {
	        return function (control) {
	            var isNumber = /^\d+$/.test(control.value), value = parseInt(control.value);
	            return (!isNumber || min > value || value > max) ? { minmax: true } : null;
	        };
	    },
	    /**
	     * Валидация года начавшегося не раньше чем указанный (включая)
	     *
	     * @param minYear {number}      - минимальный доступный год
	     * @returns {function(any): {}} - лямбда для проверки значения контрола
	     */
	    yearFrom: function (minYear) {
	        return function (control) {
	            var value = control.value, isValidFormat = /^\d{4}$/.test(value);
	            if (isValidFormat && (+value >= minYear))
	                return null;
	            return { yearfrom: true };
	        };
	    },
	    /**
	     * Валидация даты начавшейся не раньше чем указанная (включая)
	     *
	     * @param minDate {Date}        - минимально доступная дата
	     * @returns {function(any): {}} - лямбда для проверки значения контрола
	     */
	    date: function (minDate) {
	        return function (control) {
	            var value = control.value, regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((?:18|19|20)\d\d)$/, match = (value ? value.match(regex) : null);
	            if (match
	                && ((new Date(+match[3], +match[2] - 1, +match[1])) >= minDate)) {
	                return null;
	            }
	            return { date: true };
	        };
	    },
	    /**
	     * Валидация международного идентификатора книги
	     * чесно позаимоствованная регулярка
	     *
	     * @see {@link https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html}
	     * @returns {function(any): {}} - лямбда для проверки значения контрола
	     */
	    isbn: function () {
	        return function (control) {
	            var subject = control.value, regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, result = { isbn: true };
	            if (regex.test(subject)) {
	                // Remove non ISBN digits, then split into an array
	                var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
	                // Remove the final ISBN digit from `chars`, and assign it to `last`
	                var last = chars.pop();
	                var sum = 0;
	                var check, i;
	                if (chars.length == 9) {
	                    // Compute the ISBN-10 check digit
	                    chars.reverse();
	                    for (i = 0; i < chars.length; i++) {
	                        sum += (i + 2) * parseInt(chars[i], 10);
	                    }
	                    check = 11 - (sum % 11);
	                    if (check == 10) {
	                        check = "X";
	                    }
	                    else if (check == 11) {
	                        check = "0";
	                    }
	                }
	                else {
	                    // Compute the ISBN-13 check digit
	                    for (i = 0; i < chars.length; i++) {
	                        sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
	                    }
	                    check = 10 - (sum % 10);
	                    if (check == 10) {
	                        check = "0";
	                    }
	                }
	                if (check == last) {
	                    return null;
	                }
	                else {
	                    return result;
	                }
	            }
	            else {
	                return result;
	            }
	        };
	    }
	};
	

/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var common_1 = __webpack_require__(1);
	/**
	 * Компонент для редактируемого списка
	 *
	 * Мета по сущности списка
	 * @typedef FormatItem {
	 *  @property {string} name            - название ключа айтемки
	 *  @property {string} value           - описание ключа айтемки
	 *  @property {ValidatorFn} validator  - фукнкция валидации значения
	 * }
	 *
	 * @example {
	 *  <dynamic-list-component
	 *    [(items)]="items"
	 *    [format]="[
	 *       {name:'firstName', value:'Имя', validator:authorValidator},
	 *       {name:'lastName', value:'Фамилия', validator:authorValidator}
	 *    ]"
	 *    [groupControl]="emptyControlsGroup"
	 *  ></dynamic-list-component>
	 *   param {Array<Object>} items         - список для редактирования
	 *   param {Array<FormatItem>} format    - мета информация по сущностям списка
	 *   param {ControlGroup} groupControl   - проброшенный внутрь списка контрол (для валидации родительской формы)
	 * }
	 *
	 */
	var DynamicListComponent = (function () {
	    function DynamicListComponent() {
	        // контрол для списка
	        this.groupControl = new common_1.ControlGroup({});
	        // мета инфа по сущностям списка
	        this.format = [];
	        // массив сущностей
	        this.items = [];
	        // событие обновления списка
	        this.itemsChange = new core_1.EventEmitter();
	    }
	    /**
	     * Хук на изменение
	     * Переустанавливает контролы полям списка
	     */
	    DynamicListComponent.prototype.ngOnChanges = function () {
	        this.clearControls();
	        this.addControls();
	    };
	    /**
	     * Хук на дестракшн
	     * Сбрасывает контролы
	     */
	    DynamicListComponent.prototype.ngOnDestroy = function () {
	        this.clearControls();
	    };
	    /**
	     * Добавление нового элемента в список
	     */
	    DynamicListComponent.prototype.add = function () {
	        var self = this, newItem = {};
	        // заполняем инстанс пустыми свойствами
	        self.format.forEach(function (field) {
	            newItem[field.name] = '';
	        });
	        self.items.push(newItem);
	        self.ngOnChanges();
	    };
	    /**
	     * Удаление элемента из списка
	     *
	     * @param {IItem} item  - элемент для удаления
	     */
	    DynamicListComponent.prototype.remove = function (item) {
	        var self = this, itemIndex = self.items.indexOf(item);
	        self.items.splice(itemIndex, 1);
	        self.ngOnChanges();
	    };
	    /**
	     * Навешивание контролов на элементы списка (для валидации)
	     * Для прохода по всем полям используем вложенные цыклы
	     */
	    DynamicListComponent.prototype.addControls = function () {
	        var self = this;
	        // проходим по формату и элементам списка
	        self.format.forEach(function (field, fieldIndex) {
	            self.items.forEach(function (item, itemIndex) {
	                // создаем контрол
	                var validator = field.validator, control = new common_1.Control('', validator);
	                // привязываем контрол с элементом
	                control.updateValue(item[field.name], {
	                    emitEvent: true,
	                    emitModelToViewChange: true
	                });
	                // добавляем контрол в общую коллекцию родительской формы
	                self.groupControl.addControl(self.generateName([itemIndex, fieldIndex]), control);
	            });
	        });
	        // пробрасываем событие обновления наверх
	        self.groupControl.updateValueAndValidity({ emitEvent: true });
	    };
	    /**
	     * Удаление всех контролов
	     */
	    DynamicListComponent.prototype.clearControls = function () {
	        var self = this;
	        self.groupControl.controls = {};
	        self.groupControl.updateValueAndValidity({ emitEvent: true });
	    };
	    /**
	     * Генерация имени по ключам
	     *
	     * @param {Array(string|number)} keys   - ключи для склейки
	     * @returns {string}                    - оригинальное имя
	     */
	    DynamicListComponent.prototype.generateName = function (keys) {
	        return 'control' + keys.join('');
	    };
	    DynamicListComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'dynamic-list-component',
	            inputs: ['items', 'format', 'groupControl'],
	            outputs: ['itemsChange'],
	            styles: ["\n        .dynamic-list-component{}\n            .dynamic-list-component .form-control{\n                float: left;\n                margin-right: 5px;\n                width: auto;\n            }\n    "],
	            template: __webpack_require__(334)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DynamicListComponent);
	    return DynamicListComponent;
	}());
	exports.DynamicListComponent = DynamicListComponent;
	

/***/ },

/***/ 334:
/***/ function(module, exports) {

	module.exports = "<div class=\"dynamic-list-component\">\r\n    <div *ngFor=\"let item of items; let itemIndex = index\" class=\"form-group\">\r\n        <div class=\"col-md-12\">\r\n            <input *ngFor=\"let field of format; let fieldIndex = index\" [(ngModel)]=\"item[field.name]\"\r\n                   [placeholder]=\"field.value\" class=\"form-control\"\r\n                   [ngFormControl]=\"groupControl.controls[generateName([itemIndex, fieldIndex])]\"/>\r\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"remove(item)\">\r\n                <span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span>\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"add()\">\r\n        <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\r\n    </button>\r\n</div>"

/***/ },

/***/ 335:
/***/ function(module, exports) {

	module.exports = "<div class=\"book-detail-component\">\r\n    <div class=\"row\">\r\n        <div [ngClass]=\"styles.image\" >\r\n            <img src=\"{{editedModel.imageBase64}}\" class=\"img-responsive img-thumbnail\" alt=\"\">\r\n            <br/>\r\n            <br/>\r\n        </div>\r\n\r\n        <div [ngClass]=\"styles.content\" >\r\n            <form class=\"form-horizontal\" (ngSubmit)=\"editBook()\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"title\" class=\"col-sm-2 control-label\">Заголовок</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"title\" placeholder=\"Заголовок\" [(ngModel)]=\"editedModel.title\"\r\n                               [ngFormControl]=\"formValidation.controls.title\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"col-sm-2 control-label\">Авторы</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <dynamic-list-component\r\n                                [(items)]=\"editedModel.authors\"\r\n                                [format]=\"[\r\n                                    {name:'firstName', value:'Имя', validator:authorValidator},\r\n                                    {name:'lastName', value:'Фамилия', validator:authorValidator}\r\n                                ]\"\r\n                                [groupControl]=\"formValidation.controls.authors\"\r\n                        ></dynamic-list-component>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"pageCount\" class=\"col-sm-2 control-label\">Страниц</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"pageCount\" placeholder=\"Количество страниц\"\r\n                               [(ngModel)]=\"editedModel.pageCount\" [ngFormControl]=\"formValidation.controls.pageCount\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"publisher\" class=\"col-sm-2 control-label\">Издетельство</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"publisher\" placeholder=\"Издетельство\"\r\n                               [(ngModel)]=\"editedModel.publisher\" [ngFormControl]=\"formValidation.controls.publisher\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"publicationDate\" class=\"col-sm-2 control-label\">Год публикации</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"publicationDate\" placeholder=\"Год публикации (пример: 1800)\"\r\n                               [(ngModel)]=\"editedModel.publicationDate\" [ngFormControl]=\"formValidation.controls.publicationDate\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"releaseDate\" class=\"col-sm-2 control-label\">Дата выхода в тираж</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"releaseDate\" placeholder=\"Дата выхода в тираж (пример: 01.01.1800)\"\r\n                               [(ngModel)]=\"editedModel.releaseDate\" [ngFormControl]=\"formValidation.controls.releaseDate\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"isbn\" class=\"col-sm-2 control-label\">ISBN</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"isbn\" placeholder=\"Международный идентификатор книги\"\r\n                               [(ngModel)]=\"editedModel.isbn\" [ngFormControl]=\"formValidation.controls.isbn\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"image\" class=\"col-sm-2 control-label\">Изображение</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <div class=\"input-group\">\r\n                            <input type=\"file\" class=\"form-control\" id=\"image\" (change)=\"loadImage($event)\" />\r\n                            <span class=\"input-group-btn\">\r\n                                <button type=\"button\" class=\"btn btn-default\" (click)=\"removeImage()\">\r\n                                    <span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span>\r\n                                </button>\r\n                            </span>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-offset-2 col-sm-10\">\r\n                        <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!isDataValid || !editedModel.authors.length\">Редактировать</button>\r\n                        <button class=\"btn btn-default\" (click)=\"removeBook()\">удалить</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>"

/***/ },

/***/ 336:
/***/ function(module, exports) {

	module.exports = "<div class=\"home-component\">\r\n\r\n    <book-list-component\r\n        [aBook]=\"aBook\"\r\n        (selectBookChange)=\"selectBook($event)\"\r\n    ></book-list-component>\r\n\r\n    <hr/>\r\n    <div class=\"text-center\">\r\n        <button class=\"btn btn-default\" *ngIf=\"!selectedBook\" (click)=\"appendBook()\" > Добавить Книгу </button>\r\n    </div>\r\n\r\n    <book-detail-component\r\n        *ngIf=\"selectedBook\"\r\n        [model]=\"selectedBook\"\r\n        (modelChange)=\"updateBook($event)\"\r\n        (modelRemove)=\"removeBook($event)\"\r\n    ></book-detail-component>\r\n\r\n</div>"

/***/ },

/***/ 337:
/***/ function(module, exports) {

	module.exports = "<div class=\"app-component\">\r\n    <div class=\"container\">\r\n        <header class=\"app-component__header\">\r\n            <nav class=\"navbar navbar-default\">\r\n                <div class=\"container-fluid\">\r\n\r\n                    <div class=\"navbar-header\">\r\n                        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\">\r\n                            <span class=\"sr-only\">Меню</span>\r\n                            <span class=\"icon-bar\"></span>\r\n                            <span class=\"icon-bar\"></span>\r\n                            <span class=\"icon-bar\"></span>\r\n                        </button>\r\n                        <a class=\"navbar-brand app-component__brand\" href=\"#\">\r\n                            <img src=\"assets/images/logo-kaspersky.png\" alt=\"\">\r\n                            нижный редактор\r\n                        </a>\r\n                    </div>\r\n\r\n                    <div class=\"collapse navbar-collapse\" id=\"navbar\">\r\n                        <ul class=\"nav navbar-nav\">\r\n                            <li class=\"active\">\r\n                                <a href=\"#\" [routerLink]=\"['/']\">Список <span class=\"sr-only\">(текущий)</span></a>\r\n                            </li>\r\n                            <li>\r\n                                <a href=\"assets/csstask/index.html\" target=\"_blank\">CSS задание</a>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </nav>\r\n        </header>\r\n\r\n        <main  class=\"app-component__content\">\r\n            <router-outlet></router-outlet>\r\n        </main>\r\n\r\n        <footer  class=\"app-component__footer text-center text-muted\">\r\n            <h6>\r\n                Spektr специально для команды Лаборатории Касперского\r\n            </h6>\r\n        </footer>\r\n\r\n    </div>\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=boot.map