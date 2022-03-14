import { EventEmitter, SimpleChanges } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-none-word-error',
  templateUrl: './none-word-error.component.html',
  styleUrls: ['./none-word-error.component.css']
})
export class NoneWordErrorComponent implements OnInit {
@Input() displayError: boolean = false;
@Output() onDisplayedError = new EventEmitter<boolean>();
errorMessage: string = "Not Valid";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      console.log(this.displayError);
      if (this.displayError) {
        this.displayError = false;
        this.onDisplayedError.emit(this.displayError);
      }
    }, 1500);
  }

}
