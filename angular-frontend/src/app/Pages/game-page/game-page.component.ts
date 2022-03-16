import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  isDisplaySettings: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  displaySettings(settingsStatus: boolean) {
    this.isDisplaySettings = settingsStatus;
  }

}
