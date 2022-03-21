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

  applyChanges() {
    this.settingsBS.next(this.settings);
  }

}
