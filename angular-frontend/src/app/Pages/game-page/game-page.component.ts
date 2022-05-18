import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettingsService } from '../../services/appsettings/app-settings.service';
import { KeydownService } from '../../services/keydown/keydown.service';
import { GameInfoService } from '../../services/gameinfo/game-info.service';
import { UserService } from '../../services/user/user.service';
import { BackendService } from '../../services/backend/backend.service';
import { WordService } from '../../services/word/word.service';
import { User } from '../../shared/UserInfo';
import { Word } from '../../shared/Word';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  isDisplaySettings: boolean = false;
  isDisplayGameInfo: boolean = false;
  isDisplayLeaderboard: boolean = false;
  isBlurPage: boolean = false;
  backgroundMode: string = 'background-color'
  backgroundValue: string = '#121213';
  changeDetectorRef: ChangeDetectorRef;
  screenHeight: number;
  screenWidth: number;

  constructor(private appSettingsService: AppSettingsService, private keydownService: KeydownService,
    private gameInfoService: GameInfoService, changeDetectorRef: ChangeDetectorRef,
    private backendService: BackendService, private userService: UserService, private wordService: WordService) {
    this.changeDetectorRef = changeDetectorRef;

    this.screenHeight = appSettingsService.getScreenHeight();
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.appSettingsService.getSettings().subscribe((settings) => {
      console.log("New color: " + settings.backgroundValue);
      this.backgroundMode = settings.backgroundMode;
      if (settings.backgroundMode === 'image') {
        this.backgroundValue = "rgba(0,0,0,0) url('" + settings.backgroundValue + "') no-repeat fixed";
      } else if (settings.backgroundMode === 'color') {
        this.backgroundValue = settings.colorValue;
      }

      document.body.style.background = this.backgroundValue;
      document.body.style.backgroundSize = 'cover';
      
    //  this.screenHeight = settings.screenHeight;
     // this.screenWidth = window.innerWidth;
    });

    this.gameInfoService.watchGameInfo().subscribe(gameInfo => {
      console.log(this.gameInfoService.getGameStatus());
      if (this.gameInfoService.getGameStatus() === 'win' || this.gameInfoService.getGameStatus() === 'lose') {
        this.keydownService.disableKeydown();
        this.displayGameInfo(true);
        this.backendService.saveDaily(this.wordService.getCurrWord(), this.wordService.getCurrAttempt(), this.gameInfoService.isGameStatusWin(),
          this.appSettingsService.getDifficulty(), this.userService.getUser())

      } else if (this.gameInfoService.getGameStatus() === 'ongoing') {
        this.keydownService.enableKeydown();
      }
    });

  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  displaySettings(settingsStatus: boolean) {
    this.isDisplaySettings = settingsStatus;
    this.isBlurPage = settingsStatus;
    if (this.isDisplaySettings) this.keydownService.disableKeydown();
    else if (this.gameInfoService.isGameStatusOngoing()) this.keydownService.enableKeydown();
  }

  displayGameInfo(GameInfoStatus: boolean) {
    this.isDisplayGameInfo = GameInfoStatus;
    this.isBlurPage = GameInfoStatus;
    if (this.isDisplayGameInfo) this.keydownService.disableKeydown();
    else if (this.gameInfoService.isGameStatusOngoing()) this.keydownService.enableKeydown();
  }

  displayLeaderboard(leaderboardStatus: boolean) {
    this.isDisplayLeaderboard = leaderboardStatus;
    this.isBlurPage = leaderboardStatus;
    if (this.isDisplayLeaderboard) this.keydownService.disableKeydown();
    else if (this.gameInfoService.isGameStatusOngoing()) this.keydownService.enableKeydown();
  }


}
