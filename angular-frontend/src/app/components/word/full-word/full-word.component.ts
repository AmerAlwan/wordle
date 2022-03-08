import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-word',
  templateUrl: './full-word.component.html',
  styleUrls: ['./full-word.component.css']
})
export class FullWordComponent implements OnInit {
  @Input() inputWord : string = '';
  @Input() index: number = -1;
  @Input() currIndex: number = -1;
  @Output() currIndexChange = new EventEmitter<number>();
  word: Array<string> = [];
  wordIndex: number = 0;
  maxWordIndex: number = 0;
  letterStatus: Array<string> = [];


  @HostListener('document:keydown', ['$event']) handleKeydownEvent(event: KeyboardEvent): void {
    if (this.currIndex === this.index) {
      if (event.key.length === 1 && event.key.match(/^[a-zA-Z]/) && this.wordIndex < this.maxWordIndex) {
        this.word[this.wordIndex++] = event.key;
      } else if (event.key.toLowerCase() === 'backspace' && this.wordIndex > 0) {
        this.word[--this.wordIndex] = ''
      } else if (event.key.toLowerCase() === 'enter' && this.wordIndex === this.maxWordIndex) {
        for (let i = 0; i < this.word.length; i++) {
          if (this.word[i] === this.inputWord.charAt(i)) {
            this.letterStatus[i] = 'correct';
          } else if (this.inputWord.includes(this.word[i])) {
            this.letterStatus[i] = 'almostcorrect';
          } else {
            this.letterStatus[i] = 'wrong';
          }
        }
        this.currIndexChange.emit(++this.currIndex);
      }
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.word = new Array(this.inputWord.length);
    this.maxWordIndex = this.inputWord.length;
  }

}
