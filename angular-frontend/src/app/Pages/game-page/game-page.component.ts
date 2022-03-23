import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  appSettingsService: AppSettingsService;
  keydownService: KeydownService;
  backgroundMode: string = 'background-color'
  backgroundValue: string = '#121213';
  changeDetectorRef: ChangeDetectorRef;

  constructor(appSettingsService: AppSettingsService, keydownService: KeydownService, changeDetectorRef: ChangeDetectorRef) {
    this.appSettingsService = appSettingsService;
    this.keydownService = keydownService;
    this.changeDetectorRef = changeDetectorRef;
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
    });
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }


  displaySettings(settingsStatus: boolean) {
    this.isDisplaySettings = settingsStatus;
    if (this.isDisplaySettings) this.keydownService.disableKeydown()
    else this.keydownService.enableKeydown()
  }

}
