import { HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SpellCheckerClientService } from '../../../services/spellchecker/spell-checker-client.service';
import { AppSettings } from '../../../shared/AppSettings';
import { AppSettingsService } from '../../../services/appsettings/app-settings.service';
import { KeydownService } from '../../../services/keydown/keydown.service';
import { WordService } from '../../../services/word/word.service';
import { GameInfoService } from '../../../services/gameinfo/game-info.service';
import { GameInfo } from '../../../shared/GameInfo';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.css']
})
export class WordsContainerComponent implements OnInit {
  @Input() keyboard_letter_status: { [index: string]: string } = {};
  @Output() keyboard_letter_status_change = new EventEmitter<{ [index: string]: string }>();
  @Output() keyboard_letter_status_reset_emitter = new EventEmitter<boolean>();
  word: string;
  curr_typed_word_index: number;
  numOfAttempts: Array<number>;
  numOfLetters: Array<number>;
  gridSize: number = 62;
  typed_words: { [index: number]: Array<string> };
  wordIndex: number;
  maxWordIndex: number;
  letterStatus: { [index: number]: Array<string> };
  maxScreenWidth: number = screen.width * window.devicePixelRatio - 400;
  displayNoneWordError: boolean = false;
  isTimerDisplay: boolean = false;
  isCountdownStart: boolean = false;
  countdownValue: number;
  blitzWords: Array<{ [index: string]: string }>;

  constructor(private appSettingsService: AppSettingsService, private spellChecker: SpellCheckerClientService, private keydownService: KeydownService, private wordService: WordService, private gameInfoService: GameInfoService) {
    this.word = "";
    this.wordIndex = 0;
    this.curr_typed_word_index = 0;
    this.maxWordIndex = this.word.length;
    this.numOfAttempts = Array(6).fill(0).map((x, i) => i);
    this.numOfLetters = Array(5).fill(0).map((x, i) => i);
    this.typed_words = {};
    this.letterStatus = {};
    this.setNewWord();
    this.countdownValue = this.appSettingsService.getTimeLimitInSeconds();
    this.isTimerDisplay = this.appSettingsService.getGameMode() === 'timed' || this.appSettingsService.getGameMode() === 'blitz';
    this.blitzWords = [];
  }

  ngOnInit(): void {
    this.getNewWord();
    this.appSettingsService.getSettings().subscribe((settings) => {

      let prevGameMode = this.appSettingsService.getPrevSettings().gameMode;
      console.log("Prev Game Mode: " + prevGameMode);
      console.log("Curr Game Mode: " + settings.gameMode);
      if (settings.gameMode !== prevGameMode) {
        this.isTimerDisplay = this.appSettingsService.getGameMode() === 'timed' || this.appSettingsService.getGameMode() === 'blitz';
        this.getNewWord();
      }
      else if (settings.numOfAttempts < this.numOfAttempts.length || this.numOfLetters.length !== settings.numOfLetters) {
        this.numOfAttempts = Array(settings.numOfAttempts).fill(0).map((x, i) => i);
        this.numOfLetters = Array(settings.numOfLetters).fill(0).map((x, i) => i);
        this.getNewWord();
      }
      else if (settings.numOfAttempts > this.numOfAttempts.length && settings.numOfLetters === this.numOfLetters.length) {
        console.log("No Change");
        for (let i = this.numOfAttempts.length; i < settings.numOfAttempts; i++) {
          this.typed_words[i] = new Array<string>(this.numOfLetters.length);
          this.letterStatus[i] = [];
          for (let j = 0; j < this.numOfLetters.length; j++) {
            this.letterStatus[i][j] = '';
          }
        }
        this.numOfAttempts = Array(settings.numOfAttempts).fill(0).map((x, i) => i);
      }

      this.countdownValue = this.appSettingsService.getTimeLimitInSeconds();


      /*let screenHeight = window.innerHeight;
      let rowSize = 62;
      let takenSpace = 310;
      let screenHeightCalculation = Math.min(
        screenHeight + 6 * rowSize,
        screenHeight + this.getNumRowsOverflowingHeight(
            screenHeight - takenSpace,
        this.numOfAttempts.length,
        rowSize  
          )
         * rowSize);*/

     // console.log("Screen height: " + screenHeight);
     // console.log("Overflowing Tiles: " + this.getNumRowsOverflowingHeight(screenHeight - 279, this.numOfAttempts.length));

      //if (this.appSettingsService.getScreenHeight() !== screenHeightCalculation) {
        //this.appSettingsService.setScreenHeight(screenHeightCalculation);
      //}

      console.log("Attempts: " + this.numOfAttempts.length);
      console.log("Letters: " + this.numOfLetters.length);
    });

    this.wordService.watchCurrWord().subscribe(word => {
      if (this.wordService.getCurrWord() !== this.word) {
        this.setNewWord();
      }
    });

    for (let i = 0; i < this.numOfAttempts.length; i++) {
      this.typed_words[i] = new Array<string>(this.numOfLetters.length);
      this.letterStatus[i] = [];
      for (let j = 0; j < this.numOfLetters.length; j++) {
        this.letterStatus[i][j] = '';
      }
    }

  }

