import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnChanges } from '@angular/core';
import { timer } from 'rxjs';
import { AppSettingsService } from '../../../services/appsettings/app-settings.service';
import { GameInfoService } from '../../../services/gameinfo/game-info.service';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnChanges {
  @Input() initialTimeValue: number = 0;
  @Input() isTimerStart: boolean = false;
  @Output() timeoutEventEmitter = new EventEmitter<boolean>();
  private timeLeft: number;
  minute: string = '';
  second: string = '';
  width: number;
  isScrollYOffset: boolean = false;
  timerSubscription: any;

  constructor(private appSettingsService: AppSettingsService, private gameInfoService: GameInfoService) {
    this.timeLeft = this.initialTimeValue;
    this.width = (this.appSettingsService.getNumOfLetters() * 62) + ((this.appSettingsService.getNumOfLetters() - 1) * 5);
    this.setMinuteSecondValues();
  }

  ngOnInit(): void {
    this.timeLeft = this.initialTimeValue;
    this.setMinuteSecondValues();
  }

  ngOnChanges(): void {
    this.timeLeft = this.initialTimeValue;
    this.setMinuteSecondValues();
    if (this.isTimerStart) {
      console.log("Start timer");
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    const source = timer(1000, 2000);
    this.timerSubscription = source.subscribe(currTimeValue => {
      this.timeLeft = this.initialTimeValue - currTimeValue;
      this.gameInfoService.setTimedTime(currTimeValue);
      this.setMinuteSecondValues();
      if (this.timeLeft === 0) {
        console.log("DONE");
        this.timeoutEventEmitter.emit(true);
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    this.timeLeft = this.initialTimeValue;
    this.setMinuteSecondValues();
    if (this.timerSubscription) this.timerSubscription.unsubscribe();

  }

  setMinuteSecondValues() {
    let minute = Math.floor(this.timeLeft / 60);
    let second = Math.round(this.timeLeft % 60);
    if (minute < 10) {
      this.minute = '0' + minute.toString();
    } else {
      this.minute = minute.toString();
    }

    if (second < 10) {
      this.second = '0' + second.toString();
    } else {
      this.second = second.toString();
    }
  }

  @HostListener('window:scroll', ['$event'])
  offScrollYOffset(event: any) {
    console.log(window.pageYOffset);
    if (window.pageYOffset >= 90) {
      this.isScrollYOffset = true;
    } else {
      this.isScrollYOffset = false;
    }
  }
}
