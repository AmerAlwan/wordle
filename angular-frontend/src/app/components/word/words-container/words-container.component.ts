import { HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SpellCheckerClientService } from '../../../services/spellchecker/spell-checker-client.service';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.css']
})
export class WordsContainerComponent implements OnInit {
  @Input() keyboard_letter_status: { [index: string]: string } = {};
  @Output() keyboard_letter_status_change = new EventEmitter<{ [index: string]: string }>();
  word: string = "smelt";
  curr_typed_word_index: number = 0;
  numOfAttempts: Array<number> = Array(6).fill(0).map((x, i) => i);
  numOfLetters: Array<number> = Array(this.word.length).fill(0).map((x, i) => i);
  typed_words: { [index: number]: Array<string> } = {};
  wordIndex: number = 0;
  maxWordIndex: number = this.word.length;
  letterStatus: { [index: number]: Array<string> } = {};
  maxScreenWidth: number = screen.width * window.devicePixelRatio - 400;
  spellChecker: SpellCheckerClientService;

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

  async checkWordValidity(text: string) {
    let data = await this.spellChecker.get(text);
    console.log(data);
  }

  @HostListener('document:keydown', ['$event']) handleKeydownEvent(event: KeyboardEvent): void {
      let key = event.key.toLowerCase();

      if (key.length === 1 && key.match(/^[a-z]/) && this.wordIndex < this.maxWordIndex) {
        this.typed_words[this.curr_typed_word_index][this.wordIndex++] = key;
      } else if (key === 'backspace' && this.wordIndex > 0) {
        this.typed_words[this.curr_typed_word_index][--this.wordIndex] = ''
      } else if (key === 'enter' && this.wordIndex === this.maxWordIndex) {

        this.checkWordValidity(this.getTypedWordStr());


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
      }
  }

  constructor(spellCheckerClientService: SpellCheckerClientService) {
    this.spellChecker = spellCheckerClientService;
    for (let i = 0; i < this.numOfAttempts.length; i++) {
      this.typed_words[i] = new Array<string>(this.numOfLetters.length);
      this.letterStatus[i] = []
      for (let j = 0; j < this.numOfLetters.length; j++) {
        this.letterStatus[i][j] = '';
      }
    }
  }

  ngOnInit(): void {
  }
}