  resetValues() {
    this.word = "";
    this.wordIndex = 0;
    this.curr_typed_word_index = 0;
    this.maxWordIndex = this.word.length;
    this.keyboard_letter_status_reset_emitter.emit(true);
   // this.numOfAttempts = Array(0).fill(0).map((x, i) => i);
   // this.numOfLetters = Array(0).fill(0).map((x, i) => i);
    for (let i = 0; i < this.numOfAttempts.length; i++) {
      this.typed_words[i] = new Array<string>(this.numOfLetters.length);
      this.letterStatus[i] = [];
      for (let j = 0; j < this.numOfLetters.length; j++) {
        this.letterStatus[i][j] = '';
      }
    }
  }

  isCountdownTimeout() {
    if (this.appSettingsService.getGameMode() === 'blitz') {
      if (this.blitzWords.length === 0) this.declareGameLost();
      else this.declareGameWon();
    } else this.declareGameLost();
  }

  setGridSize() {
    let size = (this.numOfLetters.length * 62) + ((this.numOfLetters.length - 1) * 5) + 10;
    if (size > window.innerWidth) {
      this.gridSize = (this.numOfLetters.length * (window.innerWidth / (this.numOfLetters.length + 2))) + ((this.numOfLetters.length - 1) * 5) + 10;
    } else {
      this.gridSize = size;
    }
    console.log("GRID SIZE: " + this.gridSize);
  }

  declareGameStatus() {
    if (this.appSettingsService.getGameMode() === 'blitz') {
      if (this.isGameWon()) {
        this.blitzWords.push({ word: this.word, status: 'win' });
        setTimeout(() => this.getNewWord(), 1500);
      } else if (this.isGameLost()) {
        this.blitzWords.push({ word: this.word, status: 'lose' });
        setTimeout(() => this.getNewWord(), 1500);
      }
    }
    else if (this.isGameWon()) this.declareGameWon();
    else if (this.isGameLost()) this.declareGameLost();
    
  }

  declareGameWon() {
    console.log('WIN');
    this.isCountdownStart = false;
    setTimeout(() => this.gameInfoService.setGameStatus('win'), 1500);
  }

  declareGameLost() {
    console.log('LOST');
    this.isCountdownStart = false;
    setTimeout(() => this.gameInfoService.setGameStatus('lose'), 1500);
  }

  getNumRowsOverflowingHeight(freeSpace: number, maxRows: number, rowSize: number): number {
    let currHeight = 0;
    let numRows = 0;
    let currRows = 0;
    while (true) {
      if (numRows > maxRows) break;
      if (currRows > maxRows) break;
      if (currHeight < freeSpace) {
        currHeight += rowSize;
      } else {
        numRows++;
      }
      currRows++;

    }
    return numRows;
  }

