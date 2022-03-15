import { trigger, state, style, transition, animate } from '@angular/animations';
import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.css'],
  animations: [
    trigger('toggleSettings', [
    state('open', style({
      transform: 'translateY(100%)',
    })),
      transition(':enter', [
        style({ transform: 'translateY(100%)'}),
        animate('200ms ease-in-out', style({ transform: 'transalteY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class SettingsContainerComponent implements OnInit {
  @Output() blurPageEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  isDisplaySettings: boolean = false;

  openPopup() {
    this.isDisplaySettings = true;
    this.blurPageEmitter.emit(true);
  }
  closePopup() {
    this.isDisplaySettings = false;
    this.blurPageEmitter.emit(false);
  }

}
