import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-container',
  templateUrl: './keyboard-container.component.html',
  styleUrls: ['./keyboard-container.component.css']
})
export class KeyboardContainerComponent implements OnInit {
  first_row_keys: Array<string> = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  second_row_keys: Array<string> = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  third_row_keys: Array<string> = ['backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'];

  constructor() { }

  ngOnInit(): void {
  }

}
