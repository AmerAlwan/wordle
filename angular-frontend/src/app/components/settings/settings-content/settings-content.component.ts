import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AppSettingsService } from '../../../services/appsettings/app-settings.service';
import { AppSettings } from '../../../shared/AppSettings';

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.css']
})

export class SettingsContentComponent implements OnInit, OnChanges {
  @Input() isSaved: boolean = false;
  wordLength: number = 5;
  numOfAttempts: number = 6;
  timeLimit: number = 2;
  forcedReuseMode: boolean = false;
  noSecondChanceMode: boolean = false;
  isToggleInit: boolean = false;
  difficulty: string = 'easy';
  gameMode: string = 'daily';
  gameModeDescription: string = '';
  backgroundMode: string = 'color';
  settingsBackgroundMode: string = 'color';
  backgroundModeDescription: string = '';
  colorOptions: Array<string>;
  chosenColorValue: string;
  chosenBackgroundValue: string;
  appSettingsService: AppSettingsService;

  constructor(appSettingsService: AppSettingsService) {
    this.appSettingsService = appSettingsService;

    this.colorOptions = ['#121213', '#8e323f', '#695ee6', '#51ce64', '#cec051', '#ff984e'];

    let settingsJSON = localStorage.getItem('settings');
    if (settingsJSON) {
      let settings = JSON.parse(settingsJSON);
      this.difficulty = settings.difficulty;
      this.gameMode = settings.gameMode;
      this.numOfAttempts = settings.numOfAttempts;
      this.wordLength = settings.numOfLetters;
      this.backgroundMode = settings.backgroundMode;
      this.chosenBackgroundValue = settings.backgroundValue;
      this.chosenColorValue = settings.colorValue;
    } else {
      this.difficulty = 'easy';
      this.gameMode = 'daily';
      this.numOfAttempts = 6;
      this.wordLength = 5;
      this.backgroundMode = 'color';
      this.chosenBackgroundValue = '';
      this.chosenColorValue = this.colorOptions[0];
    }
   

    this.difficulty === 'easy' ? this.onEasyDifficultyToggle() :
      this.difficulty === 'medium' ? this.onMediumDifficultyToggle() :
        this.difficulty === 'hard' ? this.onHardDifficultyToggle() :
          this.onCustomDifficultyToggle();

    this.gameMode === 'daily' ? this.onDailyGameModeToggle() :
      this.gameMode === 'unlimited' ? this.onUnlimitedGameModeToggle() :
        this.gameMode === 'timed' ? this.onTimedGameModeToggle() :
          this.gameMode === 'blitz' ? this.onBlitzGameModeToggle() :
            '';

    this.backgroundMode === 'color' ? this.onColorBackgroundModeToggle() :
      this.backgroundMode === 'url' ? this.onImageBackgroundModeToggle() :
        '';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.isSaved.currentValue) {
      this.saveChanges();
    }
  }

  saveChanges() {
    this.appSettingsService.setNumOfLetters(this.wordLength);
    this.appSettingsService.setNumOfAttempts(this.numOfAttempts);
    this.appSettingsService.setBackgroundValues(this.backgroundMode, this.chosenColorValue, this.chosenBackgroundValue);
    this.appSettingsService.applyChanges();
    this.isSaved = false;
    let settingsJSON: object = { numOfLetters: this.wordLength, numOfAttempts: this.numOfAttempts, difficulty: this.difficulty, gameMode: this.gameMode, backgroundMode: this.backgroundMode, colorValue: this.chosenColorValue, backgroundValue: this.chosenBackgroundValue };
    localStorage.setItem('settings', JSON.stringify(settingsJSON));

  }

  onTimeLimitChange(value: number) {
    this.timeLimit = value;
  }

  onWordLengthChange(value: number) {
    this.wordLength = value;
    this.numOfAttempts = this.difficulty === 'easy' ? value + 1 :
      this.difficulty === 'medium' ? value :
        this.difficulty === 'hard' ? value - 1 :
          this.numOfAttempts;
  }

  onNumOfAttemptsChange(value: number) {
    this.numOfAttempts = value;
    this.onCustomDifficultyToggle();
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
    this.numOfAttempts = this.wordLength + 1;
    this.difficulty = 'easy';
    if (this.forcedReuseMode || this.noSecondChanceMode) {
      this.noSecondChanceMode = false;
      this.forcedReuseMode = false;
      this.isToggleInit = false;
    }
  }

  onMediumDifficultyToggle() {
    this.numOfAttempts = this.wordLength;
    this.difficulty = 'medium';
    if (!(!this.forcedReuseMode && this.noSecondChanceMode)) {
      this.noSecondChanceMode = true;
      this.forcedReuseMode = false;
      this.isToggleInit = false;
    }
  }

  onHardDifficultyToggle() {
    this.numOfAttempts = this.wordLength - 1;
    this.difficulty = 'hard';
    if (!this.forcedReuseMode || !this.noSecondChanceMode) {
      this.noSecondChanceMode = true;
      this.forcedReuseMode = true;
      this.isToggleInit = false;
    }
  }

  onCustomDifficultyToggle() {
    this.difficulty = 'custom';
  }

  onDailyGameModeToggle() {
    this.gameMode = 'daily';
    this.gameModeDescription = 'Classic Wordle. Play the word of the day (Changes every day and is the same for everyone)';
  }

  onUnlimitedGameModeToggle() {
    this.gameMode = 'unlimited';
    this.gameModeDescription = 'Play an unlimited amount of random words';
  }

  onTimedGameModeToggle() {
    this.gameMode = 'timed';
    this.gameModeDescription = 'Play an unlimited amount of random words, but each word must be guessed within the time limit';
  }

  onBlitzGameModeToggle() {
    this.gameMode = 'blitz';
    this.gameModeDescription = 'Play as many random words as you can within the time limit. Can be replayed an unlimtied amount of times';
  }

  onColorChosen(chosenColorValue: string) {
    this.chosenColorValue = chosenColorValue;
  }

  onColorBackgroundModeToggle() {
    this.backgroundMode = 'color';
    this.backgroundModeDescription = 'Select color';
  }

  onImageBackgroundModeToggle() {
    this.backgroundMode = 'image';
    this.backgroundModeDescription = 'Enter image URL';
  }

  onToggleInit() {
    this.isToggleInit = true;
  }

}
