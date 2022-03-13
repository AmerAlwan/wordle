import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-letter',
  templateUrl: './word-letter.component.html',
  styleUrls: ['./word-letter.component.css'],
  animations: [
    trigger('reveal', [
      state('revealing', style({
         transform:'scale(1)'
       })),
      transition('* => revealed', [
        animate('0.15s', style({
          transform: 'scale(0.8)'
        }))
      ])
    ])
   ]

})

export class WordLetterComponent implements OnInit {
  @Input() letter: string = '';
  @Input() status: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
