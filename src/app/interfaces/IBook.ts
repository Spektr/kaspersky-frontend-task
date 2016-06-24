import {IAuthor} from './IAuthor';

export interface IBook{
    title:string;
    authors:IAuthor[];
    pageCount:number;
    publisher:string;
    publicationDate:string;
    releaseDate:string;
    isbn:string;
    imageBase64:string;
}
