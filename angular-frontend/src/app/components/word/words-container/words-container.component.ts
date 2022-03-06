import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.css']
})
export class WordsContainerComponent implements OnInit {
  word: string = "crane";
  currIndex: number = 0;
  numOfAttempts: Array<number> = Array(6).fill(0).map((x, i) => i);
  numOfLetters: Array<number> = Array(5).fill(0).map((x, i) => i);

  constructor() { }

  ngOnInit(): void {
  }
}
