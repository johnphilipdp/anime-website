import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AnimeListsComponent } from './anime-lists/anime-lists.component';
import { AnimeListsItemComponent } from './anime-lists-item/anime-lists-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AnimeListsComponent,
    AnimeListsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
