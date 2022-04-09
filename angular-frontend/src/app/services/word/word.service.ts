import { Injectable, ErrorHandler } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from "axios";
import { AppSettingsService } from '../appsettings/app-settings.service';
import { Word } from '../../shared/Word';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private currWord: Word;
  private currDefinition: Word;
  private lastWord: Word;
  private lastDefinition: Word;
  private currAttempt: number;

  private axiosInstance: AxiosInstance;

  private currWordBS: BehaviorSubject<Word>;

  constructor(private errorHandler: ErrorHandler, private appSettingsService: AppSettingsService) {
    this.currWord = this.getDefaultWord();

    this.currDefinition = this.getDefaultWord();

    this.lastWord = this.getDefaultWord();

    this.lastDefinition = this.getDefaultWord();

    this.currAttempt = 0;

    this.currWordBS = new BehaviorSubject<Word>(this.currWord);
   
    this.axiosInstance = axios.create({
      timeout: 3000
    });
  }

  watchCurrWord(): Observable<Word> {
    return this.currWordBS.asObservable();
  }

  public requestWord(customFunction: Function = (() => true)) {
    this.setLastWord(this.getCurrWord() !== this.getLastWord() ? this.getCurrWord() : '');
    this.setLastDefinition(this.getCurrDefinition() !== this.getLastDefinition() ? this.getCurrDefinition() : '');
    let data = {word: '', definition: ''}
    if (this.appSettingsService.getGameMode() === 'daily') {
      this.requestDailyWord().then(response => {
        if (response) {
          this.setCurrWord(response.data.word);
          this.setCurrDefinition(response.data.definition);
          this.applyChanges();
          customFunction();
        }
      });
    } else if (this.appSettingsService.getGameMode() === 'unlimited' ||
      this.appSettingsService.getGameMode() === 'timed' ||
      this.appSettingsService.getGameMode() === 'blitz') {
      this.requestUnlimitedWord().then(response => {
        if (response) {
          this.setCurrWord(response.data.word);
          this.setCurrDefinition(response.data.definition);
          this.applyChanges();
          customFunction();
        }
      });
    }
    console.log(data);
    return true;
  }

  public async requestDailyWord() {
    try {
      var response = await this.axiosInstance.request({
        method: "get",
        url: "http://127.0.0.1:8000/api/word/daily/get"
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async requestUnlimitedWord() {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://127.0.0.1:8000/api/word/unlimited/get",
        data: { num_of_letters: this.appSettingsService.getNumOfLetters(), num_of_words: 3000 }
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  setCurrAttempt(value: number) {
    this.currAttempt = value;
  }

  setCurrWord(value: string) {
    let gameMode = this.appSettingsService.getGameMode();
    if (gameMode === 'daily') this.currWord.daily = value;
    if (gameMode === 'unlimited') this.currWord.unlimited = value;
    if (gameMode === 'timed') this.currWord.timed = value;
    if (gameMode === 'blitz') this.currWord.blitz = value;
    this.appSettingsService.setNumOfLetters(value.length);
    this.appSettingsService.setDifficulty(this.appSettingsService.getDifficulty());
    this.appSettingsService.applyChanges();
  }

  setCurrDefinition(value: string) {
    let gameMode = this.appSettingsService.getGameMode();
    if (gameMode === 'daily') this.currDefinition.daily = value;
    if (gameMode === 'unlimited') this.currDefinition.unlimited = value;
    if (gameMode === 'timed') this.currDefinition.timed = value;
    if (gameMode === 'blitz') this.currDefinition.blitz = value;
  }

  setLastWord(value: string) {
    let gameMode = this.appSettingsService.getGameMode();
    if (gameMode === 'daily') this.lastWord.daily = value;
    if (gameMode === 'unlimited') this.lastWord.unlimited = value;
    if (gameMode === 'timed') this.lastWord.timed = value;
    if (gameMode === 'blitz') this.lastWord.blitz = value;
  }

  setLastDefinition(value: string) {
    let gameMode = this.appSettingsService.getGameMode();
    if (gameMode === 'daily') this.lastDefinition.daily = value;
    if (gameMode === 'unlimited') this.lastDefinition.unlimited = value;
    if (gameMode === 'timed') this.lastDefinition.timed = value;
    if (gameMode === 'blitz') this.lastDefinition.blitz = value;
  }

  getCurrWord(): string {
    let gameMode = this.appSettingsService.getGameMode();
    return gameMode === 'daily' ? this.currWord.daily :
      gameMode === 'unlimited' ? this.currWord.unlimited :
        gameMode === 'timed' ? this.currWord.timed :
          gameMode === 'blitz' ? this.currWord.blitz :
            '';
  }

  getLastWord(): string {
    let gameMode = this.appSettingsService.getGameMode();
    return gameMode === 'daily' ? this.lastWord.daily :
      gameMode === 'unlimited' ? this.lastWord.unlimited :
        gameMode === 'timed' ? this.lastWord.timed :
          gameMode === 'blitz' ? this.lastWord.blitz :
            '';
  }

  getCurrDefinition(): string {
    let gameMode = this.appSettingsService.getGameMode();
    return gameMode === 'daily' ? this.currDefinition.daily :
      gameMode === 'unlimited' ? this.currDefinition.unlimited :
        gameMode === 'timed' ? this.currDefinition.timed :
          gameMode === 'blitz' ? this.currDefinition.blitz :
            '';
  }

  getLastDefinition(): string {
    let gameMode = this.appSettingsService.getGameMode();
    return gameMode === 'daily' ? this.lastDefinition.daily :
      gameMode === 'unlimited' ? this.lastDefinition.unlimited :
        gameMode === 'timed' ? this.lastDefinition.timed :
          gameMode === 'blitz' ? this.lastDefinition.blitz :
            '';
  }

  getCurrAttempt(): number {
    return this.currAttempt;
  }

  getDefaultWord(): Word {
    return {
      daily: '',
      unlimited: '',
      timed: '',
      blitz: ''
    };
  }

  applyChanges() {
    this.currWordBS.next(this.currWord);
  }

}
