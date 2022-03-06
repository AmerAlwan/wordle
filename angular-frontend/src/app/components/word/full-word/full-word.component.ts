import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-word',
  templateUrl: './full-word.component.html',
  styleUrls: ['./full-word.component.css']
})
export class FullWordComponent implements OnInit {
  @Input() inputWord : string = 'crane';
  @Input() index: number = -1;
  @Input() currIndex: number = -1;
  word: Array<string> = []

  constructor() {
    this.word = this.inputWord.split("");
    console.log(this.word);
  }

  ngOnInit(): void {
  }

}
