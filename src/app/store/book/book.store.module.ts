import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { booksReducer } from "./book.reducers";
import { BookEffects } from "./book.effects";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    imports: [
        StoreModule.forFeature('book', booksReducer),
        EffectsModule.forFeature([BookEffects])
    ]
})
export class BookStoreModule { }