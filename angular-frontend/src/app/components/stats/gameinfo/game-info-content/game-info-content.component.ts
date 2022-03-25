import { Component, OnInit } from '@angular/core';
import { GameInfoService } from '../../../../services/gameinfo/game-info.service';
import { WordService } from '../../../../services/word/word.service';
import { AppSettingsService } from '../../../../services/appsettings/app-settings.service';

@Component({
  selector: 'app-game-info-content',
  templateUrl: './game-info-content.component.html',
  styleUrls: ['./game-info-content.component.css']
})
export class GameInfoContentComponent implements OnInit {
  gameStatus: string;
  currAttempt: number;
  totalAttempts: number;
  currWord: string;
  currDefinition: string;
  lastWord: string;
  lastDefinition: string;

  constructor(private gameInfoService: GameInfoService, private wordService: WordService, private appSettingsService: AppSettingsService) {
    this.gameStatus = this.gameInfoService.getGameStatus().toUpperCase();
    this.currAttempt = this.wordService.getCurrAttempt();
    this.totalAttempts = this.appSettingsService.getNumOfAttempts();
    this.currWord = this.wordService.getCurrWord();
    this.currDefinition = this.wordService.getCurrDefinition();
    this.lastWord = this.wordService.getLastWord();
    this.lastDefinition = this.wordService.getLastDefinition();
  }

  ngOnInit(): void {
    this.wordService.watchCurrWord().subscribe(word => {
      this.currWord = this.wordService.getCurrWord();
      this.currDefinition = this.wordService.getCurrDefinition();
      this.lastWord = this.wordService.getLastWord();
      this.lastDefinition = this.wordService.getLastDefinition();
    });
  }

}
