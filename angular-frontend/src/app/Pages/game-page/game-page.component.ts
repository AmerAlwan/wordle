import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettingsService } from '../../services/appsettings/app-settings.service';
import { KeydownService } from '../../services/keydown/keydown.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  isDisplaySettings: boolean = false;
  isDisplayGameOver: boolean = false;
  isBlurPage: boolean = false;
  appSettingsService: AppSettingsService;
  keydownService: KeydownService;
  backgroundMode: string = 'background-color'
  backgroundValue: string = '#121213';
  changeDetectorRef: ChangeDetectorRef;
  screenHeight: number;

  constructor(appSettingsService: AppSettingsService, keydownService: KeydownService, changeDetectorRef: ChangeDetectorRef) {
    this.appSettingsService = appSettingsService;
    this.keydownService = keydownService;
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
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  displaySettings(settingsStatus: boolean) {
    this.isDisplaySettings = settingsStatus;
    this.isBlurPage = settingsStatus;
    if (this.isDisplaySettings) this.keydownService.disableKeydown();
    else this.keydownService.enableKeydown();
  }

  displayGameOver(gameOverStatus: boolean) {
    this.isDisplayGameOver = gameOverStatus;
    this.isBlurPage = gameOverStatus;
    if (this.isDisplayGameOver) this.keydownService.disableKeydown();
    else this.keydownService.enableKeydown();
  }


}
