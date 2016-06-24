import {IAuthor} from './IAuthor';

/**
 * Интерфейс сущности Книга
 *
 * @interface
 */
export interface IBook{
    title:string;           // заголовок
    authors:IAuthor[];      // массив авторов
    pageCount:number;       // количество страниц
    publisher:string;       // издательство
    publicationDate:string; // дата публикации
    releaseDate:string;     // дата выхода в тираж
    isbn:string;            // международный идентификатор
    imageBase64:string;     // Base64 код ака изображение
}
