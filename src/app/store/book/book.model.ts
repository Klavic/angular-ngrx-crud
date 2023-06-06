import { IBook } from "src/app/shared/models/book";

export interface IBookState {
    books: IBook[];
    isLoading: boolean;
}