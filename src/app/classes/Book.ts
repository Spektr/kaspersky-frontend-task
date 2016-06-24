
import {IBook} from '../interfaces/IBook';
import {IAuthor} from '../interfaces/IAuthor';

/**
 * Класс Книга
 *
 * @class
 * @implements {IBook}
 */
export class Book implements IBook{

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
    constructor(
        public title:string,
        public authors:IAuthor[],
        public pageCount:number,
        public publisher:string,
        public publicationDate:string,
        public releaseDate:string,
        public isbn:string,
        public imageBase64:string
    ){ }
}