import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettingsService } from '../../services/appsettings/app-settings.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  isDisplaySettings: boolean = false;
  appSettingsService: AppSettingsService;
  backgroundMode: string = 'background-color'
  backgroundValue: string = '#121213';
  changeDetectorRef: ChangeDetectorRef;

  constructor(appSettingsService: AppSettingsService, changeDetectorRef: ChangeDetectorRef) {
    this.appSettingsService = appSettingsService;
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.appSettingsService.getSettings().subscribe((settings) => {
      console.log("New color: " + settings.backgroundValue);
      this.backgroundMode = settings.backgroundMode;
      this.backgroundValue = settings.backgroundValue;
    });
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }


  displaySettings(settingsStatus: boolean) {
    this.isDisplaySettings = settingsStatus;
  }

}
