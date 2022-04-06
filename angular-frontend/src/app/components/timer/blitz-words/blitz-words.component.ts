import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blitz-words',
  templateUrl: './blitz-words.component.html',
  styleUrls: ['./blitz-words.component.css']
})
export class BlitzWordsComponent implements OnInit {
  @Input() blitzWords: Array<{ [index: string]: string }>;

  constructor() {
    this.blitzWords = [];
  }

  ngOnInit(): void {
  }

}
