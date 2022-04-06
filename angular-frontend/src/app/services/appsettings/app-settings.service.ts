import { Injectable } from '@angular/core';
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings } from '../../shared/AppSettings';


@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private prevSettings: AppSettings;
  private settings: AppSettings;
  private settingsBS: BehaviorSubject<AppSettings>;

  constructor() {
    this.settings = new AppSettings();
    this.prevSettings = new AppSettings();
    this.settingsBS = new BehaviorSubject<AppSettings>(this.settings);
  }

  getSettings(): Observable<AppSettings> {
    return this.settingsBS.asObservable();
  }

  getPrevSettings(): AppSettings {
    let prevSettingsCopy = Object.assign(Object.create(Object.getPrototypeOf(this.prevSettings)), this.prevSettings);
    this.savePrevSettings();
    return prevSettingsCopy;
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

  getGameMode(): string {
    return this.settings.gameMode;
  }

  getScreenHeight(): number {
    return this.settings.screenHeight;
  }

  getDifficulty(): string {
    return this.settings.difficulty;
  }

  getTimedModeTimeLimitInMinutes(): number {
    return this.settings.timedModeTimeLimitInMinutes;
  }

  getBlitzModeTimeLimitInMinutes(): number {
    return this.settings.blitzModeTimeLimitInMinutes;
  }

  getTimeLimitInMinutes(): number {
    return this.settings.gameMode === 'timed' ? this.settings.timedModeTimeLimitInMinutes : this.settings.gameMode === 'blitz' ? this.settings.blitzModeTimeLimitInMinutes : 1;
  }

  getTimeLimitInSeconds(): number {
    return this.getTimeLimitInMinutes() * 60;
  }

  setGameMode(value: string) {
    this.savePrevSettings();
    this.settings.gameMode = value;
  }

  setNumOfAttempts(value: number) {
    this.settings.numOfAttempts = value;
  }

  setNumOfLetters(value: number) {
    this.settings.numOfLetters = value;
  }

  setTimedModeTimeLimitInMinutes(value: number) {
    this.settings.timedModeTimeLimitInMinutes = value;
  }

  setBlitzModeTimeLimitInMinutes(value: number) {
    this.settings.blitzModeTimeLimitInMinutes = value;
  }

  setDifficulty(value: string) {
    this.settings.difficulty = value;
    if (value !== 'custom') {
      if (value === 'easy') {
        this.settings.numOfAttempts = this.settings.numOfLetters + 1;
        this.settings.forcedReuse = false;
        this.settings.noSecondChance = false;
      } else if (value === 'medium') {
        this.settings.numOfAttempts = this.settings.numOfLetters;
        this.settings.forcedReuse = true;
        this.settings.noSecondChance = false;
      } else if (value === 'hard') {
        this.settings.numOfAttempts = this.settings.numOfLetters - 1;
        this.settings.forcedReuse = true;
        this.settings.noSecondChance = true;
      }
    }
  }

  setScreenHeight(value: number = 0) {
    if (value === 0) this.settings.screenHeight = this.calcScreenHeight();
    else this.settings.screenHeight = value;
    this.applyChanges();
  }

  setBackgroundValues(backgroundMode: string, colorValue:string, backgroundValue: string) {
    this.settings.backgroundMode = backgroundMode;
    this.settings.colorValue = colorValue;
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
      this.settings.colorValue = lcSettings.colorValue;
      this.settings.backgroundValue = lcSettings.backgroundValue;
      this.settings.timedModeTimeLimitInMinutes = lcSettings.timedModeTimeLimitInMinutes;
      this.settings.blitzModeTimeLimitInMinutes = lcSettings.blitzModeTimeLimitInMinutes;
      this.settings.screenHeight = this.calcScreenHeight();
    }
    this.applyChanges();
  }

  savePrevSettings() {
    this.prevSettings = Object.assign(Object.create(Object.getPrototypeOf(this.settings)), this.settings)
  }

  applyChanges() {
    this.settingsBS.next(this.settings);
  }

  calcScreenHeight() : number {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  }

}
