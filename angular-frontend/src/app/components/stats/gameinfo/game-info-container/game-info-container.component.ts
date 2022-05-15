import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WordService } from '../../../../services/word/word.service';
import { GameInfoService } from '../../../../services/gameinfo/game-info.service';
import { AppSettingsService } from '../../../../services/appsettings/app-settings.service';

@Component({
  selector: 'app-game-info-container',
  templateUrl: './game-info-container.component.html',
  styleUrls: ['./game-info-container.component.css'],
  animations: [
    trigger('toggleGameInfo', [
      state('open', style({
        transform: 'translateY(100%)',
      })),
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms ease-in-out', style({ transform: 'transalteY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class GameInfoContainerComponent implements OnInit, OnChanges {
  @Input() isDisplayGameInfo: boolean = false;
  @Output() displayGameInfoEmitter = new EventEmitter<boolean>();
  gameMode: string = "";

  constructor(private wordService: WordService, private gameInfoService: GameInfoService, private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.gameMode = this.appSettingsService.getGameMode();
  }

  ngOnChanges(): void {
    this.gameMode = this.appSettingsService.getGameMode();
  }

  closePopup() {
    this.isDisplayGameInfo = false;
    this.displayGameInfoEmitter.emit(false);
  }

  togglePlayAgain() {
    this.wordService.requestWord();
    this.gameInfoService.setGameStatus('ongoing');
    setTimeout(() => this.displayGameInfoEmitter.emit(false), 1000);
  }

}
