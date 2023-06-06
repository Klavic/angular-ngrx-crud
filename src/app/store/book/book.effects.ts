import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from 'rxjs/operators';

import { BookService } from "src/app/shared/services/book.service";

import * as fromBooks from './index';

import { IBook } from "src/app/shared/models/book";

@Injectable()
export class BookEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly bookService: BookService,
    ) { }

    public getBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBooks.getBooks.type),
            switchMap(() => this.bookService.getBooks()),
            map((books: IBook[]) => fromBooks.getBooksSuccess({ books }))
        )
    );

    public createBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBooks.createBook),
            switchMap(({ book }) => this.bookService.create(book)),
            map((book: IBook) => fromBooks.createBookSuccess({ book }))
        )
    );

    public updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBooks.updateBook),
            switchMap(({ book }) => this.bookService.update(book)),
            map((book: IBook) => fromBooks.updateBookSuccess({ book }))
        )
    );

    public deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBooks.deleteBook),
            switchMap(({ book }) => this.bookService.delete(book)),
            map((book: IBook) => fromBooks.deleteBookSuccess({ book }))
        )
    );

    public deleteBook2$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBooks.deleteBook2),
            switchMap(({ book }) => this.bookService.delete(book)),
            switchMap(() => this.bookService.getBooks()),
            map((books: IBook[]) => fromBooks.deleteBook2Success({ books }))
        )
    );
}