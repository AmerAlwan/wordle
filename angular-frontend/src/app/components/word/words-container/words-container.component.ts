import { newArray } from '@angular/compiler/src/util';
import { HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.css']
})
export class WordsContainerComponent implements OnInit {
  @Input() keyboard_letter_status: { [index: string]: string } = {};
  @Output() keyboard_letter_status_change = new EventEmitter<{ [index: string]: string }>();
  word: string = "crane";
  currIndex: number = 0;
  numOfAttempts: Array<number> = Array(6).fill(0).map((x, i) => i);
  numOfLetters: Array<number> = Array(this.word.length).fill(0).map((x, i) => i);
  wordObj: { [index: number]: Array<string> } = {};
  wordIndex: number = 0;
  maxWordIndex: number = this.word.length;
  letterStatus: { [index: number]: Array<string> } = {};
  maxScreenWidth: number = screen.width * window.devicePixelRatio - 400;

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

  getWordObjStr() {
    let text: string = ''
    for (let i = 0; i < this.wordObj[this.currIndex].length; i++) {
      text += this.wordObj[this.currIndex][i]
    }
    return text;
  }

  @HostListener('document:keydown', ['$event']) handleKeydownEvent(event: KeyboardEvent): void {
      let key = event.key.toLowerCase();

      if (key.length === 1 && key.match(/^[a-z]/) && this.wordIndex < this.maxWordIndex) {
        this.wordObj[this.currIndex][this.wordIndex++] = key;
      } else if (key === 'backspace' && this.wordIndex > 0) {
        this.wordObj[this.currIndex][--this.wordIndex] = ''
      } else if (key === 'enter' && this.wordIndex === this.maxWordIndex) {
        let occurences: { [index: string]: number } = {}
        for (let i = 0; i < this.wordObj[this.currIndex].length; i++) {
          occurences[this.wordObj[this.currIndex][i]] = this.countOccurenceString(this.wordObj[this.currIndex][i], this.word);
        }
        for (let i = 0; i < this.wordObj[this.currIndex].length; i++) {
          if (this.wordObj[this.currIndex][i] === this.word[i]) {
            this.letterStatus[this.currIndex][i] = 'correct';
            this.keyboard_letter_status[this.wordObj[this.currIndex][i]] = 'correct';
            occurences[this.wordObj[this.currIndex][i]]--;
          }
        }
        for (let i = 0; i < this.wordObj[this.currIndex].length; i++) {
          if (!this.word.includes(this.wordObj[this.currIndex][i])) {
            this.letterStatus[this.currIndex][i] = 'wrong';
            this.keyboard_letter_status[this.wordObj[this.currIndex][i]] = 'wrong';
          } else if (this.letterStatus[this.currIndex][i] !== 'correct') {
            if (this.keyboard_letter_status[this.wordObj[this.currIndex][i]] !== 'correct') {
              this.keyboard_letter_status[this.wordObj[this.currIndex][i]] = 'almostcorrect';
            }
            if (occurences[this.wordObj[this.currIndex][i]] >= 1) {
              this.letterStatus[this.currIndex][i] = 'almostcorrect';
              this.keyboard_letter_status[this.wordObj[this.currIndex][i]] = 'almostcorrect';
              occurences[this.wordObj[this.currIndex][i]]--;
            } else {
              this.letterStatus[this.currIndex][i] = 'wrong';
            }
          }
        }
        this.wordIndex = 0;
        this.currIndex++;
        this.keyboard_letter_status_change.emit(this.keyboard_letter_status);
      }
  }

  constructor() {
    for (let i = 0; i < this.numOfAttempts.length; i++) {
      this.wordObj[i] = new Array<string>(this.numOfLetters.length);
      this.letterStatus[i] = []
      for (let j = 0; j < this.numOfLetters.length; j++) {
        this.letterStatus[i][j] = '';
      }
    }
  }

  ngOnInit(): void {
  }
}
