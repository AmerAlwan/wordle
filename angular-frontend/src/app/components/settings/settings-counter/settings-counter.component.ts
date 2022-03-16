import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings-counter',
  templateUrl: './settings-counter.component.html',
  styleUrls: ['./settings-counter.component.css']
})
export class SettingsCounterComponent implements OnInit {
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Output() onValueChange = new EventEmitter<number>();
  faCirclePlus = faCirclePlus
  faCircleMinus = faCircleMinus

  constructor() { }

  ngOnInit(): void {
  }

  increaseValue() {
    if (this.value < this.max) {
      this.onValueChange.emit(++this.value);
    }
  }

  decreaseValue() {
    if (this.value > this.min) {
      this.onValueChange.emit(--this.value);
    }
  }

}
