
import {IBook} from '../interfaces/IBook';
import {IAuthor} from '../interfaces/IAuthor';
import {IImage} from '../interfaces/IImage';

export class Book implements IBook{

    constructor(
        public title:string,
        public authors:IAuthor[],
        public pageCount:number,
        public publisher:string,
        public publicationDate:string,
        public releaseDate:string,
        public isbn:string,
        public image:IImage
    ){ }
}