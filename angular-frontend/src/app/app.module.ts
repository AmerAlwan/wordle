import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { WordLetterComponent } from './components/word/word-letter/word-letter.component';
import { FullWordComponent } from './components/word/full-word/full-word.component';
import { WordsContainerComponent } from './components/word/words-container/words-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardContainerComponent } from './components/keyboard/keyboard-container/keyboard-container.component';
import { KeyboardKeyComponent } from './components/keyboard/keyboard-key/keyboard-key.component';


@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    NavbarComponent,
    WordLetterComponent,
    FullWordComponent,
    WordsContainerComponent,
    KeyboardContainerComponent,
    KeyboardKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
