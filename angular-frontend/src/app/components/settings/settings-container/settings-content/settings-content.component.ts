import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.css']
})
export class SettingsContentComponent implements OnInit {
  wordLength: number = 5;
  numOfAttempts: number = 6;

  constructor() { }

  ngOnInit(): void {
  }

  onWordLengthChange(value: number) {
    this.wordLength = value;
  }

  onNumOfAttemptsChange(value: number) {
    this.numOfAttempts = value;
    console.log(this.numOfAttempts);
  }

}
