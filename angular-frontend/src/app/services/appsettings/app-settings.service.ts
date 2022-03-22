import { Injectable } from '@angular/core';
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings } from '../../shared/AppSettings';


@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private settingsBS: BehaviorSubject<AppSettings>;
  private settings: AppSettings;

  constructor() {
    this.settings = new AppSettings();
    this.settingsBS = new BehaviorSubject<AppSettings>(this.settings);
  }

  getSettings(): Observable<AppSettings> {
    return this.settingsBS.asObservable()
  }

  getNumOfAttempts(): number {
    return this.settings.numOfAttempts;
  }

  getNumOfLetters(): number {
    return this.settings.numOfLetters;
  }

  getBackgroundMode(): string {
    return this.settings.backgroundMode;
  }

  getBackgroundValue(): string {
    return this.settings.backgroundValue;
  }

  setNumOfAttempts(value: number) {
    this.settings.numOfAttempts = value;
  }

  setNumOfLetters(value: number) {
    this.settings.numOfLetters = value;
  }

  setBackgroundValues(backgroundMode: string, backgroundValue: string) {
    this.settings.backgroundMode = backgroundMode;
    this.settings.backgroundValue = backgroundValue;
  }

  setSettingsFromLocalStorage() {
    let settingsJSON = localStorage.getItem('settings');
    if (settingsJSON) {
      let lcSettings = JSON.parse(settingsJSON);
      this.settings.difficulty = lcSettings.difficulty;
      this.settings.gameMode = lcSettings.gameMode;
      this.settings.numOfAttempts = lcSettings.numOfAttempts;
      this.settings.numOfLetters = lcSettings.numOfLetters;
      this.settings.backgroundMode = lcSettings.backgroundMode;
      this.settings.backgroundValue = lcSettings.backgroundValue;
    }
    this.applyChanges();
  }

  applyChanges() {
    this.settingsBS.next(this.settings);
  }

}