  countOccurenceArray(char: string, text: Array<string>) {
    let count: number = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i].toLowerCase() === char.toLowerCase()) {
        count++;
      }
    }
    return count;
  }

  countOccurenceString(char: string, text: string) {
    return this.countOccurenceArray(char, text.split(""));
  }

  getTypedWordStr() {
    let text: string = ''
    for (let i = 0; i < this.typed_words[this.curr_typed_word_index].length; i++) {
      text += this.typed_words[this.curr_typed_word_index][i]
    }
    return text;
  }

  hideNoneWordError() {
    this.displayNoneWordError = false;
  }

  isGameWon(): boolean {
    let isGameWon: boolean = true;
    for (let i = 0; i < this.numOfLetters.length; i++) {
      if (this.letterStatus[this.curr_typed_word_index === 0 ? 0 : this.curr_typed_word_index - 1][i] !== 'correct') {  
        isGameWon = false;
      }
    }
    return isGameWon;
  }

  isGameLost(lossOverride: boolean = false): boolean {
    return !this.isGameWon() && (this.curr_typed_word_index === this.numOfAttempts.length || lossOverride);
  }

  async setTypedWordStatus(text: string): Promise<boolean> {
    return await this.spellChecker.get(text).then(data => {
      if (!data) {
        this.displayNoneWordError = true;
        return false;
      }
      let occurences: { [index: string]: number } = {}
      for (let i = 0; i < this.typed_words[this.curr_typed_word_index].length; i++) {
        occurences[this.typed_words[this.curr_typed_word_index][i]] = this.countOccurenceString(this.typed_words[this.curr_typed_word_index][i], this.word);
      }
      for (let i = 0; i < this.typed_words[this.curr_typed_word_index].length; i++) {
        if (this.typed_words[this.curr_typed_word_index][i] === this.word[i]) {
          this.letterStatus[this.curr_typed_word_index][i] = 'correct';
          this.keyboard_letter_status[this.typed_words[this.curr_typed_word_index][i]] = 'correct';
          occurences[this.typed_words[this.curr_typed_word_index][i]]--;
        }
      }
      for (let i = 0; i < this.typed_words[this.curr_typed_word_index].length; i++) {
        if (!this.word.includes(this.typed_words[this.curr_typed_word_index][i])) {
          this.letterStatus[this.curr_typed_word_index][i] = 'wrong';
          this.keyboard_letter_status[this.typed_words[this.curr_typed_word_index][i]] = 'wrong';
        } else if (this.letterStatus[this.curr_typed_word_index][i] !== 'correct') {
          if (this.keyboard_letter_status[this.typed_words[this.curr_typed_word_index][i]] !== 'correct') {
            this.keyboard_letter_status[this.typed_words[this.curr_typed_word_index][i]] = 'almostcorrect';
          }
          if (occurences[this.typed_words[this.curr_typed_word_index][i]] >= 1) {
            this.letterStatus[this.curr_typed_word_index][i] = 'almostcorrect';
            //  this.keyboard_letter_status[this.typed_words[this.curr_typed_word_index][i]] = 'almostcorrect';
            occurences[this.typed_words[this.curr_typed_word_index][i]]--;
          } else {
            this.letterStatus[this.curr_typed_word_index][i] = 'wrong';
          }
        }
      }
      this.wordIndex = 0;
      this.curr_typed_word_index++;
      this.keyboard_letter_status_change.emit(this.keyboard_letter_status);

      this.declareGameStatus();

      return true;
    });
    
  }

  setNewWord() {
    this.resetValues();
    this.word = this.wordService.getCurrWord();
    this.maxWordIndex = this.word.length;
    this.setGridSize();
  }

  getNewWord() {
    this.wordService.requestWord(() => this.gameInfoService.setGameStatus('ongoing'));
    this.setNewWord();
  }

  @HostListener('document:keydown', ['$event']) handleKeydownEvent(event: KeyboardEvent): void {
      let key = event.key.toLowerCase();
    if (this.keydownService.isEnabled()) {
      if (key.length === 1 && key.match(/^[a-z]/) && this.wordIndex < this.maxWordIndex) {
        this.typed_words[this.curr_typed_word_index][this.wordIndex++] = key;
        this.isCountdownStart = true;
      } else if (key === 'backspace' && this.wordIndex > 0) {
        this.typed_words[this.curr_typed_word_index][--this.wordIndex] = ''
      } else if (key === 'enter' && this.wordIndex === this.maxWordIndex) {
        this.setTypedWordStatus(this.getTypedWordStr());
      }
    }
  }

}
