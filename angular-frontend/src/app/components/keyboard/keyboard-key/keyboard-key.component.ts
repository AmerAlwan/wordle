import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-key',
  templateUrl: './keyboard-key.component.html',
  styleUrls: ['./keyboard-key.component.css']
})
export class KeyboardKeyComponent implements OnInit {
  @Input() letter: string = '';
  @Input() status: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if (this.letter === 'del') {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'backspace' }))
    }
    document.dispatchEvent(new KeyboardEvent('keydown', {'key': this.letter}))
  }

}
