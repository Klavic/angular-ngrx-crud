import { createReducer, on } from "@ngrx/store";
import { IBookState } from "./book.model";

import * as fromBooks from './index';

export const initialBooksState: IBookState = {
    books: [],
    isLoading: false,
};

const reducer = createReducer<IBookState>(
    initialBooksState,

    on(fromBooks.getBooks, (state, data) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(fromBooks.getBooksSuccess, (state, data) => {
        return {
            ...state,
            isLoading: false,
            books: data.books
        };
    }),

    on(fromBooks.createBook, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(fromBooks.createBookSuccess, (state, data) => {
        return {
            ...state,
            isLoading: false,
            books: [...state.books, data.book],
        };
    }),

    on(fromBooks.deleteBook, (state) => {
        return {
            ...state,
            isLoading: true,
        }
    }),

    on(fromBooks.deleteBookSuccess, (state, data) => {
        return {
            ...state,
            isLoading: false,
            books: state.books.filter((b) => b.id !== data.book.id)
        };
    }),

    on(fromBooks.updateBook, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(fromBooks.updateBookSuccess, (state, { book }) => {
        return {
            ...state,
            books: state.books.map((b) => b.id === book.id ? book : b),
            isLoading: false,
        };
    }),

    on(fromBooks.deleteBook2, (state) => {
        return {
            ...state,
            isLoading: true,
        }
    }),

    on(fromBooks.deleteBook2Success, (state, data) => {
        return {
            ...state,
            isLoading: false,
            books: [...data.books],
        };
    }),
)

export function booksReducer(state = initialBooksState, actions: any): IBookState {
    return reducer(state, actions);
}