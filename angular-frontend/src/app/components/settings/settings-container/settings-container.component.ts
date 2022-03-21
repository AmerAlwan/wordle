import { trigger, state, style, transition, animate } from '@angular/animations';
import { Input, Output } from '@angular/core';
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
  @Input() isDisplaySettings: boolean = false;
  @Output() displaySettingsEmitter = new EventEmitter<boolean>();
  isSaved: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isSaved = false;
  }

  saveChanges() {
    this.isSaved = true;
  }

  closePopup() {
    this.isDisplaySettings = false;
    this.displaySettingsEmitter.emit(false);
    this.isSaved = false;
  }

}
