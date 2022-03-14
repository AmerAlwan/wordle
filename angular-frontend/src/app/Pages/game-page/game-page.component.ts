import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  isPageBlurred: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleBlur() {
    this.isPageBlurred = !this.isPageBlurred;
  }

}
