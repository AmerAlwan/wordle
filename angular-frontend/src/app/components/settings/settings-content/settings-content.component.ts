import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.css']
})

export class SettingsContentComponent implements OnInit {
  wordLength: number = 5;
  numOfAttempts: number = 6;
  forcedReuseMode: boolean = false;
  noSecondChanceMode: boolean = false;
  isToggleInit: boolean = false;
  difficulty: string = 'hard';

  constructor() {
    this.difficulty === 'easy' ? this.onEasyDifficultyToggle() :
      this.difficulty === 'medium' ? this.onMediumDifficultyToggle() :
        this.difficulty === 'hard' ? this.onHardDifficultyToggle() :
          this.onCustomDifficultyToggle();
  }

  ngOnInit(): void {
  }

  onWordLengthChange(value: number) {
    this.wordLength = value;
  }

  onNumOfAttemptsChange(value: number) {
    this.numOfAttempts = value;
    if (this.isToggleInit) {
      this.onCustomDifficultyToggle();
    }
  }

  onForcedReuseModeChange(value: boolean) {
    this.forcedReuseMode = value;
    if (this.isToggleInit) {
      this.onCustomDifficultyToggle();
    }
  }

  onSecondChanceModeChange(value: boolean) {
    this.noSecondChanceMode = value;
    if (this.isToggleInit) {
      this.onCustomDifficultyToggle();
    }
  }

  onEasyDifficultyToggle() {
    this.numOfAttempts = 6;
    this.noSecondChanceMode = false;
    this.forcedReuseMode = false;
    this.difficulty = 'easy';
    this.isToggleInit = false;
  }

  onMediumDifficultyToggle() {
    this.numOfAttempts = 5;
    this.noSecondChanceMode = true;
    this.forcedReuseMode = false;
    this.difficulty = 'medium';
    this.isToggleInit = false;
  }

  onHardDifficultyToggle() {
    this.numOfAttempts = 4;
    this.noSecondChanceMode = true;
    this.forcedReuseMode = true;
    this.difficulty = 'hard';
    this.isToggleInit = false;
  }

  onCustomDifficultyToggle() {
    this.difficulty = 'custom';
  }

  onToggleInit() {
    this.isToggleInit = true;
  }

}
