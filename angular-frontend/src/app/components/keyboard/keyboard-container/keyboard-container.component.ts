import { Input } from '@angular/core';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-keyboard-container',
  templateUrl: './keyboard-container.component.html',
  styleUrls: ['./keyboard-container.component.css']
})
export class KeyboardContainerComponent implements OnInit {
  @Input() keyboard_letter_status: { [index: string]: string } = {};
  first_row_keys: Array<string> = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  second_row_keys: Array<string> = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  third_row_keys: Array<string> = ['del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(letter : string) {
    if (letter === 'del') {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'backspace' }))
    }
    document.dispatchEvent(new KeyboardEvent('keydown', { 'key': letter }))
  }

}
