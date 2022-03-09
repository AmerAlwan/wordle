import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-key',
  templateUrl: './keyboard-key.component.html',
  styleUrls: ['./keyboard-key.component.css']
})
export class KeyboardKeyComponent implements OnInit {
  @Input() letter: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
