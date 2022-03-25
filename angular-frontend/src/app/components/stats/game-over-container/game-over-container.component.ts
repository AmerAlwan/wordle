import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-game-over-container',
  templateUrl: './game-over-container.component.html',
  styleUrls: ['./game-over-container.component.css'],
  animations: [
    trigger('toggleSettings', [
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
export class GameOverContainerComponent implements OnInit {
  @Input() isDisplayGameOver: boolean = false;
  @Output() displayGameOverEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
