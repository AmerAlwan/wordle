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
import { BoardContainerComponent } from './components/word/board-container/board-container.component';
import { ProfileDropdownComponent } from './components/nav/dropdown/profile-dropdown/profile-dropdown.component';
import { ProfileDropdownFormComponent } from './components/nav/dropdown/profile-dropdown-form/profile-dropdown-form.component';
import { ProfileDropdownInfoComponent } from './components/nav/dropdown/profile-dropdown-info/profile-dropdown-info.component';
import { NoneWordErrorComponent } from './components/errors/board/none-word-error/none-word-error.component';
import { SettingsContainerComponent } from './components/settings/settings-container/settings-container.component';
import { SettingsContentComponent } from './components/settings/settings-content/settings-content.component';
import { SettingsCounterComponent } from './components/settings/settings-counter/settings-counter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    BoardContainerComponent,
    ProfileDropdownComponent,
    ProfileDropdownFormComponent,
    ProfileDropdownInfoComponent,
    NoneWordErrorComponent,
    SettingsContainerComponent,
    SettingsContentComponent,
    SettingsCounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
