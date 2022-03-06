import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-letter',
  templateUrl: './word-letter.component.html',
  styleUrls: ['./word-letter.component.css']
})
export class WordLetterComponent implements OnInit {
  @Input() letter : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
