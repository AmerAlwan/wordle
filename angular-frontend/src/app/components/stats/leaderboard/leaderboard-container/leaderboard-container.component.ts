import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-leaderboard-container',
  templateUrl: './leaderboard-container.component.html',
  styleUrls: ['./leaderboard-container.component.css'],
  animations: [
    trigger('toggleLeaderboard', [
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
export class LeaderboardContainerComponent implements OnInit {
  @Input() isDisplayLeaderboard: boolean = false;
  @Output() displayLeaderboardEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.isDisplayLeaderboard = false;
    this.displayLeaderboardEmitter.emit(false);
  }

}
