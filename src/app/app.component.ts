import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBook } from './shared/models/book';

import * as  fromBooks from './store/book/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public books$!: Observable<IBook[]>;
  public isLoading$!: Observable<boolean>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  public onCreateBook(name: string): void {
    this.store.dispatch(fromBooks.createBook({
      book: {
        id: Math.random(),
        name
      }
    }));
  }

  public onUpdateBook(book: IBook): void {
    this.store.dispatch(fromBooks.updateBook({ book }));
  }

  public onDeleteBook(book: IBook): void {
    this.store.dispatch(fromBooks.deleteBook2({ book }));
  }

  private initDispatch(): void {
    this.store.dispatch(fromBooks.getBooks());
  }

  private initSubscriptions(): void {
    this.books$ = this.store.pipe(select(fromBooks.selectBookList));
    this.isLoading$ = this.store.pipe(select(fromBooks.selectBookIsLoading));
  }
}
