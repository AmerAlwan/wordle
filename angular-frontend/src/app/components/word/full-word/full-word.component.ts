import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-word',
  templateUrl: './full-word.component.html',
  styleUrls: ['./full-word.component.css']
})
export class FullWordComponent implements OnInit {
  @Input() keyboard_letter_status: { [index: string]: string } = {};
  @Input() word: Array<string> = [];
  @Input() letterStatus: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
