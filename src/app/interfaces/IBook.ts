import {IAuthor} from './IAuthor';
import {IImage} from './IImage';

export interface IBook{
    title:string;
    authors:IAuthor[];
    pageCount:number;
    publisher:string;
    publicationDate:string;
    releaseDate:string;
    isbn:string;
    image:IImage;
}
