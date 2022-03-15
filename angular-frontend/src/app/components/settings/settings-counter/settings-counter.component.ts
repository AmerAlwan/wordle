import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings-counter',
  templateUrl: './settings-counter.component.html',
  styleUrls: ['./settings-counter.component.css']
})
export class SettingsCounterComponent implements OnInit {
  @Input() value: number = 0;
  faCirclePlus = faCirclePlus
  faCircleMinus = faCircleMinus

  constructor() { }

  ngOnInit(): void {
  }

}
