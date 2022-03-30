import { SimpleChanges } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgToggleModule } from '@nth-cloud/ng-toggle';

@Component({
  selector: 'app-settings-toggle',
  templateUrl: './settings-toggle.component.html',
  styleUrls: ['./settings-toggle.component.css']
})
export class SettingsToggleComponent implements OnInit {
  @Input() isToggled: boolean = false;
  @Input() isToggleInit: boolean = false;
  @Output() onToggleChange = new EventEmitter<boolean>();
  @Output() onToggleInit = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: boolean) {
    if (this.isToggleInit) {
      this.onToggleChange.emit(value);
    }
    this.onToggleInit.emit(true);
  }

}
