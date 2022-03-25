import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettingsService } from '../../services/appsettings/app-settings.service';
import { KeydownService } from '../../services/keydown/keydown.service';
import { GameInfoService } from '../../services/gameinfo/game-info.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  isDisplaySettings: boolean = false;
  isDisplayGameInfo: boolean = false;
  isBlurPage: boolean = false;
  backgroundMode: string = 'background-color'
  backgroundValue: string = '#121213';
  changeDetectorRef: ChangeDetectorRef;
  screenHeight: number;

  constructor(private appSettingsService: AppSettingsService, private keydownService: KeydownService, private gameInfoService: GameInfoService, changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.screenHeight = appSettingsService.getScreenHeight();
  }

  ngOnInit(): void {
    this.appSettingsService.setSettingsFromLocalStorage();
    this.appSettingsService.getSettings().subscribe((settings) => {
      console.log("New color: " + settings.backgroundValue);
      this.backgroundMode = settings.backgroundMode;
      if (settings.backgroundMode === 'image') {
        this.backgroundValue = "url('" + settings.backgroundValue + "') no-repeat fixed";
      } else if (settings.backgroundMode === 'color') {
        this.backgroundValue = settings.backgroundValue;
      }
      
        this.screenHeight = settings.screenHeight;
    });

    this.gameInfoService.watchGameInfo().subscribe(gameInfo => {
      console.log(this.gameInfoService.getGameStatus());
      if (this.gameInfoService.getGameStatus() === 'win' || this.gameInfoService.getGameStatus() === 'lose') {
        this.keydownService.disableKeydown();
        this.displayGameInfo(true);
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


}
